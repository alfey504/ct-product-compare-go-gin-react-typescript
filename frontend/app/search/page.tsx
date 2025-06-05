 import React, { useRef, useState } from "react";
import { Pagination, Product, SearchResponse } from "../../types/search-types";
import { search, SearchData } from "./services";

type PageData = {
    searchData : SearchData | undefined
    message : string | undefined
}

export default function Page () {
    
    const searchRef = useRef<HTMLInputElement | null>(null)

    const [ pageData, setPageData ] = useState<PageData>({
        searchData: undefined,
        message: "Please enter a query to search",
    })    

    const onSearch = async () => {
        const searchQuery = searchRef.current?.value
        if (searchQuery == undefined) {
            return 
        }
        
        const searchData = await search(searchQuery) 
        if (searchData == undefined) {
            console.log("uffff failed returned undefined")
            setPageData({
                searchData: undefined,
                message: "there was an issue searching"
            })
            return
        }

        console.log("Huhhh worked but why not ??")
        setPageData({
            searchData: searchData,
            message: undefined
        })
    }

    return (
        <div>
            <NavBar searchRef={searchRef} onSearch={onSearch}/>
            <div className="flex flex-row justify-around flex-wrap mt-10 items-center">
                {pageData.searchData?.searchData.map((product) => {
                    return <ProductCard product={product} />
                 })}
            </div>
        </div>
    )
}

function NavBar({
    className,
    searchRef,
    onSearch,
}:{
    className?: string
    searchRef?: React.RefObject< HTMLInputElement | null >
    onSearch?: () => void
}) {
    
    return (
        <div className={className}>
            <div className="flex flex-row items-center border-b-1 border-b-gray-300 pb-5 shadow-lg">
                <img className="mt-7 ml-3 mb-3 mr-5 self-center " src="/public/images/can_tire_logo.svg" alt="canadian tire logo" width={100} height={100}/>
                <input className="w-96 h-10 mt-7 border-1 border-gray-300 p-2 rounded-lg shadow" type="text" placeholder="product #1" ref={searchRef} />
                <button className="w-10 h-10 self-end mb-8 ml-5 bg-rose-500 rounded-lg text-white shadow-2xl text-2xl" onClick={() => (onSearch == undefined) ? () => {} : onSearch()}>♲</button>
            </div>
        </div>
    )
}


function ProductCard({
    className,
    product,
}:{
    className?: string,
    product: Product,
}) {

    const trimTo = (str: string, len: number, trail: string) => {
        return str.slice(0, len) + trail
    }
    return (
        <div className={className}>
            <div className="flex flex-col p-4 border-2  rounded-xl border-gray-200 shadow-lg mt-3 mb-3">
                <img src={product.images[0].url} width={150} height={150}/>
                <span className=" text-md font-semibold mt-5 w-40">{trimTo(product.title, 30, "...")}</span>
                <span className="text-sm">{product.rating} star <span className=" text-sm text-gray-400">{product.ratingsCount}(reviews)</span></span>
                <span>#{product.skuId}</span>
            </div>
        </div>
    )
}