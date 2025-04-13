package search_services

import (
	"fmt"
	"net/http"
	"os"

	"ct.com/ct_compare/api_services/api_utils"
	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/models/response_model"
)

func SearchProducts(search string) api_utils.FetchError[response_model.SearchResponse] {
	categoryResponse := ResolveCategory(search)
	if categoryResponse.IsError() {
		fmt.Println(categoryResponse.Error())
	}

	url := fmt.Sprintf("https://apim.canadiantire.ca/v1/search/v2/search?rq=%s&store=175", search)
	ocp_apim_subscription_key, ok := os.LookupEnv(keys.OS_ENV_OCP_APIM_SUBSCRIPTION_KEY)
	if !ok {
		return api_utils.FetchError[response_model.SearchResponse]{
			StatusCode: http.StatusInternalServerError,
			Status:     "Error: 500 internal server error",
			Message:    "Failed to fetch product details due to internal server error",
			Err:        fmt.Errorf("Missing OCP_APIM_SUBSCRIPTION_KEY in env variables"),
			Data:       response_model.SearchResponse{},
		}
	}

	requestConfig := api_utils.RequestConfig{
		Url:    url,
		Method: api_utils.API_METHOD_GET,
		Headers: map[string]string{
			"User-Agent":                "PostmanRuntime/7.37.3",
			"ocp-apim-subscription-key": ocp_apim_subscription_key,
			"baseSiteId":                "CTR",
			"Categorycode":              categoryResponse.Data.Resolve,
		},
		Body: nil,
	}

	response := api_utils.Fetch[response_model.SearchResponse](requestConfig)
	return response
}
