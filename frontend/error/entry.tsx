import React from "react"
import ReactDOM from "react-dom/client"
import App from "./page"
import { ErrorProp } from "../../type"

const initialProps = (window as any).__INITIAL_PROPS__ as ErrorProp

const applicationDiv = document.querySelector("#application")
if (applicationDiv != null) {
    const root = ReactDOM.createRoot(applicationDiv)
    root.render(<App errorProps={initialProps}/>)
}


