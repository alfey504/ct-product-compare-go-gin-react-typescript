package product_services

import (
	"fmt"

	gemini "ct.com/ct_compare/api_services/gemini_services"
	"ct.com/ct_compare/models"
)

func ProductCompare(pno1 string, pno2 string) (models.ProductCompare, error) {
	product1, err := FetchProduct(pno1)
	if err != nil {
		fmt.Println("Failed to fetch product 1 ", err.Error())
		return models.ProductCompare{}, err
	}

	product2, err := FetchProduct(pno2)
	if err != nil {
		fmt.Println("Failed to fetch product 2 ", err.Error())
		return models.ProductCompare{}, err
	}

	summary, err := gemini.GetSummary(product1, product2)
	if err != nil {
		fmt.Println("Failed to get summary from gemini API ", err.Error())
		return models.ProductCompare{}, err
	}

	product1.Summary = summary.Product1
	product2.Summary = summary.Product2

	productCompare := models.MakeProductCompare(product1, product2, summary.KeyDifferences)
	return productCompare, nil
}

func FetchProduct(productNo string) (models.Product, error) {
	productResp, err := GetProduct(productNo)
	if err != nil {
		println("Failed to make the product request ", err.Error())
		return models.Product{}, nil
	}

	reviewSummary, err := GetReviewSummary(productNo)
	if err != nil {
		fmt.Println("Failed to make review summary request")
		return models.Product{}, err
	}

	product := models.MakeProduct(productResp, reviewSummary)

	return product, nil
}
