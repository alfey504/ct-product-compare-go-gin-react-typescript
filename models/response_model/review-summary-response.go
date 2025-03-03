package response_model

type ReviewSummaryResponse struct {
	Subjects struct {
		Positive map[string]Subject `json:"positive"`
		Negative map[string]Subject `json:"negative"`
	} `json:"subjects"`
}

type Subject struct {
	PresenceCount int      `json:"presenceCount"`
	MentionsCount int      `json:"mentionsCount"`
	BestExamples  []Review `json:"bestExamples"`
}

type Review struct {
	Rating         float64 `json:"rating"`
	About          string  `json:"about"`
	ReviewText     string  `json:"reviewText"`
	Author         string  `json:"author"`
	SnippetID      string  `json:"snippetId"`
	ReviewID       string  `json:"reviewId"`
	Summary        string  `json:"summary"`
	SubmissionTime string  `json:"submissionTime"`
	ReviewTitle    string  `json:"reviewTitle"`
}
