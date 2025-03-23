package server_props_models

type ErrorProps struct {
	ErrorCode int
	Message   string
	Redirect  Redirect
}

type Redirect struct {
	DoesRedirect bool
	HyperLink    string
	Title        string
}

func MakeErrorProp(code int, message string) ErrorProps {
	return ErrorProps{
		ErrorCode: code,
		Message:   message,
		Redirect: Redirect{
			DoesRedirect: false,
			HyperLink:    "",
			Title:        "",
		},
	}
}

func MakeRedirectableErrorProp(code int, message string, hyperlink string, title string) ErrorProps {
	return ErrorProps{
		ErrorCode: code,
		Message:   message,
		Redirect: Redirect{
			DoesRedirect: true,
			HyperLink:    hyperlink,
			Title:        title,
		},
	}
}
