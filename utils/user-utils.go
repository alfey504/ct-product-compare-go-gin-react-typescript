package utils

import (
	"fmt"
	"os"
	"strings"

	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/models"
	"github.com/gin-gonic/gin"
)

func GetUser() (models.User, error) {
	username, ok := os.LookupEnv(keys.OS_ENV_USERNAME)
	if !ok {
		fmt.Println("Failed to fetch username from env variable")
		return models.User{}, fmt.Errorf("could not find env variable %s", keys.OS_ENV_USERNAME)
	}

	password, ok := os.LookupEnv(keys.OS_ENV_PASSWORD)
	if !ok {
		fmt.Println("Failed to fetch password from env variable")
		return models.User{}, fmt.Errorf("could not find env variable %s", keys.OS_ENV_PASSWORD)
	}

	return models.User{
		Username: username,
		Password: password,
	}, nil
}

func SetTokenCookie(ctx *gin.Context, token string) {
	hostString := ctx.Request.Host
	parts := strings.Split(hostString, ":")
	host := parts[0]

	ctx.SetCookie("token", token, 3600, "/", host, false, true)
}

func GetTokenCookie(ctx *gin.Context) (string, error) {
	token, err := ctx.Cookie("token")
	if err != nil {
		return "", err
	}
	return token, nil
}

func IsAuthorized(ctx *gin.Context) bool {

	token, err := GetTokenCookie(ctx)
	if err != nil {
		return false
	}

	err = ValidateJWT(token)
	if err != nil {
		return false
	}

	return true
}
