import { ApiResponse } from "../../type";
import { Product } from "../../types/search-types";
import { Pagination, SearchResponse } from "../../types/search-types";


export class SearchData {
    searchData: Product[]
    pagination: Pagination

    constructor(products: Product[], pagination: Pagination) {
        this.searchData = products
        this.pagination = pagination
    }
}

export async function search(searchQuery: string, page: number = 1) : Promise<SearchData | undefined> {
    const result = await getSearchResults(searchQuery, page)
    if (result == undefined) {
        console.log("returned undefined in internal function")
        return undefined
    }

    if (result.Data == null) {
        console.log(result.Message)
        return undefined
    }

    return new SearchData(result.Data.products, result.Data.pagination)
}



export async function getSearchResults(searchQuery: string, page: number = 1) : Promise<ApiResponse<SearchResponse> | undefined> {
    const url = "/api/search?searchQuery=" + searchQuery + "&page=" + page 
        let prod : ApiResponse<SearchResponse> | undefined = undefined
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'ContentType' : 'application/json',
                    'Accept' : 'application/json',
                }
            })
    
            if (res.status != 200) {
                console.log("failed api request")
                return undefined
            }
            console.log("this executed")
            const jsonRes = await res.json() as ApiResponse<SearchResponse>
            prod = jsonRes
        }catch(e: any) {
            console.log("api call failed")
            console.log(e.message)
            prod = undefined
        }
        return prod
} 