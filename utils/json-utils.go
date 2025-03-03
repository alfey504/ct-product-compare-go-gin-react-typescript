package utils

import (
	"encoding/json"
	"fmt"
	"reflect"
	"strings"
)

var validatorFunc = map[string]func(t reflect.Type, val reflect.Value) bool{
	"required": Required,
}

func Required(t reflect.Type, val reflect.Value) bool {
	// just implementing string for now because we are only using strings in this project
	if t.Kind() == reflect.String {
		if val.String() == "" {
			return true
		}
	}
	return false
}

func ParseAndValidateJSON[T interface{}](data []byte, model *T) error {

	if err := json.Unmarshal(data, model); err != nil {
		return err
	}

	if err := validate(*model); err != nil {
		return err
	}

	return nil
}

func validate(T interface{}) error {
	t := reflect.TypeOf(T)
	v := reflect.ValueOf(T)

	if t.Kind() != reflect.Struct {
		return fmt.Errorf("given model is not a struct")
	}

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		fieldName := field.Name
		fieldValue := v.Field(i)

		validateTagStr, ok := field.Tag.Lookup("validate")
		if !ok {
			continue
		}

		validators := strings.Split(validateTagStr, ",")
		for _, v := range validators {
			function, exists := validatorFunc[v]
			if !exists {
				continue
			}
			if function(field.Type, fieldValue) {
				return fmt.Errorf("%s did not pass check : %s ", fieldName, v)
			}
		}
	}
	return nil
}
