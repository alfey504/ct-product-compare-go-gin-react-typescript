import React from "react";
import ReactDOM from "react-dom/client"
import  Page from "./product-compare/page";

const url = document.URL
console.log(url)

const root = ReactDOM.createRoot(document.querySelector("#application")!);
root.render(<Page />);
