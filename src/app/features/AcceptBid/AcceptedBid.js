"use client";
import { X } from "lucide-react";
import "@/app/globals.css";
import { postApi } from "@/services/apiService";
import Toast from "@/Components/Alert/Toast";
import { ToastContainer, toast } from "react-toastify";

export default function AcceptedBid({
  onClose,
  buyerSelection,
  setrefreshKey,
  
}) {
  console.log("this is buyer selection in their page", buyerSelection);
  const handleAccept = async () => {
    const acceptResult = await postApi(`/orders/accept/${buyerSelection.bidId}`,
      { bidId: buyerSelection.bidId },
    );
    if (acceptResult.success) {
      await setrefreshKey;
      toast.success(acceptResult.message);
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      toast.error(acceptResult.message);
    }
  };
  return (
    <>
         <Toast times={2000} />
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative w-[420px] bg-white rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Confirm Buyer Selection
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={18} className="text-black" />
          </button>
        </div>

        {/* Card */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4 border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-500">Buyer</p>
              <p className="font-semibold text-gray-800">
                {buyerSelection.buyer}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Bid Amount</p>
              <p className="font-semibold text_lime text-lg">
                ₹{buyerSelection.bid_amount}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">Listing</p>
            <p className="text-sm text-gray-700">
              {buyerSelection.cropName} {buyerSelection.variety} •{" "}
              {buyerSelection.quantity} {buyerSelection.unit}
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="flex gap-3 items-start bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
          <div className="text-blue-500 mt-0.5">ⓘ</div>
          <p className="text-sm text-blue-700 leading-relaxed">
            You are about to accept this buyer's bid. The buyer will be notified
            and must confirm the purchase before payment is initiated.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 rounded-lg back_lime text-white font-medium hover:bg-lime-700"
            onClick={handleAccept}
          >
            Accept & Notify Buyer
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
