import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { Product, ProductCompare } from "./type";
import { getSummary } from "./services";

export default function Application() {
  const [buttonPress, setButtonPress ] = useState(false)
  const [product, setProduct ]  = useState<ProductCompare | undefined>(undefined)
  const buttonPressHandler = (v: boolean) => {
    setButtonPress(v)
  } 

  if(product != undefined) {
    console.log(product.Product1.Name)
  }

  let product1Ref = useRef<HTMLInputElement | null>(null)
  let product2Ref = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if( buttonPress == true ) {
      console.log("product1: " + product1Ref?.current?.value)
      console.log("product2: " + product2Ref?.current?.value)

      let prod1 = product1Ref?.current?.value
      let prod2 = product2Ref?.current?.value

      if (prod1 == undefined || prod2 == undefined){
        console.log("no value for products")
        return
      }
      
      getSummary(prod1, prod2).then((prod)=> {
        setProduct(prod)
        console.log("api call success proof : " + prod?.Product1.Name)
      }).catch((e: any) => {
        console.log(e.message)
      })
    }
  }, [buttonPress, product])

  return (
    <div>
      <Navbar product1Ref={product1Ref} product2Ref={product2Ref} buttonPress={buttonPressHandler}/>
      <div>{product?.Product1.Name}</div>
    </div>
  );
}

function Navbar({
  product1Ref,
  product2Ref,
  buttonPress,
}:{
  product1Ref: React.RefObject<HTMLInputElement | null>,
  product2Ref: React.RefObject<HTMLInputElement | null>,
  buttonPress: (boolean) => void,
}) {
  
  return (
    <div className="flex flex-row">
      <span>CTCompare</span>
      <div className="flex flex-col">
        <input type="text" placeholder="product #1" ref={product1Ref} />
        <input type="text" placeholder="product #2" ref={product2Ref} />
        <button onClick={() => buttonPress(true)}>Compare</button>
      </div>
    </div>
  );
}

