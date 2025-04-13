package api_utils

type FetchError[T interface{}] struct {
	StatusCode int
	Status     string
	Message    string
	Err        error
	Data       T
}

func (fe FetchError[T]) IsError() bool {
	return fe.Err != nil
}

func (fe FetchError[T]) Error() string {
	return fe.Err.Error()
}

func TranslateTo[T interface{}, K interface{}](oldErr FetchError[T], newData K) FetchError[K] {
	return FetchError[K]{
		StatusCode: oldErr.StatusCode,
		Status:     oldErr.Status,
		Message:    oldErr.Message,
		Err:        oldErr.Err,
		Data:       newData,
	}
}

// type FetchError struct {
// 	StatusCode int
// 	Status     string
// 	Message    string
// 	Err        error
// }

// func (fe FetchError) IsError() bool {
// 	return fe.Err != nil
// }

// func (fe FetchError) Error() string {
// 	return fe.Err.Error()
// }
