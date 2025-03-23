package main

import (
	"net/http"

	"ct.com/ct_compare/controllers"
	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/middleware"
	"ct.com/ct_compare/utils"
	"github.com/gin-gonic/gin"
)

func main() {
	if err := utils.LoadEnv(".env", keys.OS_ENV_GEMINI_API_KEY); err != nil {
		panic(err)
	}

	r := gin.Default()

	r.Static("/public/assets/", "./public/assets/")
	r.LoadHTMLGlob("views/*")

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

	apiGroup := r.Group("/api")
	apiGroup.Use(middleware.AuthMiddleware)

	apiGroup.GET("/product", controllers.ProductController)

	appGroup := r.Group("/app")
	appGroup.Use(middleware.AuthMiddleware)

	appGroup.GET("/*path", func(ctx *gin.Context) {
		route := ctx.Request.RequestURI
		ctx.HTML(http.StatusOK, "index.tmpl", gin.H{
			"route": route,
		})
	})

	r.Run(":8080")
}
