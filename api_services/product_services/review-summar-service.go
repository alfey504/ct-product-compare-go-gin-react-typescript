package product_services

import (
	"fmt"
	"os"

	"ct.com/ct_compare/api_services/api_utils"
	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/models/response_model"
)

func GetReviewSummary(productNo string) api_utils.FetchError[response_model.ReviewSummaryResponse] {
	url := fmt.Sprintf("https://rh.nexus.bazaarvoice.com/highlights/v3/1/canadiantire-ca/%sP", productNo)

	ocp_apim_subscription_key, ok := os.LookupEnv(keys.OS_ENV_OCP_APIM_SUBSCRIPTION_KEY)
	if !ok {
		return api_utils.FetchError[response_model.ReviewSummaryResponse]{
			StatusCode: -1,
			Status:     "Missing env variables",
			Message:    "Failed to fetch product summary due to internal server error",
			Err:        fmt.Errorf("missing env variable OCP_APIM_SUBSCRIPTION_KEY"),
			Data:       response_model.ReviewSummaryResponse{},
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

	response := api_utils.Fetch[response_model.ReviewSummaryResponse](requestConfig)
	if response.IsError() {
		fmt.Println("Failed to get review summary")
		return api_utils.TranslateTo(response, response_model.ReviewSummaryResponse{})
	}

	return api_utils.FetchError[response_model.ReviewSummaryResponse]{
		StatusCode: -1,
		Status:     "Success",
		Message:    "Success",
		Err:        nil,
		Data:       response.Data,
	}
}
