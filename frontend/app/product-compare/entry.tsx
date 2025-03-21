import React from "react";
import ReactDOM from "react-dom/client"
import  Page from "./page";

const url = document.URL
console.log(url)

const applicationDiv = document.querySelector("#application")
if (applicationDiv != null ){
    const root = ReactDOM.createRoot(document.querySelector("#application")!);
    root.render(<Page />);
} 

