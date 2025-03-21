package response_model

type ApiResponse struct {
	StatusCode int
	Message    string
	Data       interface{}
}

func MakeApiResponse(statusCode int, message string, data interface{}) ApiResponse {
	return ApiResponse{
		StatusCode: statusCode,
		Message:    message,
		Data:       data,
	}
}
