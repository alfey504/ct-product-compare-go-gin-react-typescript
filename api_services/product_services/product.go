package product_services

import (
	"fmt"
	"net/http"

	"ct.com/ct_compare/api_services/api_utils"
	"ct.com/ct_compare/api_services/gemini_services"
	"ct.com/ct_compare/models"
)

func ProductCompare(pno1 string, pno2 string) api_utils.FetchError[models.ProductCompare] {
	product1 := FetchProduct(pno1)
	if product1.IsError() {
		fmt.Println("Failed to fetch product 1 ", product1.Error())
		return api_utils.TranslateTo(product1, models.ProductCompare{})
	}

	product2 := FetchProduct(pno2)
	if product1.IsError() {
		fmt.Println("Failed to fetch product 2 ", product1.Error())
		return api_utils.TranslateTo(product2, models.ProductCompare{})
	}

	summary := gemini_services.GetSummary(product1.Data, product2.Data)
	if product1.IsError() {
		fmt.Println("Failed to get summary from gemini API ", product1.Error())
		return api_utils.TranslateTo(summary, models.ProductCompare{})
	}

	product1.Data.Summary = summary.Data.Product1
	product2.Data.Summary = summary.Data.Product2

	productCompare := models.MakeProductCompare(product1.Data, product2.Data, summary.Data.KeyDifferences)
	return api_utils.FetchError[models.ProductCompare]{
		StatusCode: -1,
		Status:     "Success",
		Message:    "Success",
		Err:        nil,
		Data:       productCompare,
	}
}

func FetchProduct(productNo string) api_utils.FetchError[models.Product] {
	productResp := GetProduct(productNo)
	if productResp.IsError() {
		println("Failed to make the product request ", productResp.Error())
		return api_utils.TranslateTo(productResp, models.Product{})
	}

	reviewSummary := GetReviewSummary(productNo)
	if reviewSummary.IsError() {
		fmt.Println("Failed to make review summary request")
		return api_utils.TranslateTo(reviewSummary, models.Product{})
	}

	product := models.MakeProduct(productResp.Data, reviewSummary.Data)
	return api_utils.FetchError[models.Product]{
		StatusCode: http.StatusOK,
		Status:     "status ok",
		Message:    "ok",
		Err:        nil,
		Data:       product,
	}
}
