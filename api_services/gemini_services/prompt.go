package gemini_services

import (
	"fmt"

	"ct.com/ct_compare/models"
)

const promptRequest = `give me a summary of both products and few key differences between them in a json in the format 
{
"product1": ["summary point 1", "summary point 2",.. etc],

"product2":["summary point 1", "summary point 2",.. etc],

"keydifferences":["key difference 1", "key difference 2", ..etc]
}

nothing else should be included in the in replay and make sure to follow proper json formatting. make sure to use language understandable by the average person.`

type ProductDescription struct {
	description string
}

func MakeProductDescription() ProductDescription {
	return ProductDescription{
		description: "",
	}
}

func (pd *ProductDescription) Add(key string, value string) {
	pd.description = pd.description + key + ":\n" + value + "\n\n"
}

func (pd ProductDescription) Stringify() string {
	return pd.description
}

func MakePrompt(p1 models.Product, p2 models.Product) string {
	p1Description := makeProductDescription(p1)
	p2Description := makeProductDescription(p2)
	return fmt.Sprintf("Product 1 : \n\n %s \n\n\n\nProduct 2 : \n\n %s", p1Description, p2Description)
}

func makeProductDescription(product models.Product) string {
	specification := product.Specifications
	specString := ""
	for _, specs := range specification {
		specString = specString + specs.Label + " - " + specs.Value + "\n"
	}

	featureBullets := product.Features
	featureStrings := ""
	for _, fb := range featureBullets {
		featureStrings = featureStrings + fb + "\n"
	}

	productDescription := MakeProductDescription()
	productDescription.Add("Name", product.Name)
	productDescription.Add("Short Description", product.ShortDescription)
	productDescription.Add("Description", product.Description)
	productDescription.Add("Rating", product.Rating)
	productDescription.Add("RatingsCount", product.RatingsCount)
	productDescription.Add("Specification", specString)
	productDescription.Add("Features", featureStrings)

	productDescription.Add("Request", promptRequest)
	return productDescription.Stringify()
}
