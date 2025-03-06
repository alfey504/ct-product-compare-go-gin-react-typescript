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

func Fetch[K interface{}](config RequestConfig, model *K) error {
	if !slices.Contains(AVAILABLE_METHODS, config.Method) {
		return fmt.Errorf("unknown method : %s ", config.Method)
	}

	bodyJsonString := []byte{}
	var req *http.Request
	var err error
	if config.Body != nil {
		bodyJsonString, err = json.Marshal(config.Body)
		if err != nil {
			fmt.Println("Failed to marshal request body ", err.Error())
			return err
		}
		req, err = http.NewRequest(config.Method, config.Url, bytes.NewBuffer(bodyJsonString))
	} else {
		req, err = http.NewRequest(config.Method, config.Url, nil)
		if err != nil {
			fmt.Println("Failed to make request object : ", err.Error())
			return err
		}
	}

	for k, v := range config.Headers {
		req.Header.Add(k, v)
	}

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("Failed to make the request : ", err.Error())
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return fmt.Errorf("returned status code : %d status : %s", resp.StatusCode, resp.Status)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Failed to parse the response body")
		return err
	}

	if err := json.Unmarshal(body, model); err != nil {
		fmt.Println("Failed to parse body to model : ", err.Error())
		return err
	}
	return nil
}
