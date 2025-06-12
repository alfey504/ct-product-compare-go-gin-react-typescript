package models

import (
	"ct.com/ct_compare/models/response_model"
)

type Product struct {
	Name             string
	ShortDescription string
	Description      string
	Rating           string
	RatingsCount     string
	Specifications   []Specification
	Features         []string
	ReviewSummary    ReviewSummary
	Summary          []string
}

type Specification struct {
	Label string
	Value string
}

type Review struct {
	Title  string
	Text   string
	Rating float64
}

type ReviewSummary struct {
	Positive []Subject
	Negative []Subject
}

type Subject struct {
	Subject       string
	PresenceCount int
	MentionsCount int
	Examples      []Review
}

func MakeProduct(productResp response_model.ProductResponse, reviewSummaryResp response_model.ReviewSummaryResponse) Product {

	positives := ParseSubjects(reviewSummaryResp.Subjects.Positive)
	negatives := ParseSubjects(reviewSummaryResp.Subjects.Negative)

	reviewSummary := ReviewSummary{
		Positive: positives,
		Negative: negatives,
	}

	features := []string{}
	for _, feature := range productResp.FeatureBullets {
		features = append(features, feature.Description)
	}

	specifications := []Specification{}
	for _, spec := range productResp.Specifications {
		specification := Specification{
			Label: spec.Label,
			Value: spec.Value,
		}
		specifications = append(specifications, specification)
	}
	return Product{
		Name:             productResp.Name,
		ShortDescription: productResp.ShortDescription,
		Description:      productResp.LongDescription,
		Rating:           productResp.Rating,
		RatingsCount:     productResp.RatingsCount,
		Specifications:   specifications,
		Features:         features,
		ReviewSummary:    reviewSummary,
	}
}

func ParseSubjects(subjects map[string]response_model.Subject) []Subject {
	parsedSubjects := []Subject{}
	for subj, subjDet := range subjects {
		reviews := []Review{}
		for _, r := range subjDet.BestExamples {
			review := Review{
				Title:  r.ReviewTitle,
				Text:   r.ReviewText,
				Rating: r.Rating,
			}
			reviews = append(reviews, review)
		}
		subject := Subject{
			Subject:       subj,
			PresenceCount: subjDet.PresenceCount,
			MentionsCount: subjDet.MentionsCount,
			Examples:      reviews,
		}
		parsedSubjects = append(parsedSubjects, subject)
	}
	return parsedSubjects
}
