"use client";

import { useState, useEffect } from "react";
import { postApi } from "@/services/apiService";
import { toast } from "react-toastify";
import Toast from "@/Components/Alert/Toast";

export default function RaiseBidModal({
  onClose,
   raiseBidModalData
}) {
  const [newBid, setNewBid] = useState(0);

  //  Calculate new bid automatically
//   useEffect(() => {
//     const calculatedBid = currentHighestBid + increment;
//     setNewBid(calculatedBid);
//   }, [raiseBidModalData.currentHighestBid, increment]);

  //  Confirm logic
  const handleConfirmBid = async () => {
    if (((raiseBidModalData.bidIncrement + raiseBidModalData.yourBid).toLocaleString()) <= raiseBidModalData.currentHighestBid) {
      alert("Bid must be higher than current highest bid");
      return;
    }
    
    const payload = {
      buyerAmount:raiseBidModalData.bidIncrement + raiseBidModalData.currentHighestBid ,
    };

    console.log("Bid Submitted:", payload);
    //  API call here
  const raiseYourBid = await postApi(`/buyers/${raiseBidModalData.listingId}/auctions`,payload);

  if(raiseYourBid.success){
   toast.success(raiseYourBid.message);
    setTimeout(()=>{
        onClose();
    },2000)
  }
  else{
     toast.error(raiseYourBid.message);
  }



  };

  return (
    <>
    <Toast times={2000}/>
    <div className="flex justify-center items-center inset-0 fixed z-50 bg-black/50">
      <div className="bg-white w-[400px] rounded-2xl  p-6">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 p-4 rounded-full text-orange-500 text-xl">
            📈
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Raise Your Bid
        </h2>
        <p className="text-center text-gray-500 text-sm mb-5">
          {raiseBidModalData.cropName} - {raiseBidModalData.variety}
        </p>

        {/* BID BOX */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Current Highest Bid:</span>
            <span className="font-semibold text-gray-800">
              ₹{raiseBidModalData.currentHighestBid.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Your Current Bid:</span>
            <span className="font-semibold text-red-500">
              ₹{raiseBidModalData.yourBid.toLocaleString()}
            </span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between items-center">
            <span className="text-black font-medium">
              New Bid Amount:
            </span>
            <span className="text_lime text-lg font-bold">
              ₹{(raiseBidModalData.bidIncrement + raiseBidModalData.currentHighestBid).toLocaleString()}
            </span>
          </div>
        </div>

        {/* INFO BOX */}
        <div className="bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded-xl p-3 mb-5">
          Your bid will be increased by ₹{raiseBidModalData.bidIncrement} to match the minimum bid increment.
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmBid}
            className="flex-1 back_lime hover:bg-lime-600 text-white py-2.5 rounded-xl font-medium"
          >
            Confirm Bid
          </button>
        </div>

      </div>
    </div>
    </>
  );
}