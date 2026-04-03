"use client";
import { useState } from "react";
import OrderSuccessModal from "./Fixedsucessmodel";

export default function ConfirmOrderModal({ open, onClose, onConfirm,cropName,totalPrice,pricePerKg}) {
  if (!open) return null;

  console.log(cropName);
  const [OrderSucessModal, setOrderSucessModal] = useState(false);
  console.log(OrderSucessModal);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl w-[520px] p-8 shadow-xl">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Confirm Your Order
        </h2>

        {/* Crop Info */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">Crop</p>
          <p className="text-green-600 font-medium text-lg">{cropName}</p>
        </div>

        {/* Fixed Amount */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">Your Order Amount</p>
          <p className="text-3xl font-bold text-gray-900">{totalPrice}</p>
        </div>

        {/* Total Payable Box */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-5">
          <p className="text-sm text-gray-600 mb-1">Total Payable Amount</p>
          <p className="text-3xl font-semibold text-gray-900">{totalPrice}</p>
        </div>

        

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-lg py-3 text-gray-700 font-medium hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() =>{ onConfirm();setOrderSucessModal(true)}}
            className="flex-1 bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 cursor-pointer"
          >
            Confirm Order
          </button>
         
        </div>
      </div>
    </div>
  );
}
