package api_routes

import (
	"ct.com/ct_compare/controllers"
	"github.com/gin-gonic/gin"
)

func SetProductRoutes(apiGroup *gin.RouterGroup) {
	apiGroup.GET("/product", controllers.ProductController)
}
