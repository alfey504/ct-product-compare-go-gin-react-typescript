package response_model

type ProductResponse struct {
	Images []struct {
		AltText                 string `json:"altText"`
		MediaType               string `json:"mediaType"`
		IsListingThumbnailImage bool   `json:"isListingThumbnailImage"`
		URL                     string `json:"url"`
		DisplayPriority         int    `json:"displayPriority"`
	} `json:"images"`
	Name             string        `json:"name"`
	Code             string        `json:"code"`
	Rating           int           `json:"rating"`
	RatingsCount     string        `json:"ratingsCount"`
	Options          []interface{} `json:"options"`
	ShortDescription string        `json:"shortDescription"`
	LongDescription  string        `json:"longDescription"`
	FeatureBullets   []struct {
		Description string `json:"description"`
	} `json:"featureBullets"`
	Specifications []struct {
		Code       string `json:"code"`
		Label      string `json:"label"`
		Value      string `json:"value"`
		Visibility bool   `json:"visibility"`
		Position   int    `json:"position"`
	} `json:"specifications"`
	Type string `json:"type"`
}
