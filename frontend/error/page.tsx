import React from "react"
import { ErrorProp } from "../../type"

export default function ErrorPage({ errorProps }: {errorProps: ErrorProp}) {
    console.log(errorProps.Message)
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="w-1/2 flex flex-col">
                <div className=" text-8xl text-bold w-full">Oops!! <span className="text-3xl"> (error  {errorProps.ErrorCode}) </span></div>
                <div className="mt-10 text-xl text-gray-400">{errorProps.Message}.
                {errorProps.Redirect.DoesRedirect &&
                    <a href={errorProps.Redirect.HyperLink} className=" ml-3 text-xl text-red-400 underline">{errorProps.Redirect.Title}</a>
                }
                </div>
            </div>
        </div>
    )
}