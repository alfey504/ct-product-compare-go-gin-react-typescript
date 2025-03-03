package models

import (
	"encoding/json"
	"fmt"
)

type Summary struct {
	Product1       []string `json:"product1"`
	Product2       []string `json:"product2"`
	KeyDifferences []string `json:"keydifferences" `
}

func MakeSummary(str string) (Summary, error) {
	summary := Summary{}
	if err := json.Unmarshal([]byte(str), &summary); err != nil {
		fmt.Println("Failed to make summary from string ,", err.Error())
		return Summary{}, err
	}
	return summary, nil
}
