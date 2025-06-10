package api_routes

import (
	"ct.com/ct_compare/middleware"
	"github.com/gin-gonic/gin"
)

func SetApiRouting(r *gin.Engine) {
	apiGroup := r.Group("/api")
	apiGroup.Use(middleware.AuthMiddleware)
	SetCompareRoutes(apiGroup)
	SetSearchRoute(apiGroup)
}
