import { useState } from "react";
import { Clock, X, Info } from "lucide-react";
import { headFont } from "@/app/layout";
import { postApi } from "@/services/apiService";
import { toast } from "react-toastify";
import Toast from "@/Components/Alert/Toast";


export default function ExtendAuctionModal({onClose,auctionExtendTimeData,setRefreshExtendAuctionTimeCount}) {

    console.log("this is extendAuctionData",auctionExtendTimeData);
  const [selectedTime, setSelectedTime] = useState("6 Hours");

  const options = [
    "1",
    "2",
    "6",
    "12",
    "24",
    "48",
  
  ];

  const handleExtendAuctionTime=async()=>{
console.log("this is selected time in handle",selectedTime)
console.log("this is selected time in handle * 60",selectedTime * 60);

    const selectedTimeInMinute=selectedTime * 60;
    console.log("this is minutes",selectedTimeInMinute);
    const payLoad={
       minutes: selectedTimeInMinute,
       sellerId: auctionExtendTimeData?.sellerId,
         listingId:auctionExtendTimeData?.listingId,
    }

    const extendAuctionTime=await postApi("/listings/extend-auction",payLoad);

    if(extendAuctionTime.success){
        setRefreshExtendAuctionTimeCount();
        toast.success(extendAuctionTime.message);
        setTimeout(()=>{
            onClose();
        },2000);
    }else{
         toast.error(extendAuctionTime.message);
    }
     

  }

  return (
    <>
    <Toast times={2000} />
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-[500px] rounded-2xl shadow-xl  relative">
        
        {/* Close Button */}
        <button className="absolute right-8 top-7 text-gray-700 cursor-pointer hover:text-black" onClick={onClose}>
          <X  size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 p-5">
          <div className="bg-[#f59e0b]/20 p-2 rounded-lg">
            <Clock className="text-[#f59e0b]" size={30} />
          </div>
          <div>
            <h2 className={` ${headFont.className} text-2xl text-black `}>
              Extend Auction Time
            </h2>
            <p className="text-sm text-gray-500">
              {auctionExtendTimeData?.cropName} -  {auctionExtendTimeData?.variety}
            </p>
          </div>
        </div>

        <hr className="w-full border border-gray-200" />

        {/* Info Box */}
        <div className="p-5">
        <div className="flex gap-2  bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-xl mb-5">
          <Info size={25} className=" w-11 text-blue-600" />
          <p className="text-sm">
            Extending the auction time will give buyers more opportunity to place bids.
            All existing bids will remain <br />valid.
          </p>
        </div>

        {/* Duration */}
        <h3 className="text-sm font-medium mb-3 text-black">
          Select Extension Duration
        </h3>

        <div className="grid grid-cols-3 gap-3 mb-5 text-black">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedTime(opt)}
              className={`border cursor-pointer rounded-lg py-3 text-sm transition  ${
                selectedTime === opt
                  ? "border-lime-500 bg-lime-50 text_lime font-medium"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {opt} Hours
            </button>
          ))}
        </div>

        {/* New Date Box */}
        <div className="text_lime  mt-2 mb-3 p-4 bg-[#64b900]/10 border-2 border-[#64b900]/30 rounded-xl">
          <p className="text-xs font-semibold uppercase mb-1">
            New End Date
          </p>
          <p className="text-xs text-black/70">
            Auction will be extended by {selectedTime.toLowerCase()} Hours
          </p>
        </div>
        </div>
   <hr className="w-full border border-gray-200" />
        {/* Footer Buttons */}
        <div className="flex w-full p-4 justify-end gap-3">
          
          <button className="px-4 py-3 back_lime text-white rounded-lg hover:bg-lime-600 w-full cursor-pointer" onClick={handleExtendAuctionTime}>
            Extend Auction
          </button>
        </div>
      </div>
    </div>
    </>
  );
}