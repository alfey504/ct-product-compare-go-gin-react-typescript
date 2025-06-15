package response_model

type SearchResponse struct {
	Products   []Product  `json:"products"`
	Pagination Pagination `json:"pagination"`
}

type Product struct {
	URL                string             `json:"url"`
	Code               string             `json:"code"`
	Title              string             `json:"title"`
	Images             []Image            `json:"images"`
	ShortDescription   string             `json:"shortDescription"`
	LongDescription    string             `json:"longDescription"`
	Brand              Brand              `json:"brand"`
	Rating             float64            `json:"rating"`
	RatingsCount       int                `json:"ratingsCount"`
	FeatureBullets     []FeatureBullet    `json:"featureBullets"`
	SkuID              string             `json:"skuId"`
	CurrentPrice       Price              `json:"currentPrice"`
	PartNumber         string             `json:"partNumber"`
	Badges             []string           `json:"badges"`
	IsMultiSku         bool               `json:"isMultiSku"`
	ExtraInfo          []ExtraInfo        `json:"extraInfo"`
	IsOnSale           bool               `json:"isOnSale"`
	OriginalPrice      Price              `json:"originalPrice"`
	TotalCurrentPrice  Price              `json:"totalCurrentPrice"`
	TotalOriginalPrice Price              `json:"totalOriginalPrice"`
	FeeValues          map[string]float64 `json:"feeValues"`
	Sellable           bool               `json:"sellable"`
	Orderable          bool               `json:"orderable"`
	Fulfillment        Fulfillment        `json:"fulfillment"`
	WarrantyMessage    string             `json:"warrantyMessage"`
	SkuCode            string             `json:"skuCode"`
}

type Image struct {
	AltText string `json:"altText"`
	URL     string `json:"url"`
}

type Brand struct {
	Label string      `json:"label"`
	URL   interface{} `json:"url"`
}

type FeatureBullet struct {
	Description string `json:"description"`
}

type Price struct {
	Value    float64     `json:"value"`
	MaxPrice interface{} `json:"maxPrice"`
	MinPrice interface{} `json:"minPrice"`
}

type ExtraInfo struct {
	SkuID       string `json:"skuId"`
	SkuNumber   string `json:"skuNumber"`
	PartNumbers string `json:"partNumbers"`
}

type Fulfillment struct {
	Availability Availability `json:"availability"`
}

type Availability struct {
	Quantity           int         `json:"quantity"`
	StoreShelfLocation interface{} `json:"storeShelfLocation"`
	AltLocations       interface{} `json:"altLocations"`
}

type Pagination struct {
	Total int `json:"total"`
}
