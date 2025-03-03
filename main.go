package main

import (
	"net/http"

	"ct.com/ct_compare/controllers"
	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/utils"
	"github.com/gin-gonic/gin"
)

func main() {
	if err := utils.LoadEnv(".env", keys.OS_ENV_GEMINI_API_KEY); err != nil {
		panic(err)
	}
	r := gin.Default()
	r.Static("/public/assets", "public/assets")
	r.LoadHTMLGlob("views/*")

	r.GET("/api/product", controllers.ProductController)

	r.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", map[string]string{})
	})
	r.Run(":8080")
}
