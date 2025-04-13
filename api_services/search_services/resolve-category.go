package search_services

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"ct.com/ct_compare/api_services/api_utils"
	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/models/response_model"
)

type ResolvedQuery struct {
	IsProduct bool
	Resolve   string
}

func ResolveCategory(query string) api_utils.FetchError[ResolvedQuery] {
	url := fmt.Sprintf("https://apim.canadiantire.ca/v1/search/v2/search?q=%s&store=175&lang=en_CA&site=ct&format=json", query)

	ocp_apim_subscription_key, ok := os.LookupEnv(keys.OS_ENV_OCP_APIM_SUBSCRIPTION_KEY)
	if !ok {
		return api_utils.FetchError[ResolvedQuery]{
			StatusCode: http.StatusInternalServerError,
			Status:     "Error: 500 internal server error",
			Message:    "Failed to fetch product details due to internal server error",
			Err:        fmt.Errorf("Missing OCP_APIM_SUBSCRIPTION_KEY in env variables"),
			Data:       ResolvedQuery{},
		}
	}

	requestConfig := api_utils.RequestConfig{
		Url:    url,
		Method: api_utils.API_METHOD_GET,
		Headers: map[string]string{
			"User-Agent":                "PostmanRuntime/7.37.3",
			"ocp-apim-subscription-key": ocp_apim_subscription_key,
			"baseSiteId":                "CTR",
		},
		Body: nil,
	}

	response := api_utils.Fetch[response_model.ResolveResponse](requestConfig)
	if response.IsError() {
		fmt.Println("Failed to make Api request : ", response.Error())
		if response.StatusCode == 404 {
			return api_utils.FetchError[ResolvedQuery]{
				StatusCode: http.StatusNotFound,
				Status:     "Product number does not exist",
				Message:    fmt.Sprintf("query has issues %s", query),
				Err:        fmt.Errorf("query %s has issues ", query),
			}
		}

		return api_utils.FetchError[ResolvedQuery]{
			StatusCode: http.StatusInternalServerError,
			Status:     "Product number does not exist",
			Message:    fmt.Sprintf("query has issues %s", query),
			Err:        fmt.Errorf("query %s has issues ", query),
		}
	}

	if !response.Data.CustomFields.Debug.IsCodeLookup {
		category, err := getCategoryFromUrl(*response.Data.RedirectUrl)
		if err != nil {
			fmt.Println(err.Error())
			return api_utils.FetchError[ResolvedQuery]{
				StatusCode: http.StatusInternalServerError,
				Status:     "Internal Server Error",
				Message:    "There was an issue getting your search results",
				Err:        err,
				Data:       ResolvedQuery{},
			}
		}
		resolve := ResolvedQuery{
			IsProduct: false,
			Resolve:   category,
		}

		return api_utils.FetchError[ResolvedQuery]{
			StatusCode: http.StatusOK,
			Status:     "ok",
			Message:    "ok",
			Err:        nil,
			Data:       resolve,
		}

	}

	productNo, err := getProductNumberFromUrl(*response.Data.RedirectUrl)
	if err != nil {
		fmt.Println(err.Error())
		return api_utils.FetchError[ResolvedQuery]{
			StatusCode: http.StatusInternalServerError,
			Status:     "Internal Server Error",
			Message:    "There was an issue getting your search results",
			Err:        err,
			Data:       ResolvedQuery{},
		}
	}

	resolve := ResolvedQuery{
		IsProduct: true,
		Resolve:   productNo,
	}

	return api_utils.FetchError[ResolvedQuery]{
		StatusCode: http.StatusOK,
		Status:     "ok",
		Message:    "ok",
		Err:        nil,
		Data:       resolve,
	}

}

func getCategoryFromUrl(url string) (string, error) {
	splitString := strings.Split(url, "/")
	if len(splitString) < 7 {
		return "", fmt.Errorf("there was an issue parsing the url")
	}

	categorySection := splitString[6]
	splitString = strings.Split(categorySection, "-")
	if len(splitString) < 2 {
		return "", fmt.Errorf("there was an issue parsing the url")
	}

	splitString = strings.Split(splitString[1], ".")
	if len(splitString) < 1 {
		return "", fmt.Errorf("there was an issue parsing the url")
	}

	return splitString[0], nil
}

func getProductNumberFromUrl(url string) (string, error) {
	splitUrl := strings.Split(url, "/")
	errMessage := "there was an issue parsing product number from the url"
	if len(splitUrl) < 4 {
		return "", fmt.Errorf(errMessage)
	}

	productNoSection := strings.Split(splitUrl[3], ".")
	if len(productNoSection) < 1 {
		return "", fmt.Errorf(errMessage)
	}

	unfilteredProdNo := strings.Split(productNoSection[0], "-")
	if len(unfilteredProdNo) < 0 {
		return "", fmt.Errorf(errMessage)
	}

	productNo := strings.Trim(unfilteredProdNo[len(unfilteredProdNo)-1], "p")
	return productNo, nil
}
