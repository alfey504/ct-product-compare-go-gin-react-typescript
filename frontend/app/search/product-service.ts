import { ApiResponse } from "../../type"
import { Product } from "../../types/product-type"

export class ProductDetailsManager {
    products = new Map<string, Product>()
    selectedProduct: Product 
    
    getSelectedProduct() : Product {
        return this.selectedProduct
    }

    async getProduct(number: string): Promise<Error | undefined> {
        const productNo = number.replaceAll("-", "").slice(0, -1)
        const product =  this.products.get(productNo)
        if (product != undefined) {
            this.selectedProduct = product
            return undefined
        }  
        
        const productResponse = await getProductDetails(productNo)
        if (productResponse == undefined) {
            return new Error("failed to fetch product -> returned undefined")
        }

        if (productResponse.Data == null) {
            return new Error("failed to fetch product -> " + productResponse.Message)
        }   
        
        this.products.set(productNo, productResponse.Data)
        this.selectedProduct = productResponse.Data
        return undefined
    }
}

export async function getProductDetails(productNo: string) : Promise<ApiResponse<Product> | undefined> {
    const url = "/api/product?prod=" + productNo 
        let prod : ApiResponse<Product> | undefined = undefined
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
            const jsonRes = await res.json() as ApiResponse<Product>
            prod = jsonRes
        }catch(e: any) {
            console.log("api call failed")
            console.log(e.message)
            prod = undefined
        }
        return prod
} 