package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func JsonResponse(w *http.ResponseWriter, jsonData interface{}) {
	jsonBytes, err := json.Marshal(jsonData)
	if err != nil {
		fmt.Printf("failed to marshal json response")
		return
	}

	(*w).Header().Set("Content-Type", "application/json")
	(*w).Write(jsonBytes)
}

func GetJsonBody(r *http.Request) ([]byte, error) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		return []byte{}, err
	}
	defer r.Body.Close()
	return body, nil
}

func RespondError(w *http.ResponseWriter, err error) {
	errResponse := map[string]string{
		"message": err.Error(),
	}
	JsonResponse(w, errResponse)
}
