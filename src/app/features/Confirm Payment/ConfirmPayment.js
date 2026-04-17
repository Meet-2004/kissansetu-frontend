"use client";

import { Shield, X } from "lucide-react";
import { useState } from "react";
import PaymentSuccess from "../Payment successfull/PaymentSuccess";
import Image from "next/image";
import { postApi } from "@/services/apiService";
import Toast from "@/Components/Alert/Toast";
import { ToastContainer, toast } from "react-toastify";

export default function ConfirmPayment({
  onClose,
  onCloseConfirmPayment,
  selectedListData,
  totalOrderPrice,
  isPartial,
  partialQuantity,
  confirmPaymentRefreshKey,
 
}) {
  console.log("This is selected list :", selectedListData);

  console.log("hello i am payment sucess modal");
  const [paymentSucess, setpaymentSucess] = useState(false);
  const [otp, setOtp] = useState(null);
  const getImageUrls = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;

  const handlConfirm = async () => {
    const listingId = selectedListData.listingId;
    const quantity = isPartial
      ? { quantity: partialQuantity }
      : { quantity: selectedListData.quantity };

    if (
      selectedListData?.purchaseType &&
      selectedListData.purchaseType === "PARTIAL_ORDER_ALLOWS"
    ) {
      const postPartialApi = await postApi(
        `orders/buy-partial/${listingId}`,
        quantity,
      );
      console.log(postPartialApi);
      if (postPartialApi.success) {
        console.log(
          "this is response of confirm purchase payment",
          postPartialApi,
        );
        await setOtp(postPartialApi?.data?.otp);
        setpaymentSucess(true);
        console.log("this is otp at confirm side", otp);
      } else {
        toast.error(postPartialApi.message);
      }
    } else if (
      selectedListData?.purchaseType &&
      selectedListData.purchaseType === "WHOLE_LOT_ONLY"
    ) {
      const postApis = await postApi(`orders/buy-whole/${listingId}`);
      if (postApis.success) {
        await setOtp(postApis?.data?.otp);
        setpaymentSucess(true);
      } else {
        toast.error(postApis.message);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } else {
      const orderId = selectedListData?.orderId;
      const auctionpostApis = await postApi(`orders/${orderId}/confirm`);
      console.log("This is auctionapis",auctionpostApis);
      if (auctionpostApis.success) {
         await setOtp(auctionpostApis?.data?.otp);
         confirmPaymentRefreshKey();
         setpaymentSucess(true);
        // confirmPaymentRefreshKey();
      } else {
        toast.error(auctionpostApis.message);
      }
    }
  };

  return (
    <>
      <Toast times={4000} />

      <div className="flex justify-center items-center inset-0 fixed z-50 bg-black/40 ">
        <div className="bg-white max-w-[25cm] min-w-[35cm] max-h-[95vh]  rounded-2xl shadow-2xl p-6 relative">
          {/* CLOSE BUTTON */}
          <div
            className="absolute right-5 top-5 text-gray-500 cursor-pointer"
            onClick={onClose}
          >
            <X />
          </div>

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-lime-500 p-2 rounded-lg text-white">
              <Shield size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Confirm Payment
              </h1>
              <p className="text-gray-500 text-sm">
                Securely complete your transaction
              </p>
            </div>
          </div>

          {/* ESCROW INFO */}
          <div className="bg-blue-50 flex gap-3 bg-linear-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-5 mb-6">
            <Shield className="text-blue-600 mt-1" size={18} />
            <div>
              <p className="font-medium text-lg text-blue-900 mb-1">
                Secure Escrow Protection Active
              </p>
              <p className="text-sm text-blue-800">
                Your payment will be held securely in escrow until you confirm
                receipt of goods. The seller will be notified once payment is
                received.
              </p>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-2 gap-6">
            {/* ORDER SUMMARY */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-black">
                Order Summary
              </h2>

              <div className="flex gap-4">
                <Image
                  src={getImageUrls(selectedListData?.images[0]?.filePath)}
                  className="w-16 h-16 rounded-lg object-cover"
                  height={100}
                  width={100}
                  unoptimized
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {selectedListData.cropName} - {selectedListData.variety}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {isPartial ? partialQuantity : selectedListData.quantity}{" "}
                    {selectedListData.unit}
                  </p>
                </div>
              </div>

              <hr className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Seller</span>
                  <span className="font-medium text-gray-800">
                    Rajesh Kumar
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-medium text-gray-800">
                    {selectedListData.district}, {selectedListData.state}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Expected Delivery</span>
                  <span className="font-medium text-gray-800">
                    March 25, 2026
                  </span>
                </div>
              </div>
            </div>

            {/* PAYMENT DETAILS */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-black">
                Payment Details
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Order Amount</span>
                  <span className="text-black">₹{totalOrderPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-700">Platform Fee (2%)</span>
                  <span className="text-black">
                    ₹{Math.round(totalOrderPrice * 0.02)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-700">GST (18%)</span>
                  <span className="text-black">
                    ₹{Math.round(totalOrderPrice * 0.18)}
                  </span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-700">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-lime-600">
                  ₹{totalOrderPrice}
                </span>
              </div>

              {/* PAYMENT METHOD */}
              <div className="border border-lime-200 bg-lime-50 rounded-lg p-3 text-sm">
                <p className="text-gray-600">Payment Method</p>
                <p className="font-medium text-gray-800">UPI PAYMENT</p>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button
              className="flex-1 border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={onCloseConfirmPayment}
            >
              Back
            </button>

            <button
              className="flex-1 bg-lime-500 text-white py-3 rounded-lg font-semibold hover:bg-lime-600 cursor-pointer"
              onClick={() => handlConfirm()}
            >
              Confirm & Pay ₹{totalOrderPrice}
            </button>
          </div>
        </div>
        {paymentSucess && (
          <PaymentSuccess
            otp={otp}
            onClose={onClose}
            selectedListData={selectedListData}
            totalOrderPrice={totalOrderPrice}
            partialQuantity={partialQuantity}
            isPartial={isPartial}
          />
        )}
      </div>
    </>
  );
}

//  <div className="  flex justify-center items-center  inset-0  fixed z-50 bg-black/40 ">
//       <div className="bg-[#f6f3ea]  max-w-[40cm] min-w-[35cm] rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh] ">
//         {/* CLOSE BUTTON */}
//         <div
//           className="absolute right-17 top-12 bg-black text-white rounded-full p-2 shadow cursor-pointer"
//           onClick={onClose}
//         >
//           <X />
//         </div>
// {  selectedListData && selectedListData.listingId >=0 &&
//         <div className="max-w-4xl mx-auto space-y-6">
//           {/* HEADER */}
//           <div className="flex items-center gap-3">
//             <div className="back_lime p-2 rounded-full text-white">
//               <Shield size={18} />
//             </div>

//             <h1 className="text-3xl font-semibold text-gray-800">
//               Confirm Payment
//             </h1>
//           </div>

//           {/* ESCROW INFO */}
//           <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex gap-3">
//             <Shield className="text_lime mt-1" size={18} />

//             <div>
//               <p className="font-medium text-gray-800">Secure Escrow Payment</p>

//               <p className="text-gray-600 text-sm">
//                 Your payment will be held securely in escrow until delivery
//                 confirmation. The seller will be notified once your payment is
//                 received.
//               </p>
//             </div>
//           </div>

//           {/* ORDER SUMMARY */}
//           <div className="bg-white rounded-xl shadow p-6">
//             <h2 className="text-xl font-semibold mb-5 text-black">
//               Order Summary
//             </h2>

//             <div className="flex justify-between items-center">
//               <div className="flex gap-4">
//                 <Image
//                   src={getImageUrls(selectedListData?.images[0]?.filePath)}
//                   className="w-20 h-20 rounded-lg object-cover"
//                   height={100}
//                   width={200}
//                   unoptimized
//                 />

//                 <div>
//                   <p className="font-semibold text-lg text-black">
//                     {selectedListData.cropName} - {selectedListData.variety}
//                   </p>

//                   <p className="text-gray-500">{isPartial ? partialQuantity : selectedListData.quantity } {selectedListData.unit}</p>
//                 </div>
//               </div>
//             </div>

//             <hr className="my-5" />

//             <div className="grid grid-cols-2 gap-y-3 text-gray-600 text-sm">
//               <div>Seller:</div>
//               <div className="text-right text-black font-medium">
//                 Demo Seller
//               </div>

//               <div>Location:</div>
//               <div className="text-right text-black font-medium">
//                 {selectedListData.district}, {selectedListData.state}
//               </div>

//               <div>Expected Delivery:</div>
//               <div className="text-right text-black font-medium">
//                 5-7 Business Days
//               </div>
//             </div>
//           </div>

//           {/* PAYMENT DETAILS */}
//           <div className="bg-white rounded-xl shadow p-6">
//             <h2 className="text-xl font-semibold mb-4 text-black">
//               Payment Details
//             </h2>

//             <div className="flex justify-between text-gray-600">
//               <span>Payment Method:</span>
//               <span className="text-black font-medium">UPI</span>
//             </div>

//             <hr className="my-4" />

//             <div className="flex justify-between items-center">
//               <span className="text-lg text-gray-700">Total Amount:</span>

//               <span className="text-3xl font-bold text_lime">₹{totalOrderPrice}</span>
//             </div>
//           </div>

//           {/* BUTTONS */}
//           <div className="flex gap-4">
//             <button
//               className="flex-1 border border-gray-300 py-4 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
//               onClick={onCloseConfirmPayment}
//             >
//               Back
//             </button>

//             <button
//               className="flex-1 back_lime text-white py-4 rounded-lg font-medium hover:bg-lime-700 cursor-pointer"
//               onClick={() =>{handlConfirm()}}
//             >
//               Confirm & Pay
//             </button>
//           </div>
//         </div>
// }
//       </div>
//       {paymentSucess && <PaymentSuccess onClose={onClose} selectedListData={selectedListData} totalOrderPrice={totalOrderPrice} partialQuantity={partialQuantity} isPartial={isPartial} />}
//     </div>
