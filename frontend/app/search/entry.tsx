import React from "react";
import ReactDOM from "react-dom/client"
import Page from "./page";

const applicationDiv = document.querySelector("#application")

if (applicationDiv != null) {
        const root = ReactDOM.createRoot(applicationDiv)
        root.render(<Page/>)
}