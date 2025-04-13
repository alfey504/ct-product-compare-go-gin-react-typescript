package controllers

import (
	"net/http"

	"ct.com/ct_compare/api_services/search_services"
	"ct.com/ct_compare/models/response_model"
	"github.com/gin-gonic/gin"
)

func GetSearchResults(c *gin.Context) {
	searchQuery := c.Query("searchQuery")
	if searchQuery == "" {
		c.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: http.StatusBadRequest,
			Message:    "missing query searchQuery from request",
			Data:       nil,
		})
		return
	}

	searchResponse := search_services.SearchProducts(searchQuery)

	c.JSON(http.StatusOK, response_model.ApiResponse{
		StatusCode: searchResponse.StatusCode,
		Message:    searchResponse.Message,
		Data:       searchResponse.Data,
	})

}
