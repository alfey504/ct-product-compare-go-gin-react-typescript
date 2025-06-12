import { ApiResponse } from "../../type";
import { Product } from "../../types/search-types";
import { Pagination, SearchResponse } from "../../types/search-types";


export class SearchData {  

    searchQuery : string = ""
    products : Product[] = []
    searchData: Map<number, Product[]> = new Map<number, Product[]>()
    pagination: Pagination

    public getProducts(): Product[] {
        return this.products
    }

    public async search(searchQuery: string) : Promise<Error | undefined> {
        const result = await getSearchResults(searchQuery) 
        if (result == undefined) {
            return new Error("issue getting search data")
        }

        if (result.Data == null) {
            console.log(result.Message)
            return 
        }

        this.searchQuery = searchQuery
        this.searchData.set(1, result.Data.products)
        this.products = result.Data.products
        this.pagination = result.Data.pagination
        return undefined
    }

    public async getPage(pageNo: number) : Promise<Error | undefined> {
        if (pageNo > this.pagination.total) {
            return new Error("page number greater than max page")
        }

        const products = this.searchData.get(pageNo)
        if (products != undefined) {
            this.products = products 
            return undefined
        }

        const result = await getSearchResults(this.searchQuery, pageNo) 
        if (result == undefined) {
            return new Error("issue getting search data")
        }

        if (result.Data == null) {
            console.log(result.Message)
            return new Error(result.Message)
        }

        this.searchData.set(pageNo, result.Data.products)
        this.products = result.Data.products
        return undefined
    }
}

// export async function search(searchQuery: string, page: number = 1) : Promise<SearchData | undefined> {
//     const result = await getSearchResults(searchQuery, page)
//     if (result == undefined) {
//         console.log("returned undefined in internal function")
//         return undefined
//     }

//     if (result.Data == null) {
//         console.log(result.Message)
//         return undefined
//     }

//     return new SearchData(result.Data.products, result.Data.pagination)
// }



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