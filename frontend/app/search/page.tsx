import React, { useRef, useState } from "react";
import { Pagination, Product, SearchResponse } from "../../types/search-types";
import { SearchData } from "./search-services";
import { ProductDetails } from "./product-dertails";

export type PageData = {
    searchData: SearchData | undefined;
    message: string | undefined;
    compareCart: Product[];
};

export default function Page() {
    const searchRef = useRef<HTMLInputElement | null>(null);

    const [pageData, setPageData] = useState<PageData>({
        searchData: undefined,
        message: "Please enter a query to search",
        compareCart: [],
    });

    const isOnCart = (product: Product): boolean => {
        for (let i = 0; i < pageData.compareCart.length; i++) {
            console.log(product.title);
            if (pageData.compareCart[i].title == product.title) {
                return true;
            }
        }
        return false;
    };

    const addToCompare = async (product: Product) => {
        let compareCart = pageData.compareCart;
        if (isOnCart(product)) {
            compareCart = compareCart.filter((item) => item !== product);
        } else {
            compareCart.push(product);
        }
        setPageData({
            searchData: pageData.searchData,
            message: "",
            compareCart: compareCart,
        });
    };

    const onSearch = async () => {
        const searchQuery = searchRef.current?.value;
        if (searchQuery == undefined) {
            return;
        }

        const searchData = new SearchData()
        searchData.search(searchQuery)

        if (searchData == undefined) {
            setPageData({
                searchData: undefined,
                message: "there was an issue searching",
                compareCart: pageData.compareCart,
            });
            return;
        }

        setPageData({
            searchData: searchData,
            message: undefined,
            compareCart: pageData.compareCart,
        });
    };

    return (
        <div>
            <NavBar searchRef={searchRef} onSearch={onSearch} />
            <ProductsSection
                className="ml-20 mr-20 flex justify-start"
                pageData={pageData}
                addToCompare={addToCompare}
                isOnCart={isOnCart}
            />
            {/* <div className="flex flex-row justify-around flex-wrap mt-10 items-center">
                {pageData.searchData?.searchData.map((product) => {
                    return <ProductCard product={product} />
                 })}
            </div> */}
        </div>
    );
}

function NavBar({
    className,
    searchRef,
    onSearch,
}: {
    className?: string;
    searchRef?: React.RefObject<HTMLInputElement | null>;
    onSearch?: () => void;
}) {
    return (
        <div className={className}>
            <div className="flex flex-row items-center border-b-1 border-b-gray-300 pb-5 shadow-lg">
                <img
                    className="mt-7 ml-3 mb-3 mr-5 self-center "
                    src="/public/images/can_tire_logo.svg"
                    alt="canadian tire logo"
                    width={100}
                    height={100}
                />
                <input
                    className="w-96 h-10 mt-7 border-1 border-gray-300 p-2 rounded-lg shadow"
                    type="text"
                    placeholder="product #1"
                    ref={searchRef}
                />
                <button
                    className="w-10 h-10 self-end mb-8 ml-5 bg-rose-500 rounded-lg text-white shadow-2xl text-2xl"
                    onClick={() => (onSearch == undefined ? () => { } : onSearch())}
                >
                    ♲
                </button>
            </div>
        </div>
    );
}

function ProductsSection({
    className,
    pageData,
    addToCompare,
    isOnCart,
}: {
    className?: string;
    pageData: PageData;
    addToCompare: (product: Product) => Promise<void>;
    isOnCart: (product: Product) => boolean;
}) {

    return (
        <div className={className}>
            {/* <SearchGrid pageData={pageData} addToCompare={addToCompare} isOnCart={isOnCart}/> */}
            <ProductDetails className="w-full" product={pageData.searchData?.searchData[0]} addToCompare={addToCompare} isOnCart={isOnCart} />
        </div>
    );
}

