"use client";

import { useState } from "react";
import { X, Check, Wallet } from "lucide-react";
import "@/app/globals.css"

export default function ConfirmPurchaseModal() {
  const [selected, setSelected] = useState("upi");
  const [agree, setAgree] = useState(true);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      {/* Modal */}
      <div className="w-[700px] bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-lime-50 px-6 py-4 flex justify-between items-center border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Your Purchase
            </h2>
            <p className="text-sm text_lime mt-1">
              Your bid has been accepted by the seller
            </p>
          </div>
          <X className="cursor-pointer text-gray-500" />
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto">

          {/* Order Summary */}
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">
              Order Summary
            </h3>

            <div className="flex justify-between text-sm mb-2">
              <span>Crop</span>
              <span className="font-medium">Wheat - Durum</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Quantity</span>
              <span className="font-medium">100 Quintal</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Price per Quintal</span>
              <span className="font-medium">₹255</span>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">
              Payment Breakdown
            </h3>

            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>₹25,500</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Platform Fee</span>
              <span>₹100</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>GST</span>
              <span>₹92</span>
            </div>

            <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹30,692</span>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Wallet size={18} /> Select Payment Method
            </h3>

            <div className="space-y-3">
              
              {/* UPI */}
              <PaymentOption
                title="UPI Payment"
                desc="Google Pay, PhonePe, Paytm"
                active={selected === "upi"}
                onClick={() => setSelected("upi")}
              />

              {/* Card */}
              <PaymentOption
                title="Credit/Debit Card"
                desc="Visa, Mastercard, RuPay"
                active={selected === "card"}
                onClick={() => setSelected("card")}
              />

              {/* Net Banking */}
              <PaymentOption
                title="Net Banking"
                desc="All major banks"
                active={selected === "net"}
                onClick={() => setSelected("net")}
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mt-1"
            />
            <p className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="text_lime font-medium">
                Terms & Conditions
              </span>{" "}
              and understand that my payment will be held in escrow until I confirm receipt.
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">
              ⚠ Important Notice
            </h4>
            <ul className="text-sm text-yellow-700 list-disc ml-5 space-y-1">
              <li>You must confirm this order within 24 hours.</li>
              <li>After payment, coordinate with seller for delivery.</li>
              <li>Confirm receipt within 48 hours to release payment.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-between items-center bg-white">
          <div>
            <p className="text-xs text-gray-500">Total Amount to Pay</p>
            <p className="text-xl font-bold">₹30,692</p>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-2 rounded-lg border text-gray-600">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-lg back_lime text-white font-medium hover:bg-lime-700">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Payment Option Component */
function PaymentOption({ title, desc, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center px-4 py-3 rounded-xl border cursor-pointer transition ${
        active
          ? "border-lime-500 bg-lime-50"
          : "border-gray-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
            active ? "border-lime-500" : "border-gray-400"
          }`}
        >
          {active && <Check size={14} className="text_lime" />}
        </div>

        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>
    </div>
  );
}