package product_services

import (
	"fmt"
	"os"

	"ct.com/ct_compare/api_services/api_utils"
	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/models/response_model"
)

func GetReviewSummary(productNo string) (response_model.ReviewSummaryResponse, api_utils.FetchError) {
	url := fmt.Sprintf("https://rh.nexus.bazaarvoice.com/highlights/v3/1/canadiantire-ca/%sP", productNo)

	ocp_apim_subscription_key, ok := os.LookupEnv(keys.OS_ENV_OCP_APIM_SUBSCRIPTION_KEY)
	if !ok {
		return response_model.ReviewSummaryResponse{}, api_utils.FetchError{
			StatusCode: -1,
			Status:     "Missing env variables",
			Message:    "Failed to fetch product summary due to internal server error",
			Err:        fmt.Errorf("missing env variable OCP_APIM_SUBSCRIPTION_KEY"),
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

	reviewSummary := response_model.ReviewSummaryResponse{}
	if err := api_utils.Fetch(requestConfig, &reviewSummary); err.IsError() {
		fmt.Println("Failed to get review summary")
		return response_model.ReviewSummaryResponse{}, err
	}

	return reviewSummary, api_utils.FetchError{
		StatusCode: -1,
		Status:     "Success",
		Message:    "Success",
		Err:        nil,
	}
}
