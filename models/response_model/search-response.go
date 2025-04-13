package response_model

type SearchResponse struct {
	Products []Product `json:"products"`
}

type Product struct {
	URL            string          `json:"url"`
	Code           string          `json:"code"`
	Title          string          `json:"title"`
	Images         []Image         `json:"images"`
	Brand          Brand           `json:"brand"`
	Rating         float64         `json:"rating"`
	RatingsCount   int             `json:"ratingsCount"`
	FeatureBullets []FeatureBullet `json:"featureBullets"`
	SkuID          string          `json:"skuId"`
	// Skus                    []interface{}          `json:"skus"`
	CurrentPrice            Price              `json:"currentPrice"`
	DisplayWasLabel         bool               `json:"displayWasLabel"`
	OfferDesc               interface{}        `json:"OfferDesc"`
	BreadcrumbList          interface{}        `json:"breadcrumbList"`
	PriceMessage            []PriceMessage     `json:"priceMessage"`
	PartNumber              string             `json:"partNumber"`
	Badges                  []string           `json:"badges"`
	LowStockThreshold       int                `json:"lowStockThreshold"`
	ProductWheelType        interface{}        `json:"productWheelType"`
	FitmentMarkKey          interface{}        `json:"fitmentMarkKey"`
	FitmentCompatibilityKey interface{}        `json:"fitmentCompatibilityKey"`
	IsMultiSku              bool               `json:"isMultiSku"`
	ComparisonEnabled       bool               `json:"comparisonEnabled"`
	ExtraInfo               []ExtraInfo        `json:"extraInfo"`
	FeeMessages             []interface{}      `json:"feeMessages"`
	IsOnSale                bool               `json:"isOnSale"`
	OriginalPrice           Price              `json:"originalPrice"`
	TotalCurrentPrice       Price              `json:"totalCurrentPrice"`
	TotalOriginalPrice      Price              `json:"totalOriginalPrice"`
	FeeValues               map[string]float64 `json:"feeValues"`
	Sellable                bool               `json:"sellable"`
	Orderable               bool               `json:"orderable"`
	Fulfillment             Fulfillment        `json:"fulfillment"`
	WarrantyMessage         string             `json:"warrantyMessage"`
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

type PriceMessage struct {
	Label   interface{} `json:"label"`
	Tooltip interface{} `json:"tooltip"`
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
	Quantity           int                   `json:"quantity"`
	StoreShelfLocation interface{}           `json:"storeShelfLocation"`
	AltLocations       interface{}           `json:"altLocations"`
	Corporate          CorporateAvailability `json:"Corporate"`
}

type CorporateAvailability struct {
	MaxETA      string `json:"MaxETA"`
	MinETA      string `json:"MinETA"`
	MinOrderQty int    `json:"MinOrderQty"`
	Quantity    int    `json:"Quantity"`
}
