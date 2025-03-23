
export type User = {
    Username: string,
    Password: string
}

export type ApiResponse<T> = {
    StatusCode: number
    Message: string
    Data: T | null
}

export type ProductCompare = {
    Product1: Product
    Product2: Product
    KeyDifferences: string[]
}
export type Product =  {
    Name : string
    ShortDescription: string
    Description: string
    Rating : string
    RatingsCount : string
    Specifications : Specification[]
    Features: string[]
    ReviewSummary : ReviewSummary
    Summary: string[]
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