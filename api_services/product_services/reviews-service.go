package product_services

// type ReviewsResponse struct {
// 	Limit        int      `json:"Limit"`
// 	Offset       int      `json:"Offset"`
// 	TotalResults int      `json:"TotalResults"`
// 	Locale       string   `json:"Locale"`
// 	Results      []Result `json:"Results"`
// }

// type Result struct {
// 	Rating       int    `json:"Rating"`
// 	ReviewText   string `json:"ReviewText"`
// 	Title        string `json:"Title"`
// 	UserNickname string `json:"UserNickname"`
// }

// func GetReviews(productNo string) ([]models.Result, error) {
// 	reviewsResponse, err := makeReviewsRequest(productNo, 0)
// 	if err != nil {
// 		println("Failed to make the reviews request ", err.Error())
// 		return []models.Result{}, nil
// 	}

// 	results := []models.Result{}
// 	results = append(results, reviewsResponse.Results...)
// 	limit := reviewsResponse.Limit
// 	offset := reviewsResponse.Offset
// 	max := reviewsResponse.TotalResults
// 	for (limit + offset) < max {
// 		offset = limit + offset
// 		reviews, err := makeReviewsRequest(productNo, offset)
// 		if err != nil {
// 			return []models.Result{}, err
// 		}
// 		results = append(results, reviews.Results...)
// 	}

// 	return results, nil

// }

// func makeReviewsRequest(productNo string, offset int) (models.ReviewsResponse, error) {
// 	url := fmt.Sprintf(
// 		"https://api.bazaarvoice.com/data/reviews.json?resource=reviews&action=REVIEWS_N_STATS&filter=productid%%3Aeq%%3A%sP&include=authors%%2Cproducts%%2Ccomments&offset=%d&sort=rating%%3Adesc&passkey=caR9sV1NAtHiAO4Z4BDLJXaiCOlgoAQYOSBXX28mPrGmo&apiversion=5.5&displaycode=15041_3_0-en_ca",
// 		productNo,
// 		offset,
// 	)
// 	apiConfig := utils.ApiConfig{
// 		Url:    url,
// 		Method: utils.API_METHOD_GET,
// 		Headers: map[string]string{
// 			"User-Agent":                "PostmanRuntime/7.37.3",
// 			"ocp-apim-subscription-key": "c01ef3612328420c9f5cd9277e815a0e",
// 			"baseSiteId":                "CTR",
// 		},
// 		Body: nil,
// 	}
// 	reviewsResponse := models.ReviewsResponse{}
// 	if err := utils.Fetch(apiConfig, &reviewsResponse); err != nil {
// 		fmt.Println("Failed to make the reviews request : ", err.Error())
// 		return models.ReviewsResponse{}, err
// 	}
// 	return reviewsResponse, nil
// }
