package utils

import (
	"fmt"
	"os"

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
	ctx.SetCookie("Username", user.Username, 3600, "/", "localhost", false, true)
	ctx.SetCookie("Password", user.Password, 3600, "/", "localhost", false, true)
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
