import { ApiResponse, User } from "../type"

export async function logIn(username: string, password: string): Promise<{success: boolean, message: string}> {
    const url = "http://localhost:8080/login"
    const body = {
        username: username,
        password: password
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }) 
        const parsedResponse = await response.json() as ApiResponse<User>
        if (parsedResponse.StatusCode != 200) {
            return {
                success: false,
                message: parsedResponse.Message
            }
        }
        return {success: true, message: "successfully logged in "}
    }catch(e: any) {
        return {success: false, message: "there was an issue logging you in"}
    }
}