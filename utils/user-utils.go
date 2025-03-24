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

func SetUserCookie(ctx *gin.Context, user models.User) {
	hostString := ctx.Request.Host
	parts := strings.Split(hostString, ":")
	host := parts[0]

	ctx.SetCookie("Username", user.Username, 3600, "/", host, false, true)
	ctx.SetCookie("Password", user.Password, 3600, "/", host, false, true)
}

func GetUserCookie(ctx *gin.Context) (models.User, error) {
	username, err := ctx.Cookie("Username")
	if err != nil {
		return models.User{}, err
	}

	password, err := ctx.Cookie("Password")
	if err != nil {
		return models.User{}, err
	}

	return models.User{
		Username: username,
		Password: password,
	}, nil
}

func IsAuthorized(ctx *gin.Context) bool {
	user, err := GetUser()
	if err != nil {
		return false
	}

	userCookies, err := GetUserCookie(ctx)
	if err != nil {
		return false
	}

	if user.Username != userCookies.Username || user.Password != user.Password {
		return false
	}

	return true
}
