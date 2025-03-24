import React from "react"

export function Navbar({
  product1Ref,
  product2Ref,
  buttonPress,
  message,
}: {
  product1Ref: React.RefObject<HTMLInputElement | null>;
  product2Ref: React.RefObject<HTMLInputElement | null>;
  buttonPress: (boolean) => void;
  message?: string
}) {
  return (
    <div className=" border-b-1 border-b-gray-300 pb-5 shadow-lg">
      <div className="flex flex-row">
      <img className="mt-7 ml-3 mb-3 mr-5 self-center " src="/public/images/can_tire_logo.svg" alt="canadian tire logo" width={100} height={100}/>
      <div className="flex flex-col mt-5">
        <input className="w-96 h-10 mt-3 border-1 border-gray-300 p-2 rounded-lg shadow" type="text" placeholder="product #1" ref={product1Ref} />
        <input className="w-96 h-10 mt-3 border-1 border-gray-300 p-2 rounded-lg shadow " type="text" placeholder="product #2" ref={product2Ref} />
        <div className="mt-3 text-sm text-red-500">*{(message == undefined)? "" : message}</div>
      </div>
      <button className="w-10 h-10 self-end mb-8 ml-5 bg-rose-500 rounded-lg text-white shadow-2xl" onClick={() => buttonPress(true)}>69</button>
      </div>
      
    </div>
  );
}