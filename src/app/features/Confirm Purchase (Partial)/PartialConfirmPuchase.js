"use client";

import { useState,useEffect } from "react";
import { X } from "lucide-react";
import "@/app/globals.css";

export default function ConfirmPurchaseModal({ open, onClose ,setpartialAvailable,selectedListData,onConfirm,setpartialQuantity,partialQuantity}) {
  const pricePerQuintal = 4750;
  const minpartialQuantity = 20;
  const maxpartialQuantity = 200;
  
  const [escrow, setEscrow] = useState(true);

  console.log("this is selected list at partial cinfrim",selectedListData);

useEffect(()=>{
setpartialAvailable(false);
},[])

  if (!open) return null;

  const total = partialQuantity * selectedListData.pricePerKg;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      {/* MODAL */}
      <div className="bg-white w-full max-w-xl max-h-[120vh] rounded-xl shadow-lg p-6 relative ">

        {/* CLOSE */}
        <button
          className="absolute right-5 top-5 text-gray-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* HEADER */}
        <h2 className="text-xl font-semibold text-gray-800">
          Confirm Purchase
        </h2>

        <p className="text-gray-500 text-sm mt-1 mb-3">
          Please review your order details before confirming
        </p>

        {/* ORDER TYPE */}
        <div className="bg-gray-100 rounded-lg p-4 mb-2 ">
          <p className="text-sm text-gray-500">Order Type</p>
          <p className="font-semibold text-black">Partial Order</p>
        </div>

        {/* PRODUCT */}
        <div className="mb-3">
          <p className="text-gray-500 text-sm">Product</p>
          <p className="font-medium text-gray-800">
            {selectedListData.cropName} {selectedListData.variety}
          </p>
        </div>

        {/* QUANTITY */}
        <div className="mb-2">

          <p className="text-gray-500 text-sm mb-2">
            Quantity ({selectedListData.unit})
          </p>

          <input
            type="text"
            value={partialQuantity}
            min={selectedListData.minimumOrderQuantity}
            max={selectedListData.quantity}
            onChange={(e) => setpartialQuantity(Number(e.target.value))}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-lime-500 text-black"
          />

          <p className="text-xs text-gray-500 mt-1">
            Min: {selectedListData.minimumOrderQuantity} {selectedListData.unit}  • Max: {selectedListData.quantity} {selectedListData.unit}
          </p>

        </div>

        {/* PRICE BOX */}
        <div className="bg-lime-50 border border-lime-200 rounded-lg p-4 mb-4">

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Price per Quintal:</span>
            <span className="text-black">₹{selectedListData.pricePerKg}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Quantity:</span>
            <span className="text-black">{partialQuantity} {selectedListData.unit}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-semibold">
            <span className="text-black">Total Amount:</span>
            <span className="text_lime text-lg">
              ₹{total.toLocaleString()}
            </span>
          </div>

        </div>

        {/* ESCROW */}
        <div className="flex items-start gap-2 mb-6">

          <input
            type="checkbox"
            checked={escrow}
            onChange={() => setEscrow(!escrow)}
            className="mt-1 accent-lime-600"
          />

          <div>
            <p className="text-sm font-medium text-black">
              Enable Escrow Protection
            </p>

            <p className="text-xs text-gray-500">
              Funds will be held securely until delivery is confirmed
            </p>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 text-black"
          >
            Cancel
          </button>

          <button className="flex-1 back_lime text-white rounded-lg py-2 font-medium hover:bg-lime-700" onClick={onConfirm}>
            Confirm Purchase
          </button>

        </div>

      </div>
    </div>
  );
}