package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"ct.com/ct_compare/models/response_model"
	"ct.com/ct_compare/models/server_props_models"
	"ct.com/ct_compare/utils"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware(ctx *gin.Context) {

	userCookie, err := utils.GetTokenCookie(ctx)
	if err != nil {
		fmt.Println(err.Error())
		if err == http.ErrNoCookie {
			respondUnauthorized(ctx)
			return
		}

		respondInternalServerError(ctx)
		return
	}

	err = utils.ValidateJWT(userCookie)
	if err != nil && err == utils.ErrInvalidToken {
		fmt.Println(err.Error())
		respondUnauthorized(ctx)
		return
	}

	if err != nil {
		fmt.Println(err.Error())
		respondInternalServerError(ctx)
		return
	}

	ctx.Next()
}

func isBrowser(userAgent string) bool {
	// List of common browser substrings
	browserKeywords := []string{"Mozilla", "Chrome", "Safari", "Firefox", "Edge", "Opera"}

	for _, keyword := range browserKeywords {
		if strings.Contains(userAgent, keyword) {
			return true
		}
	}
	return false
}

func respondUnauthorized(ctx *gin.Context) {
	if isBrowser(ctx.Request.UserAgent()) {
		errorProps := server_props_models.MakeRedirectableErrorProp(
			http.StatusUnauthorized,
			"Looks like you are not logged in",
			"http://localhost:8080/login",
			"Click here to login",
		)
		ctx.HTML(http.StatusOK, "index.tmpl", gin.H{
			"props": errorProps,
			"route": "/error",
		})
		ctx.Abort()
		return
	}

	ctx.JSON(http.StatusOK, response_model.ApiResponse{
		StatusCode: http.StatusUnauthorized,
		Message:    "unauthorized user",
		Data:       nil,
	})
	ctx.Abort()
	return
}

func respondInternalServerError(ctx *gin.Context) {
	if isBrowser(ctx.Request.UserAgent()) {
		errorProps := server_props_models.MakeErrorProp(
			http.StatusUnauthorized,
			"Sorry we had some issues on our side please try again later",
		)
		ctx.HTML(http.StatusOK, "index.tmpl", gin.H{
			"props": errorProps,
			"route": "/error",
		})
		ctx.Abort()
		return
	}
	ctx.JSON(http.StatusOK, response_model.ApiResponse{
		StatusCode: http.StatusInternalServerError,
		Message:    "failed to authorize user due to internal server issues",
		Data:       nil,
	})
	ctx.Abort()
	return
}
