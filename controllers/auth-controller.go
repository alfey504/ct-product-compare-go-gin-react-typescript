package controllers

import (
	"fmt"
	"net/http"

	"ct.com/ct_compare/models/response_model"
	"ct.com/ct_compare/utils"
	"github.com/gin-gonic/gin"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (lr LoginRequest) Validate() bool {
	return lr.Username != "" && lr.Password != ""
}

func LoginUser(ctx *gin.Context) {

	loginRequest := LoginRequest{}
	if err := ctx.BindJSON(&loginRequest); err != nil {
		fmt.Println(err.Error())
		ctx.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: http.StatusBadRequest,
			Message:    "Error parsing request",
			Data:       nil,
		})
		return
	}

	if !loginRequest.Validate() {
		fmt.Println("Missing username or password from request")
		ctx.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: http.StatusBadRequest,
			Message:    "Missing field username or password",
			Data:       nil,
		})
		return
	}

	user, err := utils.GetUser()
	if err != nil {
		fmt.Println("Failed to fetch user")
		ctx.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: http.StatusInternalServerError,
			Message:    "there was an issue authorizing user",
			Data:       nil,
		})
		return
	}

	if loginRequest.Username != user.Username || !utils.ComparePasswords(user.Password, loginRequest.Password) {
		ctx.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: http.StatusUnauthorized,
			Message:    "incorrect username or password",
			Data:       nil,
		})
		return
	}

	token, err := utils.GenerateJwt(user.Username)
	if err != nil {
		fmt.Println(err.Error())
		ctx.JSON(http.StatusOK, response_model.ApiResponse{
			StatusCode: http.StatusInternalServerError,
			Message:    "there was an issue logging you in..",
			Data:       nil,
		})
		return
	}

	utils.SetTokenCookie(ctx, token)
	ctx.JSON(http.StatusOK, response_model.ApiResponse{
		StatusCode: http.StatusOK,
		Message:    "Success",
		Data:       user,
	})
}
