import { Product, Review, Subject } from "../../types/product-type";
import React, { useState } from "react"
import { ProductDetailsManager } from "./product-service";
import { AddToCompareType, IsOnCartType } from "./page";

export function ProductDetails({
    className,
    productDetailsManager,
    addToCompare,
    isOnCart,
    backFromProductState
}: {
    className?: string,
    productDetailsManager: ProductDetailsManager,
    addToCompare: AddToCompareType
    isOnCart: IsOnCartType
    backFromProductState: () => void
}) {

    const product = productDetailsManager.getSelectedProduct()

    return (
        <div className={className}>
            <PreviewSection product={product} addToCompare={addToCompare} isOnCart={isOnCart} backFromProductState={backFromProductState} />
            <ProductDetailsSection className="mt-10" product={product}/>
        </div>
    )
}


function PreviewSection({
    className,
    product,
    addToCompare,
    isOnCart,
    backFromProductState
}: {
    className?: string,
    product: Product,
    addToCompare:AddToCompareType
    isOnCart: IsOnCartType
    backFromProductState: () => void
}) {

    const floatRating = Number(product.Rating)
    const rating = floatRating.toFixed(1)
    const buttonState = isOnCart(product.Sku) ? "Remove" : "Add"
    const quantity = product.Fulfillment.Quantity

    const stars = (function (): string {
        const star = "★";
        const emptyStar = "☆";
        const flooredRating = Math.floor(floatRating);
        return star.repeat(flooredRating) + emptyStar.repeat(5 - flooredRating);
    })();
    
    return (
        <div className={className}>
            <div className="flex flex-col w-full mt-20">
                <div className="flex flex-row justify-between ">
                    <div className="flex flex-col">
                        <span className=" text-2xl font-semibold w-11/12">{product.Name}</span>
                        <span className=" text-lg text-gray-500"> <span className="text-amber-400">{stars}</span> {rating} ({product.RatingsCount}) | #{product.Sku}</span>
                        <img src={product.Images[0].URL} alt={product.Images[0].AltText} className="w-11/12 " />
                    </div>
                    <div className="flex flex-col w-full mt-20">
                        <div className="flex flex-row justify-start ml-10">
                            <span className=" text-2xl">${product.CurrentPrice.Value}</span>
                        </div>
                        <div className="flex flex-row w-full justify-start mt-5">
                            <button className=" bg-green-600 text-white w-32 pt-2 pb-2 pl-3 pr-3 rounded-lg ml-10 ">{buttonState}</button>
                            <button className="bg-red-500 text-white w-32 pt-2 pb-2 pl-3 pr-3 rounded-lg ml-10">Website</button>
                            <button className="bg-black text-white w-32 pt-2 pb-2 pl-3 pr-3 rounded-lg ml-10" onClick={() => backFromProductState()}>Back</button>
                        </div>
                        <div className="flex flex-col ml-10 mt-5">
                            <span className="text-lg font-semibold">Description</span>
                            <p>Westinghouse FX Series LED 1080p Full HD Smart Roku TV, 40-in</p>
                        </div>
                        {quantity > 0 ?
                            <span className="text-lg ml-10 mt-5"><span className="text-xl text-green-500 font-bold">•</span> {quantity + " in stock "}</span>
                            :
                            <span className="text-lg ml-10 mt-5"><span className="text-xl text-red-600">ⓧ</span> Out of Stock</span>
                        }                        
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProductDetailsSection({
    className,
    product
}: {
    className?: string
    product: Product  
}) {

    const description = "The Westinghouse LED HD Smart Roku TV offers full high-definition resolution for crisp, vivid images. With smart capabilities, seamless streaming and device integration, audio quality, and immersive visuals, this TV is the perfect addition for entertainment in your home."
    return (
        <div className={className}>
            <div className="flex flex-col">
                <span className="text-xl font-semibold pb-5">Description</span> 
                <hr className="border-t border-gray-300"/>
                <p className="mt-3 space-y-2">{description}</p>
                <FeaturesAndSpecification className="mt-10" product={product}/>
                <ReviewSummary className="mt-10" product={product}/>
            </div>
        </div>
    )
}


function FeaturesAndSpecification({
    className,
    product,
}: {
    className?: string, 
    product: Product
}) {   

    const FEATURE_LABEL = "features"
    const SPECIFICATION_LABEL = "specifications"

    const [selected , setSelected ] = useState<string>(FEATURE_LABEL)

    const features = product.Features

    const specifications = product.Specifications
    const Features = () => {
        return (
            <ul className="mt-3 ml-3 list-disc space-y-2">  
                {features.map((feature) => {
                    return <li>{feature}</li>
                })}
            </ul>
        )
    }

    const Specifications = () => {
        return (
            <ul className="mt-3 ml-3 list-disc space-y-2">  
                {specifications.map((specification) => {
                    return <li>{specification.Label} - {specification.Value}</li>
                })}
            </ul>
        )
    }
    return (
        <div className={className}>
                {selected == FEATURE_LABEL &&
                    <div className="flex flex-row">
                         <span className="text-xl pb-5 border-b-2 font-bold" onClick={() => setSelected(FEATURE_LABEL)}> Features </span>
                         <span className="text-xl pb-5 ml-5" onClick={() => setSelected(SPECIFICATION_LABEL)}> Specification </span>
                     </div>
                }{selected == SPECIFICATION_LABEL && 
                    <div className="flex flex-row">
                        <span className="text-xl pb-5" onClick={() => setSelected(FEATURE_LABEL)}> Features </span>
                        <span className="text-xl pb-5 border-b-2 font-bold ml-5" onClick={() => setSelected(SPECIFICATION_LABEL)}> Specification </span>
                    </div>
                }              
            <hr className="border-t border-gray-300"/>
            <ul className="mt-3 ml-3 list-disc space-y-2">
                {selected == FEATURE_LABEL &&
                     <Features />
                }{selected == SPECIFICATION_LABEL &&
                    <Specifications />
                }              
            </ul>
        </div>
    )
}


function ReviewSummary({
    className,
    product,
}: {
    className?: string,
    product: Product 
}){

    const ReviewSummary = product.ReviewSummary

    return (
        <div className={className}>
            <div className="flex flex-col">
            <span className="text-xl font-bold pb-5">Review Summary</span>
            <hr className="border-t border-gray-300"/>
            <div className="flex flex-col">
                <span className="text-lg mt-5 font-bold underline">Positive</span>
                {ReviewSummary.Positive.length <= 0 ?
                    <span className="text-gray-300 italic font-light">There are no reviews</span>
                    :
                     <SentimentSubjects subjects={ReviewSummary.Positive}/>
                }
                <span className="text-lg font-bold underline mt-10">Negatives</span>
                {ReviewSummary.Negative.length <= 0 ?
                    <span className="text-gray-300 italic font-light">There are no reviews</span>
                    :
                    <SentimentSubjects subjects={ReviewSummary.Negative}/>
                 }
            </div>
            </div>
        </div>
    )
}

function SentimentSubjects({
    className,
    subjects
}:{
    className?: string,
    subjects:  Subject[]
}){
    return (
        <div className={className}>
            <div className="flex flex-col">
                {subjects.map((subject) => {
                    return <Subject className="mt-10" subject={subject}/>
                })}
            </div>
        </div>
    )
}

function Subject({
    subject,
    className,

}:{
    className?: string
    subject: Subject
}) {

    return (
        <div className={className}>
            <div className="flex flex-col">   
                <span className="text-lg font-semibold">Subject - {subject.Subject} ({subject.PresenceCount})</span>
                <div className="">
                    {subject.Examples.map((review) => {
                        return(
                            <Review className="mt-3" review={review} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function Review({
    className,
    review
}: {
    className?: string,
    review: Review
}) {

    const stars = (function (): string {
        const star = "★";
        const emptyStar = "☆";
        const rating = Math.floor(review.Rating);
        return star.repeat(rating) + emptyStar.repeat(5 - rating);
    })();
    const rating = review.Rating.toFixed(1);

    return (
        <div className={className}>
             <div className="flex flex-col">
                <span className="text-md font-semibold">{review.Title} - <span className="text-amber-400">{stars}</span>{rating}</span>
                <span className="mt-2 space-y-2">{review.Text}</span>
            </div>
        </div>
    )
}