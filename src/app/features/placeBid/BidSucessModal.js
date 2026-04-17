"use client";
import { Check } from "lucide-react";

export default function BidSuccessModal({ open, onClose,totalPrice,Onclose}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-white   rounded-2xl max-w-100 md:max-w-120  shadow-xl p-8 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <Check size={36} className="text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Bid Placed Successfully
        </h2>

        <p className="text-gray-500 mb-6">
          Your bid has been placed on Organic Cotton
        </p>

        {/* Bid Amount Box */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
          <p className="text-sm text-gray-500 mb-1">
            Your Bid Amount
          </p>
          <p className="text-3xl font-bold text-green-600">
            ₹{totalPrice}
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-gray-50 border rounded-xl p-5 text-left mb-6">
          <p className="text-gray-700 font-medium mb-3">
            What happens next?
          </p>

          <div className="flex items-start gap-2 text-gray-600 mb-2">
            <Check size={18} className="text-green-600 mt-0.5" />
            <p>You'll be notified if you're outbid</p>
          </div>

          <div className="flex items-start gap-2 text-gray-600">
            <Check size={18} className="text-green-600 mt-0.5" />
            <p>If you win, complete escrow payment within 24 hours</p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={()=>{onClose(),Onclose()}}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800"
        >
          Continue Bidding
        </button>
      </div>
    </div>
  );
}