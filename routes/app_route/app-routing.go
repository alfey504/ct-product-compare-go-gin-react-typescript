package app_route

import (
	"net/http"

	"ct.com/ct_compare/middleware"
	"github.com/gin-gonic/gin"
)

func SetAppRouting(r *gin.Engine) {
	appGroup := r.Group("/app")
	appGroup.Use(middleware.AuthMiddleware)

	appGroup.GET("/*path", func(ctx *gin.Context) {
		route := ctx.Request.RequestURI
		ctx.HTML(http.StatusOK, "index.tmpl", gin.H{
			"route": route,
		})
	})
}
