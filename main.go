package main

import (
	"fmt"
	"net/http"
	"os"

	"ct.com/ct_compare/controllers"
	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/middleware"
	"ct.com/ct_compare/utils"
	"github.com/gin-gonic/gin"
)

func main() {
	if err := utils.LoadEnv(".env", keys.OS_ENV_GEMINI_API_KEY); err != nil {
		fmt.Printf("failed to load env vars")
	}

	r := gin.Default()
	r.Use(middleware.CorsMiddleware)

	r.Static("/public/", "./public/")
	r.LoadHTMLGlob("views/*")

	r.POST("/login", controllers.LoginUser)
	r.GET("/login", func(ctx *gin.Context) {
		isAuthorized := utils.IsAuthorized(ctx)
		fmt.Printf(fmt.Sprintf("%d\n", isAuthorized))
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

	env_port, ok := os.LookupEnv("PORT")
	if !ok {
		env_port = "8080"
	}

	port := ":" + env_port
	println("PORT -> ", port)
	r.Run(port)
}
