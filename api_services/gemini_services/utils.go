package gemini

// func parseTextFromResponse(resp *genai.GenerateContentResponse) string {
// 	responseString := ""
// 	for _, cand := range resp.Candidates {
// 		if cand.Content != nil {
// 			for _, part := range cand.Content.Parts {
// 				responseString = responseString + fmt.Sprint(part)
// 			}
// 		}
// 	}
// 	return stripMarkDown(responseString)
// }

func stripMarkDown(str string) string {
	strippedString := ""
	opened := false
	for _, s := range str {
		// print(s)
		if s == '{' {
			opened = true
		}

		if s == '}' {
			strippedString = strippedString + string(s)
			opened = false
		}

		if opened {
			strippedString = strippedString + string(s)
		}

	}
	return strippedString
}
