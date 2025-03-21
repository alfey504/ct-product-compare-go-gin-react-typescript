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

func GetProduct(productNo string) (response_model.ProductResponse, api_utils.FetchError) {
	url := fmt.Sprintf("https://apim.canadiantire.ca/v1/product/api/v1/product/productFamily/%sp?baseStoreId=CTR&lang=en_CA&storeId=175&light=true", productNo)

	ocp_apim_subscription_key, ok := os.LookupEnv(keys.OS_ENV_OCP_APIM_SUBSCRIPTION_KEY)
	if !ok {
		return response_model.ProductResponse{}, api_utils.FetchError{
			StatusCode: http.StatusInternalServerError,
			Status:     "Error: 500 internal server error",
			Message:    "Failed to fetch product details due to internal server error",
			Err:        fmt.Errorf("Missing OCP_APIM_SUBSCRIPTION_KEY in env variables"),
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

	product := response_model.ProductResponse{}
	err := api_utils.Fetch(requestConfig, &product)
	if err.IsError() {
		fmt.Println("Failed to make Api request : ", err.Error())
		if err.StatusCode == 404 {
			return response_model.ProductResponse{}, api_utils.FetchError{
				StatusCode: http.StatusNotFound,
				Status:     "Product number does not exist",
				Message:    fmt.Sprintf("product number %s does not exist", productNo),
				Err:        fmt.Errorf("product number %s not found", productNo),
			}
		}

		return response_model.ProductResponse{}, api_utils.FetchError{
			StatusCode: http.StatusInternalServerError,
			Status:     err.Status,
			Message:    "Failed to fetch product details due to internal server issues",
			Err:        err.Err,
		}
	}

	return product, err
}
