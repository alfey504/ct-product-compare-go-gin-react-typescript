package main

import (
	"fmt"
	"os"

	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/middleware"
	"ct.com/ct_compare/routes/api_routes"
	"ct.com/ct_compare/routes/app_route"
	"ct.com/ct_compare/utils"
	"github.com/gin-gonic/gin"
)

func main() {
	if err := utils.LoadEnv(".env", keys.OS_ENV_GEMINI_API_KEY); err != nil {
		fmt.Println(err.Error())
	}

	r := gin.Default()
	r.Use(middleware.CorsMiddleware)

	r.Static("/public/", "./public/")
	r.LoadHTMLGlob("views/*")

	api_routes.SetLoginRoutes(r)
	api_routes.SetApiRouting(r)
	app_route.SetAppRouting(r)

	env_port, ok := os.LookupEnv("PORT")
	if !ok {
		env_port = "8080"
	}

	port := ":" + env_port
	println("PORT -> ", port)
	r.Run(port)
}

// func generateHashedPassword(password string) {
// 	hashedPass, err := utils.HashPassword(password)
// 	if err != nil {
// 		panic(err)
// 	}
// 	fmt.Printf(hashedPass)
// }
