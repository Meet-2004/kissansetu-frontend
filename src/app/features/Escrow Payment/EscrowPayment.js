"use client";
import { useState,useEffect } from "react";
import {
  X,
  Shield,
  CheckCircle,
  Smartphone,
  CreditCard,
  Landmark,
  ChevronRight
} from "lucide-react";
import "@/app/globals.css";
import ConfirmPayment from "../Confirm Payment/ConfirmPayment";
import Image from "next/image";

export default function EscrowPayment({ onClose,setEscrowModal,onEscrowClosed,escrowModal,selectedListData, isPartial,partialQuantity,setisPartial,setnotificationRefreshKey}) {
  const [payment, setPayment] = useState("upi");
  const [confirmPayment,setconfirmPayment]=useState(false);
  // const [totalOrderPrice,settotalOrderPrice]=useState(5);
  const [partialTotalPrice,setpartialTotalPrice]=useState(0);

  console.log("is partial",isPartial);
  console.log("partial quantity",selectedListData);

  const getImageUrls=(path)=>`${process.env.NEXT_PUBLIC_API_URL}/${path}`;

  const totalOrderPrice=!isPartial ? (((selectedListData.basePrice ? selectedListData.basePrice : selectedListData.bidAmount)*2)/100)+ (selectedListData.basePrice ? selectedListData.basePrice : selectedListData.bidAmount) : ((partialTotalPrice*2)/100)+partialTotalPrice;
  useEffect(()=>{
    console.log("helloss");

   },[])

   useEffect(()=>{
    
setpartialTotalPrice(partialQuantity*selectedListData.pricePerKg);
   },[])

  const methods = [
    {
      id: "upi",
      title: "UPI",
      desc: "Google Pay, PhonePe, Paytm",
      icon: Smartphone,
    },
    {
      id: "card",
      title: "Credit or Debit Card",
      desc: "Visa, Mastercard, RuPay",
      icon: CreditCard,
    },
    {
      id: "netbanking",
      title: "Net Banking",
      desc: "All major banks supported",
      icon: Landmark,
    },
  ];

  console.log("this is confimpayment page",confirmPayment);

 
  return (
    <div className="  flex justify-center items-center  inset-0  fixed z-50 bg-black/40">
    <div className="bg-white  max-w-[25cm] min-w-[35cm] rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh] ">

      {/* CLOSE BUTTON */}
      <div className="absolute right-32 top-13 bg-black text-white rounded-full p-2 shadow cursor-pointer" onClick={onClose}>
        <X />
      </div>

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">
          Secure Escrow Payment
        </h1>
        <p className="text-gray-600 mt-2">
          Your payment will be securely held in escrow until the goods are delivered and confirmed.
        </p>
      </div>
{  selectedListData && selectedListData.listingId >=0 &&
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* ORDER DETAILS */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5 text-black">Order Details</h2>

            <div className="flex justify-between">

              <div className="flex gap-4">
                <Image
                  src={getImageUrls(selectedListData?.images[0]?.filePath)}
                  className="w-20 h-20 rounded-lg object-cover"
                  height={100}
                  width={200}
                  unoptimized
                />

                <div>
                  <h3 className="font-semibold text-lg text-black">
                    {selectedListData.cropName} - {selectedListData.variety}
                  </h3>

                  <p className="text-gray-500">
                  {isPartial ? partialQuantity : selectedListData.quantity} × ₹{selectedListData.pricePerKg}/{selectedListData.unit}
                  </p>
                </div>
              </div>

              <div className="text-xl font-semibold text-black">
                ₹{isPartial ? partialTotalPrice : (selectedListData.basePrice ? selectedListData.basePrice :selectedListData.bidAmount )}
              </div>

            </div>

            <hr className="my-5" />

            <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">

              <div>Seller:</div>
              <div className="text-right font-medium text-black">Demo Seller</div>

              <div>Location:</div>
              <div className="text-right font-medium text-black">
                {selectedListData.district}, {selectedListData.state}
              </div>

              <div>Expected Delivery:</div>
              <div className="text-right font-medium text-black">
                5-7 Business Days
              </div>

            </div>
          </div>

          {/* ESCROW INFO */}
          <div className="bg-lime-50 border border-green-200 rounded-xl p-6">

            <div className="flex items-center gap-3 mb-4">
              <div className="back_lime p-2 rounded-full text-white">
                <Shield size={18} />
              </div>

              <h3 className="font-semibold text-lg text-black">
                How Escrow Protects You
              </h3>
            </div>

            <ul className="space-y-3 text-gray-700">

              <li className="flex items-center gap-2">
                <CheckCircle className="text_lime" size={18} />
                Payment is held securely by the platform
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle className="text_lime" size={18} />
                Seller is notified once escrow payment is confirmed
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle className="text_lime" size={18} />
                Funds are released only after buyer confirms delivery
              </li>

            </ul>
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5 text-black">
              Select Payment Method
            </h2>

            <div className="space-y-4">

              {methods.map((m) => {
                const Icon = m.icon;

                return (
                  <div
                    key={m.id}
                    onClick={() => setPayment(m.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition
                    ${
                      payment === m.id
                        ? "border-lime-600 border-2 bg-lime-50"
                        : "border-gray-200"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`p-3 rounded-full
                        ${
                          payment === m.id
                            ? "back_lime text-white"
                            : "bg-gray-400"
                        }`}
                      >
                        <Icon size={20} />
                      </div>

                      <div>
                        <p className="font-medium text-black">{m.title}</p>
                        <p className="text-sm text-gray-500">{m.desc}</p>
                      </div>
                    </div>

                    {payment === m.id && (
                      <CheckCircle className="text_lime" />
                    )}

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE PAYMENT SUMMARY */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">

          <h2 className="text-xl font-semibold mb-5 text-black">
            Payment Summary
          </h2>

          <div className="space-y-3 text-gray-600">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{isPartial ? partialTotalPrice : (selectedListData.basePrice ? selectedListData.basePrice : selectedListData.bidAmount)}</span>
            </div>

            <div className="flex justify-between">
              <span>Platform Fee (2%)</span>
              <span>₹{!isPartial ? (((selectedListData.basePrice ? selectedListData.basePrice : selectedListData.bidAmount)*2)/100) : ((partialTotalPrice*2)/100) }</span>
            </div>

          </div>

          <hr className="my-4" />

          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-black">
              Total Amount Payable
            </span>

            <span className="text-2xl font-bold text_lime">
              {/* ₹{!isPartial ? ((selectedListData.basePrice*2)/100)+ selectedListData.basePrice : ((partialTotalPrice*2)/100)+partialTotalPrice} */}
              ₹{totalOrderPrice}
            </span>
          </div>

          <button className="w-full back_lime hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer" onClick={()=>{setconfirmPayment(true)}}>
            <Shield size={18} />
            Pay Securely into Escrow
            <ChevronRight size={18} />
          </button>

          <p className="text-xs text-center text-gray-500 mt-3">
            Your funds will be held securely until delivery confirmation
          </p>

          <button className="w-full mt-4 border rounded-lg py-3 text-gray-700 hover:bg-gray-100 cursor-pointer">
            Cancel Order
          </button>

        </div>

      </div>
      }
    </div>
    {
        confirmPayment && <ConfirmPayment setnotificationRefreshKey={setnotificationRefreshKey} onClose={()=>{setEscrowModal(false);setisPartial(false);setconfirmPayment(false);}} onCloseConfirmPayment={()=>setconfirmPayment(false)} selectedListData={selectedListData} totalOrderPrice={totalOrderPrice}  isPartial={isPartial} partialQuantity={partialQuantity}/>

    }
    </div>
  );
}