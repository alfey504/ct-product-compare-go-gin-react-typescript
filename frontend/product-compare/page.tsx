import React, { useRef, useState } from "react";
import { ProductCompare } from "../type";
import { getSummary, tempGetSummary } from "./services";
import { Navbar } from "./navbar";

const Menu = class {
  static PRODUCT_SUMMARY = "product_summary"
  static PRODUCT_DETAILS = "product_details"
  static REVIEW_SUMMARY = "review_summary"
}

export default function Application() {
  const [product, setProduct] = useState<ProductCompare | undefined>(undefined);

  const buttonPressHandler = (v: boolean) => {
    console.log("product1: " + product1Ref?.current?.value);
    console.log("product2: " + product2Ref?.current?.value);

    let prod1 = product1Ref?.current?.value;
    let prod2 = product2Ref?.current?.value;

    if (prod1 == undefined || prod2 == undefined) {
      console.log("no value for products");
      return;
    }

    tempGetSummary(prod1, prod2)
      .then((prod) => {
        setProduct(prod);
        console.log("api call success proof : " + prod?.Product1.Name);
      })
      .catch((e: any) => {
        console.log(e.message);
      });
  };

  let product1Ref = useRef<HTMLInputElement | null>(null);
  let product2Ref = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <Navbar
        product1Ref={product1Ref}
        product2Ref={product2Ref}
        buttonPress={buttonPressHandler}
      />
      <Product productCompare={product}/>
    </div>
  );
}

function Product({
  productCompare
}:{
  productCompare: ProductCompare | undefined
}) {

  const [ selectedMenu, setSelectedMenu ] = useState(Menu.PRODUCT_SUMMARY)
  const menuSelectFunction = (menu: string) => setSelectedMenu(menu)

  const getScreen = (selectedMenu: string) => {
    if (selectedMenu == Menu.PRODUCT_SUMMARY) {
      return <ProductSummary product={productCompare}/>
    }
  }
  
  return (
    <div >
      <OptionWheel currentMenu={selectedMenu} menuSetter={menuSelectFunction}/>
      {getScreen(selectedMenu)}
    </div>
  )
}

function  OptionWheel({
  currentMenu,
  menuSetter
}:{
  currentMenu: string,
  menuSetter: (string) => void 
}) {

  // const selectedClasses = "bg-amber-100 border-b-2 border-b-gray-500  p-3 w-xl"
  const selectedClasses = " border-b-2 border-b-green-800  p-3 w-xl" 
  const notSelectedClasses = "p-3 w-xl color-gradient-green-800 transition-colors duration-200 p-4 hover:text-white"
  const getClasses = (menu: string):string => (currentMenu == menu) ?  selectedClasses: notSelectedClasses

  return (
    <div className="flex flex-row items-center justify-center mt-3 ml-64 mr-64 ">
      <button className={getClasses(Menu.PRODUCT_SUMMARY)} onClick={() => menuSetter(Menu.PRODUCT_SUMMARY)}>Summary</button>
      <button className={getClasses(Menu.PRODUCT_DETAILS)} onClick={() => menuSetter(Menu.PRODUCT_DETAILS)}>Product Details</button>
      <button className={getClasses(Menu.REVIEW_SUMMARY)} onClick={() => menuSetter(Menu.REVIEW_SUMMARY)}>Review Summary</button>
    </div>
  )
}


function ProductSummary({
  product
}:{
  product: ProductCompare | undefined
}) {

  if (product == undefined) {
    return <div className="flex flex-grow h-1/2 justify-center items-center">please enter the product numbers</div>
  }

  return (
    <div className="mt-10">
      <h1>Product 1</h1>
      <p>Name: {product?.Product1.Name}</p>
      <p>Summary:</p>
      <ul>
      {product?.Product1.Summary.map((summary: string)=>{
        return <li>{summary}</li>
      })}
      </ul>
    </div>
  )
}