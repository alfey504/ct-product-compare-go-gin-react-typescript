package controllers

import (
	"net/http"

	"ct.com/ct_compare/api_services/product_services"
	"ct.com/ct_compare/models/response_model"
	"github.com/gin-gonic/gin"
)

func ProductController(ctx *gin.Context) {

	prodNo := ctx.Query("prod")
	if prodNo == "" {
		println("Missing parameter prod")
		ctx.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: http.StatusBadRequest,
			Message:    "Missing query prod",
			Data:       nil,
		})
		return
	}

	response := product_services.FetchProduct(prodNo)
	if response.IsError() {
		ctx.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: response.StatusCode,
			Message:    response.Message,
			Data:       nil,
		})
		return
	}

	ctx.JSON(http.StatusOK, response_model.ApiResponse{
		StatusCode: http.StatusOK,
		Message:    response.Message,
		Data:       response.Data,
	})
}
