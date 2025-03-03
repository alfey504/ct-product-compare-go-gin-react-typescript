package product_services

import (
	"fmt"
	"os"

	"ct.com/ct_compare/api_services/api_utils"
	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/models/response_model"
)

func GetProduct(productNo string) (response_model.ProductResponse, error) {
	url := fmt.Sprintf("https://apim.canadiantire.ca/v1/product/api/v1/product/productFamily/%sp?baseStoreId=CTR&lang=en_CA&storeId=175&light=true", productNo)

	ocp_apim_subscription_key, ok := os.LookupEnv(keys.OS_ENV_OCP_APIM_SUBSCRIPTION_KEY)
	if !ok {
		return response_model.ProductResponse{}, fmt.Errorf("failed to load ocp-apim-subscription key from os env variables")
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
	if err := api_utils.Fetch(requestConfig, &product); err != nil {
		fmt.Println("Failed to make Api request : ", err.Error())
	}

	return product, nil
}
