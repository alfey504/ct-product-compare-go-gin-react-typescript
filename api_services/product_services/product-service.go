package product_services

import (
	"fmt"
	"net/http"
	"os"

	"ct.com/ct_compare/api_services/api_utils"
	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/models/response_model"
)

var productDoesNotExistErr = fmt.Errorf("product does not exists")

func GetProduct(productNo string) api_utils.FetchError[response_model.ProductResponse] {
	url := fmt.Sprintf("https://apim.canadiantire.ca/v1/product/api/v1/product/productFamily/%sp?baseStoreId=CTR&lang=en_CA&storeId=175&light=true", productNo)

	fmt.Printf("url = %s", url)
	ocp_apim_subscription_key, ok := os.LookupEnv(keys.OS_ENV_OCP_APIM_SUBSCRIPTION_KEY)
	if !ok {
		return api_utils.FetchError[response_model.ProductResponse]{
			StatusCode: http.StatusInternalServerError,
			Status:     "Error: 500 internal server error",
			Message:    "Failed to fetch product details due to internal server error",
			Err:        fmt.Errorf("Missing OCP_APIM_SUBSCRIPTION_KEY in env variables"),
			Data:       *new(response_model.ProductResponse),
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

	response := api_utils.Fetch[response_model.ProductResponse](requestConfig)
	if response.IsError() {
		fmt.Println("Failed to make Api request : ", response.Error())
		if response.StatusCode == 404 {
			return api_utils.FetchError[response_model.ProductResponse]{
				StatusCode: http.StatusNotFound,
				Status:     "Product number does not exist",
				Message:    fmt.Sprintf("product number %s does not exist", productNo),
				Err:        fmt.Errorf("product number %s not found", productNo),
				Data:       *new(response_model.ProductResponse),
			}
		}

		return api_utils.FetchError[response_model.ProductResponse]{
			StatusCode: http.StatusInternalServerError,
			Status:     response.Status,
			Message:    "Failed to fetch product details due to internal server issues",
			Err:        response.Err,
			Data:       response_model.ProductResponse{},
		}
	}

	return response
}
