package api_routes

import (
	"ct.com/ct_compare/controllers"
	"github.com/gin-gonic/gin"
)

func SetSearchRoute(apiGroup *gin.RouterGroup) {
	apiGroup.GET("/search", controllers.GetSearchResults)
}
