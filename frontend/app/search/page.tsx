import React, { useRef, useState } from "react";
import { Pagination, Product, SearchResponse } from "../../types/search-types";
import { SearchData } from "./search-services";
import { ProductDetails } from "./product-details";
import { ProductDetailsManager } from "./product-service";
import { SearchGrid } from "./search-details";

const SEARCH_MODE = "search_mode"
const PRODUCT_MODE = "product_mode"
export type PageData = {
    searchData: SearchData | undefined;
    message: string | undefined;
    compareCart: Product[];
    productDetailsManager : ProductDetailsManager;
    mode: string
};

export type AddToCompareType = (productNo: string) => Promise<void>
export type IsOnCartType = (productNo: string) => boolean

export default function Page() {
    const searchRef = useRef<HTMLInputElement | null>(null);

    const [pageData, setPageData] = useState<PageData>({
        searchData: undefined,
        message: "Please enter a query to search",
        compareCart: [],
        productDetailsManager: new ProductDetailsManager(),
        mode: SEARCH_MODE
    });

    const isOnCart = (productNo: string): boolean => {
        for (let i = 0; i < pageData.compareCart.length; i++) {
            if (pageData.compareCart[i].skuId == productNo) {
                return true;
            }
        }
        return false;
    };

    const addToCompare = async (productNo: string) => {
        let compareCart = pageData.compareCart;
        if (isOnCart(productNo)) {
            compareCart = compareCart.filter((item) => item.skuId !== productNo);
        } else {
            const product = pageData.searchData?.getProduct(productNo)
            if (product == undefined) {
                console.log("failed to add item to card")
                return
            }
            compareCart.push(product);
        }
        setPageData({
            searchData: pageData.searchData,
            message: "",
            compareCart: compareCart,
            productDetailsManager: pageData.productDetailsManager,
            mode: pageData.mode
        });
    };

    const onSearch = async () => {
        const searchQuery = searchRef.current?.value;
        if (searchQuery == undefined) {
            return;
        }

        const searchData = new SearchData()
        const err = await searchData.search(searchQuery)
        if (err != undefined){
            console.error(err)
            setPageData({
                searchData: undefined,
                message: "there was an issue searching",
                compareCart: pageData.compareCart,
                productDetailsManager: pageData.productDetailsManager,
                mode: SEARCH_MODE
            });
            return;
        }

        console.log(searchData.getProducts()[0])
        setPageData({
            searchData: searchData,
            message: undefined,
            compareCart: pageData.compareCart,
            productDetailsManager: new ProductDetailsManager(),
            mode: SEARCH_MODE
        });
    };

    const selectProduct = async (productNo: string) => {
        const err = await pageData.productDetailsManager.getProduct(productNo)
        if (err != undefined) {
            console.error(err)
            return
        }  
        console.log("selectProductRan with no errors")
        setPageData({
            searchData: pageData.searchData,
            message: undefined,
            compareCart: pageData.compareCart,
            productDetailsManager: pageData.productDetailsManager,
            mode: PRODUCT_MODE
        });
    }

    const backFromProductState = () => {
        setPageData({
            searchData: pageData.searchData,
            message: undefined,
            compareCart: pageData.compareCart,
            productDetailsManager: pageData.productDetailsManager,
            mode: SEARCH_MODE
        });
    }

    return (
        <div className=" pb-20">
            <NavBar searchRef={searchRef} onSearch={onSearch} />
            <ProductsSection
                className="ml-20 mr-20 flex justify-start"
                pageData={pageData}
                addToCompare={addToCompare}
                isOnCart={isOnCart}
                selectProduct={selectProduct}
                backFromProductState={backFromProductState}
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
    selectProduct,
    backFromProductState,
}: {
    className?: string;
    pageData: PageData;
    addToCompare: AddToCompareType
    isOnCart: IsOnCartType
    selectProduct: (productNo: string) => void
    backFromProductState: () => void 
}) {


    return (
        <div className={className}>
            {pageData.mode == SEARCH_MODE &&
                <SearchGrid pageData={pageData} addToCompare={addToCompare} isOnCart={isOnCart} selectProduct={selectProduct}/>
            }{pageData.mode == PRODUCT_MODE &&
                <ProductDetails className="w-full" productDetailsManager={pageData.productDetailsManager} addToCompare={addToCompare} isOnCart={isOnCart} backFromProductState={backFromProductState}/>
            }
        </div>
    );
}

