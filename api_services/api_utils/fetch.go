package api_utils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"slices"
)

const API_METHOD_GET = "GET"
const API_METHOD_POST = "POST"
const API_METHOD_DELETE = "DELETE"
const API_METHOD_UPDATE = "UPDATE"

var AVAILABLE_METHODS = []string{API_METHOD_GET, API_METHOD_POST, API_METHOD_DELETE, API_METHOD_UPDATE}

type RequestConfig struct {
	Url     string
	Method  string
	Headers map[string]string
	Body    interface{}
}

func Fetch[K interface{}](config RequestConfig, model *K) FetchError {
	if !slices.Contains(AVAILABLE_METHODS, config.Method) {
		err := fmt.Errorf("unknown method : %s ", config.Method)
		return FetchError{
			StatusCode: -1,
			Status:     fmt.Sprintf("unknown method : %s ", config.Method),
			Message:    fmt.Sprintf("unknown method : %s ", config.Method),
			Err:        err,
		}
	}

	req, err := MakeRequest(config)
	if err != nil {
		fmt.Printf("Failed to make request error : %s \n", err.Error())
		return FetchError{
			StatusCode: -1,
			Status:     "Failed to make request object",
			Message:    "Failed to make request object",
			Err:        err,
		}
	}

	for k, v := range config.Headers {
		req.Header.Add(k, v)
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Request failed : ", err.Error())
		return FetchError{
			StatusCode: resp.StatusCode,
			Status:     resp.Status,
			Message:    "Error making api call",
			Err:        err,
		}
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		msg := fmt.Sprintf("returned status code : %d status : %s", resp.StatusCode, resp.Status)
		return FetchError{
			StatusCode: resp.StatusCode,
			Status:     resp.Status,
			Message:    "api request failed",
			Err:        fmt.Errorf(msg),
		}
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Failed to parse the response body")
		return FetchError{
			StatusCode: resp.StatusCode,
			Status:     resp.Status,
			Message:    "Failed to parse api body",
			Err:        err,
		}
	}

	if err := json.Unmarshal(body, model); err != nil {
		fmt.Println("Failed to parse body to model : ", err.Error())
		return FetchError{
			StatusCode: resp.StatusCode,
			Status:     resp.Status,
			Message:    "failed to parse response body",
			Err:        err,
		}
	}

	return FetchError{
		StatusCode: resp.StatusCode,
		Status:     resp.Status,
		Message:    "Success",
		Err:        nil,
	}
}

func MakeRequest(config RequestConfig) (*http.Request, error) {
	bodyJsonString := []byte{}
	var req *http.Request
	var err error
	if config.Body != nil {
		bodyJsonString, err = json.Marshal(config.Body)
		if err != nil {
			fmt.Println("Failed to marshal request body ", err.Error())
			return nil, err
		}
		req, err = http.NewRequest(config.Method, config.Url, bytes.NewBuffer(bodyJsonString))
		if err != nil {
			fmt.Println("Failed to make request object : ", err.Error())
			return nil, err
		}
	} else {
		req, err = http.NewRequest(config.Method, config.Url, nil)
		if err != nil {
			fmt.Println("Failed to make request object : ", err.Error())
			return nil, err
		}
	}
	return req, nil
}
