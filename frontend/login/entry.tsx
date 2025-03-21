import React from "react"
import ReactDOM from "react-dom/client"
import App from "./page.tsx"

const applicationDOM = document.querySelector("#application")
if (applicationDOM != null){
    const root = ReactDOM.createRoot(applicationDOM)
    root.render(<App/>)
}else{
    console.error(new Error("missing injector div with application ID"))
}

