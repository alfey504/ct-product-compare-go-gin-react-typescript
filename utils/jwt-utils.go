package utils

import (
	"fmt"
	"os"
	"time"

	"ct.com/ct_compare/keys"
	"github.com/golang-jwt/jwt/v5"
)

var ErrInvalidToken = fmt.Errorf("invalid token")

func GenerateJwt(username string) (string, error) {
	jwtSecret, ok := os.LookupEnv(keys.OS_ENV_JWT_SECRET)
	if !ok {
		return "", fmt.Errorf("failed to fetch jwt secret key")
	}

	claims := jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 1).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(jwtSecret))
}

func ValidateJWT(tokenString string) error {
	jwtSecret, ok := os.LookupEnv(keys.OS_ENV_JWT_SECRET)
	if !ok {
		return fmt.Errorf("failed to fetch jwt secret key")
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method ")
		}
		return []byte(jwtSecret), nil
	})

	if err != nil {
		return err
	}

	if _, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return nil
	}

	return ErrInvalidToken
}
