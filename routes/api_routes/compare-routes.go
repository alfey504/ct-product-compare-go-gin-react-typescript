package api_routes

import (
	"ct.com/ct_compare/controllers"
	"github.com/gin-gonic/gin"
)

func SetCompareRoutes(apiGroup *gin.RouterGroup) {
	apiGroup.GET("/compare", controllers.CompareController)
}
