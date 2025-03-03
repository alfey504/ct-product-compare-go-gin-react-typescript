package controllers

import (
	"net/http"

	"ct.com/ct_compare/api_services/product_services"
	"ct.com/ct_compare/models/request_models"
	"github.com/gin-gonic/gin"
)

func ProductController(ctx *gin.Context) {

	prdReq := request_models.ProductRequest{}
	prod1 := ctx.Query("prod1")
	if prod1 == "" {
		println("failed")
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": "failed",
		})
		return
	}

	prod2 := ctx.Query("prod2")
	if prod2 == "" {
		println("failed")
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": "failed",
		})
		return
	}

	prdReq.Product1 = prod1
	prdReq.Product2 = prod2

	productCompare, err := product_services.ProductCompare(prod1, prod2)
	if err != nil {
		println("failed")
		ctx.JSON(http.StatusBadRequest, map[string]string{
			"message": "failed",
		})
		return
	}

	ctx.JSON(http.StatusOK, productCompare)
}
