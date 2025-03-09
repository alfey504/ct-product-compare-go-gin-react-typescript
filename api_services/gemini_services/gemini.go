package gemini_services

import (
	"fmt"
	"os"

	"ct.com/ct_compare/api_services/api_utils"
	"ct.com/ct_compare/keys"
	"ct.com/ct_compare/models"
)

// gemini request modelz
type GeminiRequest struct {
	Contents []GeminiContent `json:"contents"`
}

type GeminiContent struct {
	Parts []GeminiPart `json:"parts"`
}
type GeminiPart struct {
	Text string `json:"text"`
}

func MakeGeminiRequest(prompt string) GeminiRequest {
	return GeminiRequest{
		Contents: []GeminiContent{
			{
				Parts: []GeminiPart{
					{Text: prompt},
				},
			},
		},
	}
}

// Gemini response model
type GeminiResponse struct {
	Candidates []struct {
		Content GeminiContent `json:"content"`
	} `json:"candidates"`
}

// custom request
func GetSummary(p1 models.Product, p2 models.Product) (models.Summary, error) {
	apiKey, ok := os.LookupEnv(keys.OS_ENV_GEMINI_API_KEY)
	if !ok {
		return models.Summary{}, fmt.Errorf("failed to fetch gemini api key")
	}
	url := fmt.Sprintf("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=%s", apiKey)

	prompt := MakePrompt(p1, p2)
	requestBody := MakeGeminiRequest(prompt)
	config := api_utils.RequestConfig{
		Url:     url,
		Method:  api_utils.API_METHOD_POST,
		Headers: map[string]string{},
		Body:    requestBody,
	}

	geminiResponse := GeminiResponse{}
	if err := api_utils.Fetch(config, &geminiResponse); err != nil {
		fmt.Println("Failed to make the request , ", err.Error())
		return models.Summary{}, err
	}

	println()
	text := ""
	for _, part := range geminiResponse.Candidates[0].Content.Parts {
		text = text + part.Text
	}
	strippedText := stripMarkDown(text)
	summary, err := models.MakeSummary(strippedText)
	if err != nil {
		fmt.Println("Failed to make the summary model")
		return models.Summary{}, err
	}

	return summary, nil
}
