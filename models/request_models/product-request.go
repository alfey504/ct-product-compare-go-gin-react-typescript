package request_models

type ProductRequest struct {
	Product1 string `json:"product1" validate:"required"`
	Product2 string `json:"product2" validate:"required"`
}
