import React from "react";
import { Product, Specification } from "../../type";

export function ProductDetails({
    product1,
    product2,
    className,
  }: {
    product1: Product;
    product2: Product;
    className?: string;
  }) {
    const classes = className == undefined ? "" : className;
    return (
      <div className={classes}>
        <div className="flex flex-row justify-between">
          <ProductDetailBlock product={product1} />
          <ProductDetailBlock product={product2} />
        </div>
      </div>
    );
  }
  
  function ProductDetailBlock({
    product,
    className,
  }: {
    product: Product;
    className?: string;
  }) {
    const titleClass = "font-bold mt-4";
    const classes = className == undefined ? "" : className;
    return (
      <div className={classes}>
        <div className="border-2 border-gray-100 shadow-lg p-5 rounded-2xl mr-5">
          <h1 className="font-bold text-lg">{product.Name}</h1>
          <h2 className={titleClass}>Short Description</h2>
          <p>{product.ShortDescription}</p>
          <h2 className={titleClass}>Description</h2>
          <p>{product.Description}</p>
          <h2 className={titleClass}>Rating</h2>
          <p>
            {product.Rating} ({product.RatingsCount} reviews)
          </p>
          <h2 className={titleClass}>Specification</h2>
          <ul className=" list-disc ml-3">
            {product.Specifications.map((val: Specification, index: number) => {
              return (
                <li key={index} className="mt-2">
                  {val.Label} - {val.Value}
                </li>
              );
            })}
          </ul>
          <h2 className={titleClass}>Features</h2>
          <ul className="list-disc ml-3">
            {product.Features.map((val: string, index: number) => {
              return (
                <li key={index} className="mt-2">
                  {val}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }