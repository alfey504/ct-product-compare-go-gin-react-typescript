package api_routes

import (
	"net/http"

	"ct.com/ct_compare/controllers"
	"ct.com/ct_compare/utils"
	"github.com/gin-gonic/gin"
)

func SetLoginRoutes(r *gin.Engine) {
	r.POST("/login", controllers.LoginUser)
	r.GET("/login", func(ctx *gin.Context) {
		isAuthorized := utils.IsAuthorized(ctx)
		ctx.HTML(http.StatusOK, "index.tmpl", gin.H{
			"route": "/login",
			"props": gin.H{
				"authorized": isAuthorized,
			},
		})
	})
}
