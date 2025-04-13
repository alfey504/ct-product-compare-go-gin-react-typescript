package controllers

import (
	"net/http"

	"ct.com/ct_compare/api_services/product_services"
	"ct.com/ct_compare/models/response_model"
	"github.com/gin-gonic/gin"
)

func ProductController(ctx *gin.Context) {

	prod1 := ctx.Query("prod1")
	prod2 := ctx.Query("prod2")
	if prod1 == "" || prod2 == "" {
		println("Missing parameter prod1")
		ctx.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: http.StatusBadRequest,
			Message:    "Missing query prod 1 or prod2 in request",
			Data:       nil,
		})
		return
	}

	if prod1 == prod2 {
		println("Both parameters are same")
		ctx.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: http.StatusBadRequest,
			Message:    "Both product numbers are the same",
			Data:       nil,
		})
		return
	}

	productCompare := product_services.ProductCompare(prod1, prod2)
	if productCompare.IsError() {
		println(productCompare.Error())
		ctx.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: productCompare.StatusCode,
			Message:    productCompare.Message,
			Data:       nil,
		})
		return
	}

	ctx.JSON(http.StatusOK, response_model.ApiResponse{
		StatusCode: http.StatusOK,
		Message:    "Success",
		Data:       productCompare.Data,
	})
}
