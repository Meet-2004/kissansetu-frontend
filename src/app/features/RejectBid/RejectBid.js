"use client";

import { AlertTriangle } from "lucide-react";
import {postApi} from "@/services/apiService";
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Alert/Toast";

export default function RejectBidModal({
  isOpen,
  onClose,
  onConfirm,
  product = "Wheat - Durum",
  amount = "₹25,500",
  rejectModalData
}) {
 
  console.log("this is data",rejectModalData);
  console.log("hello");

   const handleReject = async (orderId, listingId) => {
      console.log(orderId, listingId);
      const rejectApi = await postApi(`orders/${listingId}/reject`);
      if (rejectApi.success) {
        console.log("hello rejected");
        toast.success("Bid rejected successfully");
         confirmPaymentRefreshKey();
        setTimeout(()=>{
            onClose();
        },3000);
       
      }
      else{
        toast.error(rejectApi.message || "Failed to reject the bid. Please try again.");
      }
    };

  return (
    <>
    <Toast times={3000} />
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 animate-scaleIn">
        
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="text-red-500 w-7 h-7" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-2 text-black">
          Reject Accepted Bid?
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 text-center mb-5">
          Are you sure you want to reject this bid for Wheat?
        </p>

        {/* Info Box */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4 text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Product:</span>
            <span className="font-medium text-black">{rejectModalData?.cropName}-{rejectModalData?.variety}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Bid Amount:</span>
            <span className="font-semibold text_lime">
              ₹{rejectModalData?.amount}
            </span>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs rounded-lg p-3 mb-5 flex gap-2">
          <AlertTriangle className="w-4 h-4 mt-[2px]" />
          <p>
            This action cannot be undone. The bid will be permanently removed from your biddings list.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => handleReject(rejectModalData?.orderId, rejectModalData?.listingId)}
            className="w-1/2 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
          >
            Yes, Reject
          </button>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
    </>
  );
}