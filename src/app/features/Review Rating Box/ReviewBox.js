"use client";

import { useState } from "react";
import Image from "next/image";
import { postApi } from "@/services/apiService";
import { toast } from "react-toastify";
import Toast from "@/Components/Alert/Toast";



export default function RateReviewModal({
  onClose,
  ratingReviewData
}) {
 console.log(ratingReviewData);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");


  // Submit Handler
  const handleSubmitReview = async() => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    const payload = {
      rating,
      review,
   
    };

    console.log("Review Data:", payload);

    // API call here
   
   const postReview= await postApi(`/orderHistory/${ratingReviewData.orderId}/review`, payload);

   if(postReview.success){
    toast.success(postReview.message);
    setTimeout(()=>{
      onClose();
    },2000)
   }
   else{
    toast.error(postReview.message);
   }

 
  };
    const getImageUrls = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;


  return (
    <>
    <Toast times={2000} />
    <div className="flex justify-center items-center inset-0 fixed z-50 bg-black/40">
      <div className="bg-white w-[600px] rounded-2xl shadow-2xl p-7">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="bg-lime-100 p-4 rounded-full text-2xl">
            ⭐
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Rate Your Experience
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Rate {ratingReviewData?.user}:{" "}
          <span className="font-medium text-gray-700">
            {ratingReviewData?.userName}
          </span>
        </p>

        {/* PRODUCT CARD */}
        <div className="bg-gray-50 rounded-xl p-4 flex gap-4 mb-6">
          <Image
            src={getImageUrls(ratingReviewData?.Image)}
            className="w-16 h-16 rounded-lg object-cover"
            height={100}
            width={100}
            unoptimized
          />

          <div>
            <p className="font-semibold text-gray-800">
              {ratingReviewData?.cropName} -{" "}
              {ratingReviewData?.variety}
            </p>
            <p className="text-sm text-gray-500">
              #{ratingReviewData?.orderId} •  {`${ratingReviewData.orderDate[2]}-${ratingReviewData.orderDate[1]}-${ratingReviewData.orderDate[0]}`}
            </p>
          </div>
        </div>

        {/* RATING */}
        <p className="text-sm text-gray-700 font-medium mb-3">
          How would you rate this transaction?
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-3xl cursor-pointer transition ${
                (hover || rating) >= star
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        {/* TEXTAREA */}
        <p className="text-sm text-gray-700 font-medium mb-2">
          Write your review (optional)
        </p>

        <textarea
          placeholder="Share your experience with this transaction..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-200 resize-none mb-6"
          rows={4}
        />

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-3 rounded-xl text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmitReview}
            disabled={rating === 0}
            className={`flex-1 py-3 rounded-xl font-medium ${
              rating === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-lime-500 hover:bg-lime-600 text-white"
            }`}
          >
            Submit Review
          </button>
        </div>

      </div>
    </div>
    </>
  );
}