package product_services

import (
	"fmt"

	"ct.com/ct_compare/api_services/api_utils"
	"ct.com/ct_compare/api_services/gemini_services"
	"ct.com/ct_compare/models"
)

func ProductCompare(pno1 string, pno2 string) (models.ProductCompare, api_utils.FetchError) {
	product1, err := FetchProduct(pno1)
	if err.IsError() {
		fmt.Println("Failed to fetch product 1 ", err.Error())
		return models.ProductCompare{}, err
	}

	product2, err := FetchProduct(pno2)
	if err.IsError() {
		fmt.Println("Failed to fetch product 2 ", err.Error())
		return models.ProductCompare{}, err
	}

	summary, err := gemini_services.GetSummary(product1, product2)
	if err.IsError() {
		fmt.Println("Failed to get summary from gemini API ", err.Error())
		return models.ProductCompare{}, err
	}

	product1.Summary = summary.Product1
	product2.Summary = summary.Product2

	productCompare := models.MakeProductCompare(product1, product2, summary.KeyDifferences)
	return productCompare, api_utils.FetchError{
		StatusCode: -1,
		Status:     "Success",
		Message:    "Success",
		Err:        nil,
	}
}

func FetchProduct(productNo string) (models.Product, api_utils.FetchError) {
	productResp, err := GetProduct(productNo)
	if err.IsError() {
		println("Failed to make the product request ", err.Error())
		return models.Product{}, err
	}

	reviewSummary, err := GetReviewSummary(productNo)
	if err.IsError() {
		fmt.Println("Failed to make review summary request")
		return models.Product{}, err
	}

	product := models.MakeProduct(productResp, reviewSummary)
	return product, err
}
