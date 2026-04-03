"use client";
import {useState} from "react";
import { ShoppingCart, Package, X } from "lucide-react";

export default function OrderTypeModal({onClose,setselectedPurchaseType,setEscrowModal,onEscrowOpen,setisPartial,selectedListData}) {

  if (!open) return null;

  
console.log(selectedListData);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      {/* Modal */}
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Select Order Type
            </h2>
            <p className="text-sm text-gray-500 mt-3">
              This seller accepts both whole lot and partial orders. Choose your preference:
            </p>
          </div>

          <button>
            <X className="text-gray-500 hover:text-black" onClick={onClose} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid md:grid-cols-2 gap-6">

          {/* Whole Lot */}
          <div className="border-2 border-gray-300 rounded-xl p-6 hover:shadow-md transition cursor-pointer hover:border-2 hover:border-lime-600" onClick={onEscrowOpen}>

            <div className="flex justify-center mb-4">
              <div className="bg-lime-100 p-4 rounded-full">
                <ShoppingCart className="text_lime" size={24} />
              </div>
            </div>

            <h3 className="text-center font-semibold text-lg text-black">
              Whole Lot
            </h3>

            <p className="text-center text-gray-500 text-sm mb-6">
              Purchase the entire quantity
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium text-black">{selectedListData.quantity} {selectedListData.unit}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Price per Quintal:</span>
                <span className="text_lime font-semibold">
                  ₹{selectedListData.pricePerKg}
                </span>
              </div>

              <div className="flex justify-between pt-3 border-t">
                <span className="font-semibold text-black">Total Price:</span>
                <span className="font-bold text-lg text-black">
                  ₹{selectedListData.basePrice}
                </span>
              </div>
            </div>

          </div>

          {/* Partial Order */}
          <div className="border-2 border-gray-300 rounded-xl p-6 hover:shadow-md transition cursor-pointer hover:border-2 hover:border-lime-600" onClick={()=>{setselectedPurchaseType("Partial Order");setisPartial(true)}} >

            <div className="flex justify-center mb-4">
              <div className="bg-lime-100 p-4 rounded-full">
                <Package className="text_lime" size={24} />
              </div>
            </div>

            <h3 className="text-center font-semibold text-lg text-black">
              Partial Order
            </h3>

            <p className="text-center text-gray-500 text-sm mb-6">
              Order a smaller quantity
            </p>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-600 ">Min. Order (MOQ):</span>
                <span className="font-medium text-black">{selectedListData.minimumOrderQuantity} {selectedListData.unit}  </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Price per {selectedListData.unit}:</span>
                <span className="text_lime font-semibold">
                  ₹{selectedListData.pricePerKg}
                </span>
              </div>

              <div className="flex justify-between pt-3 border-t">
                <span className="font-semibold text-black">Min. Total:</span>
                <span className="font-bold text-lg text-black">
                  {/* ₹{} */}
                </span>
              </div>

            </div>

            {/* Note */}
            <div className="mt-5 bg-blue-50 text-blue-700 text-sm p-3 rounded-md border">
              <strong>Note:</strong> Partial orders are always Fixed Price
            </div>

          </div>
        </div>

        {/* Footer Tip */}
        <div className="border border-gray-500 w-[96%] mx-auto mb-5  px-6 py-4 text-center text-sm text-gray-600 rounded-lg bg-gray-50">
            <div className="">💡 <span className="font-medium">Tip:</span> Choose based on your requirement and budget.</div>
          
        </div>

      </div>
    </div>
  );
}