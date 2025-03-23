import React, { useRef, useState } from "react";
import { Product, ProductCompare, Review, Subject } from "../../type";
import { getSummary, tempGetSummary } from "./services";
import ProductSummary from "./product_summary";
import { Navbar } from "./navbar";
import { ProductDetails } from "./product_details";
import ReviewSummary from "./review_summary";

const Menu = class {
  static PRODUCT_SUMMARY = "product_summary";
  static PRODUCT_DETAILS = "product_details";
  static REVIEW_SUMMARY = "review_summary";
};

export default function Application() {
  const [product, setProduct] = useState<ProductCompare | undefined>(undefined);
  const [message, setMessage] = useState("Enter the product number"); 

  const buttonPressHandler = () => {
    console.log("product1: " + product1Ref?.current?.value);
    console.log("product2: " + product2Ref?.current?.value);

    let prod1 = product1Ref?.current?.value;
    let prod2 = product2Ref?.current?.value;

    if (prod1 == undefined || prod2 == undefined || prod1 == "" || prod2 == "") {
      setMessage("no value for products");
      return;
    }

    getSummary(prod1, prod2)
      .then((prod) => {
        console.log(prod)
        if (prod != undefined){
          if (prod.StatusCode == 200 && prod.Data != null) {
            setProduct(prod.Data)
            return
          }else{
            setMessage(prod.Message)
            return
          }
        }
        setMessage("there was an issue fetching data")
      })
      .catch((e: any) => {
        setMessage(e.message);
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
        message={message}
      />

      <Product message={message} productCompare={product} />
    </div>
  );
}

function OptionWheel({
  currentMenu,
  menuSetter,
}: {
  currentMenu: string;
  menuSetter: (string) => void;
}) {
  const selectedClasses = " border-b-2 border-b-green-800  p-3 w-xl";
  const notSelectedClasses =
    "p-3 w-xl color-gradient-green-800 transition-colors duration-200 p-4 hover:text-white";
  const getClasses = (menu: string): string =>
    currentMenu == menu ? selectedClasses : notSelectedClasses;

  return (
    <div className="flex flex-row items-center justify-center mt-3 ml-64 mr-64 ">
      <button
        className={getClasses(Menu.PRODUCT_SUMMARY)}
        onClick={() => menuSetter(Menu.PRODUCT_SUMMARY)}
      >Summary</button>
      <button
        className={getClasses(Menu.PRODUCT_DETAILS)}
        onClick={() => menuSetter(Menu.PRODUCT_DETAILS)}
      >
        Product Details
      </button>
      <button
        className={getClasses(Menu.REVIEW_SUMMARY)}
        onClick={() => menuSetter(Menu.REVIEW_SUMMARY)}
      >
        Review Summary
      </button>
    </div>
  );
}


function Product({
  productCompare,
  message
}: {
  productCompare: ProductCompare | undefined,
  message: string
}) {
  const [selectedMenu, setSelectedMenu] = useState(Menu.PRODUCT_SUMMARY);
  const menuSelectFunction = (menu: string) => setSelectedMenu(menu);

  const getScreen = (selectedMenu: string) => {
    if (productCompare == undefined) {
      return <div>Please enter a product number</div>;
    }

    if (selectedMenu == Menu.PRODUCT_SUMMARY) {
      return <ProductSummary product={productCompare} />;
    }

    if (selectedMenu == Menu.PRODUCT_DETAILS) {
      return (
        <ProductDetails
          product1={productCompare.Product1}
          product2={productCompare.Product2}
        />
      );
    }

    if (selectedMenu == Menu.REVIEW_SUMMARY) {
      return(
        <ReviewSummary product1={productCompare.Product1} product2={productCompare.Product2} />
      )
    }
  };

  return (
    <div>
      <OptionWheel currentMenu={selectedMenu} menuSetter={menuSelectFunction} />
      <div className="mt-10 ml-10 mr-10 mb-10">{getScreen(selectedMenu)}</div>
    </div>
  );
}

