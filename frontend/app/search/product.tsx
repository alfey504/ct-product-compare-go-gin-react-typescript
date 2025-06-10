import { Product } from "../../types/search-types";
import React from "react"
 
export function ProductDetails({
    className,
    product,
    addToCompare,
    isOnCart, 
}: {
    className?: string,
    product?: Product,
    addToCompare: (product: Product) => Promise<void>
    isOnCart: (product: Product) => void 
}){
    return (
        <div className={className}>
            <div className="flex flex-col w-full mt-20">
                <div className="flex flex-row justify-between ">
                    <div className="flex flex-col">
                        <span className="font font-bold">{(product == undefined)? "" : product.title}</span>
                        <span className=" text-md text-gray-500">#{(product == undefined)? "" :product.skuId}</span>
                        <img src={(product == undefined)? "" :product.images[0].url} alt={(product == undefined)? "" :product.images[0].altText} className="w-11/12 "/>
                    </div>
                    <div className="flex flex-col w-full mt-20">
                        <div className="flex flex-row w-full justify-start">
                            <button className=" bg-green-600 text-white w-32 pt-2 pb-2 pl-3 pr-3 rounded-lg ml-10 ">Add</button>
                            <button className="bg-red-500 text-white w-32 pt-2 pb-2 pl-3 pr-3 rounded-lg ml-10">Website</button>
                        </div>
                        <SummarySection product={product}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SummarySection({
    className,
    product,
}:{
    className?: string
    product?: Product
}) {
    return(
        <div className={className}>
            <div className="">

            </div>
        </div>
    )
}

