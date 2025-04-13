package response_model

type ResolveResponse struct {
	AutoCorrectQuery *string      `json:"autoCorrectQuery"`
	DidYouMean       *string      `json:"didYouMean"`
	CustomFields     CustomFields `json:"customFields"`
	ClearUrl         *string      `json:"clearUrl"`
	RedirectUrl      *string      `json:"redirectUrl"`
}

type CustomFields struct {
	Debug Debug `json:"debug"`
}

type Debug struct {
	IsCodeLookup      bool `json:"isCodeLookup"`
	IsMultiCodeLookup bool `json:"isMultiCodeLookup"`
}
