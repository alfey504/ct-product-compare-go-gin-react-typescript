import React from "react"
import { Product, ProductCompare } from "../type"


export default function ProductSummary({
    product
  }:{
    product: ProductCompare | undefined
  }) {
  
    if (product == undefined) {
      return <div className="flex flex-grow h-1/2 justify-center items-center">please enter the product numbers</div>
    }
  
    return (
      <div>
        <SummaryBlock className="mt-10" product={product.Product1}/>
        <SummaryBlock className="mt-10" product={product.Product2}/>
        <KeyDifferences className="mt-10" keyDifferences={product.KeyDifferences}/>
      </div>
    )
  }
  
  function SummaryBlock({
    product,
    className
  }: {
    product: Product,
    className?: string
  }) {
    const classes = (className == undefined) ? "" : className
    return (
        <div className={classes}>
          <div className="p-5 border-2 border-gray-100 rounded-2xl shadow-lg">
            <h1 className="font-bold">{product.Name}</h1>
            <ul className="mt-3 mb-3 ml-3 list-disc">
            {product.Summary.map((summary: string)=>{
              return <li className="mt-2">{summary}</li>
            })}
            </ul>
          </div>
        </div>
    )
  } 
  
function KeyDifferences({
    keyDifferences,
    className
  }:{
    keyDifferences: string[],
    className?: string 
  }) {
    const classes = (className == undefined) ? "" : className
    return(
      <div className={classes}>
          <div className="p-5 border-2 border-gray-100 rounded-2xl shadow-lg">
            <h1 className="font-bold">Key Differences</h1>
            <ul className="mt-3 mb-3 ml-3 list-disc">
            {keyDifferences.map((summary: string)=>{
              return <li className="mt-2">{summary}</li>
            })}
            </ul>
          </div>
        </div>
    )
  }