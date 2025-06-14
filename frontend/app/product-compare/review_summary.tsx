import React from "react";
import { Product, Review, Subject } from "../../types/product-type";

export default function ReviewSummary({
  product1,
  product2,
  className,
}: {
  product1: Product;
  product2: Product;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-row justify-between">
        <ReviewSummaryBlock className="ml-3 mr-3 flex-1/2" product={product1} />
        <ReviewSummaryBlock className="flex-1/2" product={product2} />
      </div>
    </div>
  );
}

function ReviewSummaryBlock({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className=" border-2 border-gray-100 shadow-lg rounded-2xl p-5">
        <h1 className="text-xl font-bold">{product.Name}</h1>
        <h2 className="text-xl font-bold mt-3">Positive</h2>
        <SentimentSection
          className="mt-4"
          sentimentReviews={product.ReviewSummary.Positive}
        />
        <h2 className="text-lg font-bold mt-10">Negative</h2>
        <SentimentSection
          className="mt-4"
          sentimentReviews={product.ReviewSummary.Negative}
        />
      </div>
    </div>
  );
}

function SentimentSection({
  sentimentReviews,
  className,
}: {
  sentimentReviews: Subject[];
  className?: string;
}) {
  if (sentimentReviews.length <= 0) {
    return (
      <div className="mt-10 text-gray-400 italic">there are no reviews</div>
    );
  } else {
    return (
      <div className={className}>
        {sentimentReviews.map((value: Subject, index: number) => {
          return (
            <div className="mt-10" key={index}>
              <h2 className="font-bold text-lg" key={index}>
                {" "}
                - {value.Subject}{" "}
                <span className="text-gray-600 font-light text-sm">
                  ({value.MentionsCount} Mentions)
                </span>
              </h2>
              <Reviews key={index} className="mt-5" reviews={value.Examples} />
            </div>
          );
        })}
      </div>
    );
  }
}

function Reviews({
  reviews,
  className,
}: {
  reviews: Review[];
  className?: string;
}) {
  return (
    <div className={className}>
      {reviews.map((value: Review, index: number) => {
        return (
          <div className="mt-4" key={index}>
            <p key={index} className=" font-semibold">
              {value.Title} ({value.Rating} / 5)
            </p>
            <p key={index} className="mt-2">
              {value.Text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
