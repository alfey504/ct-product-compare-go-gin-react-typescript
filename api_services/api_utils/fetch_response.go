package api_utils

type FetchError struct {
	StatusCode int
	Status     string
	Message    string
	Err        error
}

func (fe FetchError) IsError() bool {
	return fe.Err != nil
}

func (fe FetchError) Error() string {
	return fe.Err.Error()
}
