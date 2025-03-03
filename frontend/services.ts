import { Product, ProductCompare } from "./type.ts"

export async function getSummary(prod1: string, prod2: string): Promise<ProductCompare | undefined> {
    const url = "/api/product?prod1=" + prod1 + "&prod2=" + prod2 
    const body = {
        product1 : prod1,
        product2 : prod2,
    }

    let prod : ProductCompare | undefined
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'ContentType' : 'application/json',
                'Accept' : 'application/json',
            }
        })
        const jsonRes = await res.json() as ProductCompare
        prod = jsonRes
    }catch(e: any) {
        console.log("api call failed")
        console.log(e.message)
        prod = undefined
    }
    return prod
}