package product_services

import (
	"fmt"
	"os"

	"ct.com/ct_compare/api_services/api_utils"
	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/models/response_model"
)

func GetReviewSummary(productNo string) (response_model.ReviewSummaryResponse, error) {
	url := fmt.Sprintf("https://rh.nexus.bazaarvoice.com/highlights/v3/1/canadiantire-ca/%sP", productNo)

	ocp_apim_subscription_key, ok := os.LookupEnv(keys.OS_ENV_OCP_APIM_SUBSCRIPTION_KEY)
	if !ok {
		return response_model.ReviewSummaryResponse{}, fmt.Errorf("failed to load ocp-apim-subscription key from os env variables")
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

	reviewSummary := response_model.ReviewSummaryResponse{}
	if err := api_utils.Fetch(requestConfig, &reviewSummary); err != nil {
		fmt.Println("Failed to get review summary")
		return response_model.ReviewSummaryResponse{}, err
	}

	return reviewSummary, nil
}
