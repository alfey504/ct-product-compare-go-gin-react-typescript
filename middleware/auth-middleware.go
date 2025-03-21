package middleware

import (
	"net/http"

	"ct.com/ct_compare/models/response_model"
	"ct.com/ct_compare/utils"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware(ctx *gin.Context) {
	user, err := utils.GetUser()
	if err != nil {
		ctx.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: http.StatusInternalServerError,
			Message:    "failed to authorize user due to internal server issues",
			Data:       nil,
		})
		ctx.Abort()
		return
	}

	userCookie, err := utils.GetUserCookie(ctx)
	if err != nil {
		if err != http.ErrNoCookie {
			ctx.JSON(http.StatusOK, response_model.ApiResponse{
				StatusCode: http.StatusInternalServerError,
				Message:    "failed to authorize user due to internal server issues",
				Data:       nil,
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

	if user.Username != userCookie.Username || user.Password != userCookie.Password {
		ctx.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: http.StatusUnauthorized,
			Message:    "unauthorized user",
			Data:       nil,
		})
		ctx.Abort()
		return
	}

	ctx.Next()
}
