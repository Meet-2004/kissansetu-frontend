"use client";
import Image from "next/image";
import {
  CheckCircle,
  Package,
  Truck,
  Eye,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function PaymentSuccess({
  onClose,
  selectedListData,
  totalOrderPrice,
  isPartial,
  partialQuantity,
  otp
}) {
  console.log("this is model at sucesss", selectedListData);
  console.log("this is model at sucesss", totalOrderPrice);
  console.log("this is otp",otp);
  const getImageUrls = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;

  return (
    // <div className="  flex justify-center items-center  inset-0  fixed z-50 bg-black/40">
    //   <div className="bg-[#f6f3ea]  max-w-[40cm] min-w-[36cm] rounded-xl shadow-xl p-6 overflow-y-auto max-h-[95vh]  ">
    //     {selectedListData && selectedListData.listingId >= 0 && (
    //       <div className="max-w-4xl mx-auto space-y-8">
    //         {/* SUCCESS ICON */}
    //         <div className="text-center">
    //           <div className="flex justify-center mb-4">
    //             <div className="bg-green-100 p-4 rounded-full">
    //               <CheckCircle className="text_lime" size={36} />
    //             </div>
    //           </div>

    //           <h1 className="text-3xl font-semibold text-gray-800">
    //             Payment Successfully Secured in Escrow
    //           </h1>

    //           <p className="text-gray-600 mt-2">
    //             Your payment has been secured in escrow. The seller has been
    //             notified and will now prepare your shipment.
    //           </p>
    //         </div>

    //         {/* ORDER CARD */}
    //         <div className="bg-white rounded-xl shadow p-6">
    //           <div className="flex gap-4 items-center">
    //             <Image
    //               src={getImageUrls(selectedListData?.images[0]?.filePath)}
    //               className="w-20 h-20 rounded-lg object-cover"
    //               height={100}
    //               width={200}
    //               unoptimized
    //             />

    //             <div>
    //               <h3 className="text-lg font-semibold text-black">
    //                {selectedListData.cropName} - {selectedListData.variety}

    //               </h3>

    //               <p className="text-gray-500">{isPartial ? partialQuantity : selectedListData.quantity} {selectedListData.unit} from Demo Seller</p>
    //             </div>
    //           </div>

    //           <hr className="my-5" />

    //           <div className="flex justify-between text-sm">
    //             <div className="text-gray-600">Order Amount:</div>

    //             <div className="font-semibold text_lime">₹{totalOrderPrice}</div>
    //           </div>

    //           <div className="flex justify-between text-sm mt-2">
    //             <div className="text-gray-600">Expected Delivery:</div>

    //             <div className="font-medium text-black">5-7 Business Days</div>
    //           </div>
    //         </div>

    //         {/* WHAT HAPPENS NEXT */}
    //         <div className="bg-white rounded-xl shadow p-6">
    //           <h2 className="text-xl font-semibold mb-6 text-black">
    //             What Happens Next?
    //           </h2>

    //           <div className="space-y-6">
    //             <div className="flex gap-4">
    //               <div className="bg-green-100 p-3 rounded-full">
    //                 <Package className="text_lime" size={20} />
    //               </div>

    //               <div>
    //                 <p className="font-medium text-black">
    //                   Seller Preparing Shipment
    //                 </p>
    //                 <p className="text-gray-500 text-sm ">
    //                   Demo Seller has been notified and will prepare your order
    //                   for shipment.
    //                 </p>
    //               </div>
    //             </div>

    //             <div className="flex gap-4">
    //               <div className="bg-gray-100 p-3 rounded-full">
    //                 <Truck className="text-gray-500" size={20} />
    //               </div>

    //               <div>
    //                 <p className="font-medium text-black">
    //                   Delivery Tracking Available Soon
    //                 </p>
    //                 <p className="text-gray-500 text-sm">
    //                   Once shipped, you'll receive tracking details to monitor
    //                   your delivery in real-time.
    //                 </p>
    //               </div>
    //             </div>

    //             <div className="flex gap-4">
    //               <div className="bg-gray-100 p-3 rounded-full">
    //                 <Eye className="text-gray-500" size={20} />
    //               </div>

    //               <div>
    //                 <p className="font-medium text-black">
    //                   Confirm Delivery to Release Payment
    //                 </p>
    //                 <p className="text-gray-500 text-sm">
    //                   After receiving your goods, confirm the delivery to
    //                   release the payment to the seller.
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         {/* ESCROW PROTECTION */}
    //         <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex gap-3">
    //           <ShieldCheck className="text_lime mt-1" size={20} />

    //           <div>
    //             <p className="font-medium text-gray-800">Protected by Escrow</p>

    //             <p className="text-gray-600 text-sm">
    //               Your funds are safely held in escrow. Payment will only be
    //               released to the seller after you confirm that the goods have
    //               been delivered in satisfactory condition.
    //             </p>
    //           </div>
    //         </div>

    //         {/* ACTION BUTTONS */}
    //         <div className="flex flex-col md:flex-row gap-4">
    //           <button className="flex-1 back_lime hover:bg-lime-700 text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2 cursor-pointer">
    //             View Order Status
    //             <ArrowRight size={18} />
    //           </button>

    //           <button
    //             className="flex-1 border border-gray-300 py-4 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
    //             onClick={onClose}
    //           >
    //             Go to Dashboard
    //           </button>
    //         </div>

    //         {/* SUPPORT */}
    //         <p className="text-center text-sm text-gray-500">
    //           Need help? Contact our support team at
    //           <span className="text_lime ml-1">support@kisansetu.com</span>
    //         </p>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="flex justify-center items-center inset-0 fixed z-50 bg-black/40">
  <div className=" max-w-[25cm] min-w-[35cm]  rounded-2xl shadow-2xl p-8 overflow-y-auto max-h-[95vh] bg-linear-to-br from-green-50 via-emerald-50 to-white">

    {selectedListData && selectedListData.listingId >= 0 && (
      <div className="space-y-8">

        {/* SUCCESS HEADER */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-lime-500 text-white p-5 rounded-full animate-float">
              <CheckCircle size={40} />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            Payment Successfully Secured!
          </h1>

          <p className="text-gray-600 mt-2 text-lg">
            Your payment of{" "}
            <span className="text-lime-600 font-semibold">
              ₹{totalOrderPrice}
            </span>{" "}
            has been securely placed in escrow
          </p>
        </div>

        {/* OTP SECTION */}
        <div className="  rounded-2xl p-6 bg-linear-to-br from-[#64b900]/10 to-[#64b900]/5 border-2 border-[#64b900] ">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-lime-500 text-white p-2 rounded-lg">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Delivery OTP</p>
              <p className="text-sm text-gray-500">
                Order #{selectedListData?.orderId || "ORD-2024-139767"}
              </p>
            </div>
          </div>

          {/* OTP BOX */}
          <div className="bg-white rounded-xl p-4 mb-3 ">
            <p className="text-xs text-gray-500 mb-1">YOUR OTP CODE</p>
            <p className="text-3xl tracking-[10px] font-bold text-lime-500">
              {otp}
            </p>
          </div>

          <div className="bg-white rounded-xl p-3 text-sm text-gray-600 mb-3">
            Share this OTP ONLY after receiving your goods.
          </div>

          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3 text-sm text-yellow-700">
            ⚠️ Do not share this OTP before delivery. This OTP confirms delivery
            and releases payment.
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-2 gap-6">

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>

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

            <div className="space-y-2 ">
              <p>
                <span className="text-gray-500 ">Seller: </span>
                <p className="font-medium text-black">Rajesh Kumar</p>
              </p>

              <p>
                <span className="text-gray-500">Location: </span>
                <p className="font-medium text-black">
                  {selectedListData.district}, {selectedListData.state}
                </p>
              </p>

              <p>
                <span className="text-gray-500">Expected Delivery: </span>
                <p className="font-medium text-black">In 5-6 Days</p>
              </p>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid</span>
              <span className="text-lime-600 font-bold text-lg">
                ₹{totalOrderPrice}
              </span>
            </div>
          </div>

          {/* WHAT HAPPENS NEXT */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-semibold mb-4 text-black">
              What Happens Next?
            </h2>

            <div className="space-y-5">

              <div className="flex gap-3">
                <div className="bg-lime-500 h-11 w-15 rounded-xl flex justify-center items-center text-center" >
                  <Package className=" flex justify-center items-center text-center text-white" size={25} />
                </div>
                <div>
                  <p className="font-medium text-black">
                    1. Seller Preparing Order
                  </p>
                  <p className="text-sm text-gray-500">
                    Rajesh Kumar has been notified and will prepare your shipment
                  </p>
                </div>
              </div>

              <div className="flex gap-3 ">
               <div className="bg-gray-300 h-11 w-15 rounded-xl flex justify-center items-center text-center" >
                  <Truck className="text-gray-500" size={25} />
                </div>
                <div>
                  <p className="font-medium text-black">
                    2. Shipment & Tracking
                  </p>
                  <p className="text-sm text-gray-500">
                    You'll receive tracking details once the order is shipped
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-gray-300 h-11 w-15 rounded-xl flex justify-center items-center text-center" >
                  <Eye className="text-gray-500" size={25} />
                </div>
                <div>
                  <p className="font-medium text-black">
                    3. Confirm Delivery
                  </p>
                  <p className="text-sm text-gray-500">
                    Confirm receipt to release payment to the seller
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ESCROW INFO */}
        <div className=" bg-blue-50 border border-blue-200 rounded-xl p-5 flex gap-3">
          <ShieldCheck className="text-blue-600 mt-1" size={20} />
          <div>
            <p className="text-xl text-blue-900 mb-2">
              Protected by Secure Escrow
            </p>
            <p className="text-sm text-blue-900 ">
              Your funds are safely held in escrow by KisanSetu. Payment will only
              be released after you confirm delivery.
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button className="flex-1 bg-lime-500 hover:bg-lime-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
            View Order Status
            <ArrowRight size={18} />
          </button>

          <button
            className="flex-1 border border-gray-300 py-3 rounded-lg text-black hover:bg-gray-100"
            onClick={onClose}
          >
            Go to Dashboard
          </button>
        </div>

        {/* SUPPORT */}
        <div className="bg-white rounded-xl p-5 text-center shadow">
          <p className="font-medium text-gray-800">Need Help?</p>
          <p className="text-sm text-gray-500 mb-3">
            Our support team is here to assist you
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-lime-500 text-white px-4 py-2 rounded-lg">
              support@kisansetu.com
            </button>

            <button className="border border-lime-500 text-lime-600 px-4 py-2 rounded-lg">
              +91 123 456 7890
            </button>
          </div>
        </div>

      </div>
    )}
  </div>
</div>
  );
}
