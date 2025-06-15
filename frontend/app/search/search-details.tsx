import React from "react";
import { Product } from "../../types/search-types";
import { AddToCompareType, IsOnCartType, PageData } from "./page";


export function SearchGrid({
    className,
    pageData,
    addToCompare,
    isOnCart,
    selectProduct,
}: {
    className?: string;
    pageData: PageData;
    addToCompare: AddToCompareType;
    isOnCart: IsOnCartType;
    selectProduct: (productNo: string) => void
}) {
    return (
        <div className={className}>
            <div className="flex justify-center">
                <div className="flex flex-row justify-start flex-wrap mt-10 items-center">
                    {pageData.searchData?.getProducts().map((product) => {
                        return (
                            <ProductCard
                                product={product}
                                addToCompare={addToCompare}
                                isOnCart={isOnCart}
                                onClick={async () => selectProduct(product.skuId)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function ProductCard({
    className,
    product,
    addToCompare,
    isOnCart,
    onClick,
}: {
    className?: string;
    product: Product;
    addToCompare: AddToCompareType;
    isOnCart: IsOnCartType;
    onClick: () => Promise<void>
}) {
    const trimmedTitle =
        product.title.length <= 30
            ? product.title
            : product.title.slice(0, 30) + "...";
    const stars = (function (): string {
        const star = "★";
        const emptyStar = "☆";
        const rating = Math.floor(product.rating);
        return star.repeat(rating) + emptyStar.repeat(5 - rating);
    })();
    const rating = product.rating.toFixed(1);
    const buttonState = isOnCart(product.skuId) ? "Remove" : "Add";

    console.log(
        product.totalOriginalPrice.value +
        "->" +
        product.originalPrice.value +
        "->" +
        product.totalOriginalPrice.value
    );
    return (
        <div className={className} onClick={() => onClick()}>
            <div className="flex flex-col p-4 border-2  rounded-xl border-gray-200 shadow-lg mt-3 mb-3 ml-3 mr-3 h-96">
                <div className="flex justify-center items-center w-52 h-52">
                    <img src={product.images[0].url} width="50%" height="50%" />
                </div>
                <span className=" text-md font-semibold mt-5 w-52">{trimmedTitle}</span>
                <span className="text-md text-amber-400">
                    {stars}
                    <span className="text-sm text-black">{rating}</span>
                    <span className=" text-sm text-gray-400">
                        ({product.ratingsCount})
                    </span>
                </span>
                <span className="text-sm text-gray-400">#{product.skuId}</span>
                <span>${product.currentPrice.value}</span>
                <div className="flex flex-row justify-around items-center mt-5 mb-5">
                    <button
                        className=" bg-green-800  text-white pt-2 pb-2 pl-3 pr-3 rounded-lg"
                        onClick={() => {
                            addToCompare(product.skuId);
                        }}
                    >
                        {buttonState}
                    </button>
                    <button
                        className="bg-red-500 text-white pt-2 pb-2 pl-3 pr-3 rounded-lg"
                        onClick={() => {
                            window.location.href = "https://www.canadiantire.ca";
                        }}
                    >
                        Website
                    </button>
                </div>
            </div>
        </div>
    );
}