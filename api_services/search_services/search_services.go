package search_services

import (
	"fmt"
	"os"

	"ct.com/ct_compare/api_services/api_utils"
	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/models/response_model"
)

func SearchProducts(search string) {
	categoryResponse := ResolveCategory(search)
	if categoryResponse.IsError() {
		fmt.Println(categoryResponse.Error())
	}

	url := fmt.Sprintf("https://apim.canadiantire.ca/v1/search/v2/search?rq=%s&store=175", search)
	ocp_apim_subscription_key, ok := os.LookupEnv(keys.OS_ENV_OCP_APIM_SUBSCRIPTION_KEY)
	if !ok {
		panic("dame da ne dameyoo")
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
	println(response.Data.Products[0].Title)
}

// if !ok {
// 	return api_utils.FetchError[response_model.ProductResponse]{
// 		StatusCode: http.StatusInternalServerError,
// 		Status:     "Error: 500 internal server error",
// 		Message:    "Failed to fetch product details due to internal server error",
// 		Err:        fmt.Errorf("Missing OCP_APIM_SUBSCRIPTION_KEY in env variables"),
// 		Data:       *new(response_model.ProductResponse),
// 	}
// }
// if response.IsError() {
// 	fmt.Println("Failed to make Api request : ", response.Error())
// 	if response.StatusCode == 404 {
// 		return api_utils.FetchError[response_model.ProductResponse]{
// 			StatusCode: http.StatusNotFound,
// 			Status:     "Product number does not exist",
// 			Message:    fmt.Sprintf("product number %s does not exist", productNo),
// 			Err:        fmt.Errorf("product number %s not found", productNo),
// 			Data:       *new(response_model.ProductResponse),
// 		}
// 	}

// return api_utils.FetchError[response_model.ProductResponse]{
// 	StatusCode: http.StatusInternalServerError,
// 	Status:     response.Status,
// 	Message:    "Failed to fetch product details due to internal server issues",
// 	Err:        response.Err,
// 	Data:       response_model.ProductResponse{},
// }
// }
