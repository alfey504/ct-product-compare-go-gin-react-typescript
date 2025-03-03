package models

type ProductCompare struct {
	Product1       Product
	Product2       Product
	KeyDifferences []string
}

func MakeProductCompare(p1 Product, p2 Product, kd []string) ProductCompare {
	return ProductCompare{
		Product1:       p1,
		Product2:       p2,
		KeyDifferences: kd,
	}
}
