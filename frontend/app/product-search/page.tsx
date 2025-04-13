import React, { useRef } from "react"

export default function ProductSearch() {
    const searchRef = useRef<HTMLInputElement | null>(null)
    return (
        <div>
            <SearchNavbar searchRef={searchRef}/>
        </div>
    )
}

function SearchNavbar({
    className,
    searchRef
}: {
    className?: string,
    searchRef: React.RefObject<HTMLInputElement | null>,
}) {
    return (
        <div className={className}>
            <div className="flex flex-row border-2 border-gray-300 pt-3 p-3 shadow-lg items-center"> 
                <img height={100} width={100} src="/public/images/can_tire_logo.svg"/>
                <input className=" ml-3 h-10 p-1  border-2 border-gray-400 w-1/3 rounded-md" type="text" placeholder="search.." ref={searchRef}/>
                <button className="ml-4">Search</button>
            </div>
        </div>
    )
}