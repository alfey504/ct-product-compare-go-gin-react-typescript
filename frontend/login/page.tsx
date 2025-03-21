import React, { useRef, useState } from "react"
import { logIn } from "./services"

export default  function Login(){

    const [message, setMessage ] = useState("") 
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)

    const onClickLogIn = async () => {
        let username = usernameRef.current?.value
        let password = passwordRef.current?.value

        if (username == undefined || password == undefined){
            setMessage("please enter a username or password")
            return
         }

         username = username.trim()
         password = password.trim()

         if (username == "" || password == "") {
            setMessage("please enter a username and password")
            return
         }

         const result = await logIn(username, password)
         if (!result.success){
            setMessage(result.message)
            return
         } 

         window.location.replace("/app/product-compare")
    }

    return (
        <div className="h-screen flex items-center justify-center">
           <div className=" flex flex-col w-96 pt-14 pb-24 2justify-center items-center border-2 border-gray-100 rounded-2xl shadow-lg">
                <img className=" w-36 h-36" src="/public/assets/images/can_tire_logo.svg" alt="canadian tire logo" />
                <input className="h-10 w-64 mt-5 rounded-md border-2 border-gray-100 p-2" name="username" ref={usernameRef} placeholder="username" type ="text"/> 
                <input className="h-10 w-64 mt-5 rounded-md border-2 border-gray-100 p-2" name="password" ref={passwordRef} placeholder="password" type="password"/>
                {message == "" &&
                    <span className="text-sm text-gray-400 mt-3 h-5">*{message}</span>
                }{message != "" &&
                    <span className="text-sm text-red-500 mt-3">*{message}</span>
                }   
                <button className="mt-10 bg-red-600 pt-3 pb-3 pl-5 pr-5 rounded-md text-white" onClick={() => onClickLogIn()}>Log In</button>  
            </div> 
        </div>
    )
}

