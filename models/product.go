package models

import (
	"ct.com/ct_compare/models/response_model"
)

type Product struct {
	Images           []Image
	Name             string
	ShortDescription string
	Description      string
	Rating           string
	RatingsCount     string
	CurrentPrice     CurrentPrice
	Specifications   []Specification
	Features         []string
	ReviewSummary    ReviewSummary
	Summary          []string
	Fulfillment      Fulfillment
	Code             string
	Sku              string
}

type Image struct {
	AltText                 string
	MediaType               string
	IsListingThumbnailImage bool
	URL                     string
	DisplayPriority         int
}

type Fulfillment struct {
	Quantity    int
	AltLocation string
}

type CurrentPrice struct {
	Value    float64
	MaxPrice float64
	MinPrice float64
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

	value := productResp.CurrentPrice.Value
	minPrice := productResp.CurrentPrice.MinPrice
	var maxPrice float64
	if productResp.CurrentPrice.MaxPrice == nil {
		maxPrice = 0
	} else {
		maxPrice = *productResp.CurrentPrice.MaxPrice
	}

	quantity := productResp.Fulfillment.Availability.Quantity
	var altLocation string
	if productResp.Fulfillment.Availability.AltLocations == nil {
		altLocation = "None"
	} else {
		altLocation = *productResp.Fulfillment.Availability.AltLocations
	}
	fulfillment := Fulfillment{
		Quantity:    quantity,
		AltLocation: altLocation,
	}

	images := []Image{}
	for _, img := range productResp.Images {
		image := Image{
			AltText:                 img.AltText,
			URL:                     img.URL,
			MediaType:               img.MediaType,
			IsListingThumbnailImage: img.IsListingThumbnailImage,
			DisplayPriority:         img.DisplayPriority,
		}
		images = append(images, image)
	}

	currentPrice := CurrentPrice{
		Value:    value,
		MinPrice: minPrice,
		MaxPrice: maxPrice,
	}

	return Product{
		Images:           images,
		Name:             productResp.Name,
		ShortDescription: productResp.ShortDescription,
		Description:      productResp.LongDescription,
		Rating:           productResp.Rating,
		RatingsCount:     productResp.RatingsCount,
		Specifications:   specifications,
		Features:         features,
		ReviewSummary:    reviewSummary,
		CurrentPrice:     currentPrice,
		Fulfillment:      fulfillment,
		Code:             productResp.Code,
		Sku:              productResp.Skus[0].Code,
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
