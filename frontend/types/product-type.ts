

export type ProductCompare = {
    Product1: Product
    Product2: Product
    KeyDifferences: string[]
}

export type Product =  {
    Name : string
    Images : Image[]
    ShortDescription: string
    Description: string
    Rating : string
    RatingsCount : string
    CurrentPrice : Price
    Specifications : Specification[]
    Features: string[]
    ReviewSummary : ReviewSummary
    Summary: string[] | null
    Fulfillment: Fulfillment
    Sku: string
    Code: string
}

export type Image = {
    AltText: string
    MediaType: string
    IsListingThumbnailImage: boolean
    URL: string
    DisplayPriority: number
}

export type Fulfillment = {
    Quantity : number
    ALtLocation : string
}

export type Price =  {
    Value : number
    MinPrice : number
    MaxPrice : number 
}
export type Specification = {
    Label: string
    Value: string
}

export type Review = {
    Title: string
    Text: string
    Rating: number
}

export type ReviewSummary = {
    Positive: Subject[]
    Negative: Subject[]
}

export type Subject = {
    Subject: string
    PresenceCount: number
    MentionsCount: number
    Examples: Review[]
}

export type ErrorProp = {
    ErrorCode: number,
    Message: string,
    Redirect: {
        DoesRedirect: boolean,
        HyperLink: string,
        Title: string,
    }
}
