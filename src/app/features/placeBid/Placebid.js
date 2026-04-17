import "@/app/globals.css";
import {
  Clock,
  TrendingUp,
  Star,
  MapPin,
  Package,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import drone from "@/assets/dron.jpg";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAuctions } from "@/app/Store/slices/bidSlice";
import { postApi } from "@/services/apiService";
import { getApi } from "@/services/apiService";
import ConfirmBidModal from "./confirmBidModal";
import { SportsHandballTwoTone } from "@mui/icons-material";
import BidSuccessModal from "./BidSucessModal";
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Alert/Toast";
import "@/app/globals.css";

export default function Placebid({ Onclose, selectedList }) {
  const [bidData, setbidData] = useState({ buyerAmount: "" });
  const [bidList, setbidList] = useState();
  const [timeLeft, setTimeLeft] = useState("");
  const [oneListData, setoneListData] = useState();
  const [timeLeftbid, setTimeLeftbid] = useState("");
  const [openConfirm, setopenConfirm] = useState(false);
  const [bidSucessModal, setbidSucessModal] = useState(false);

  const dispatch = useDispatch();

  console.log("bidsucess",bidSucessModal);

  const getImageUrls = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;

  useEffect(() => {
    setoneListData([selectedList]);
    console.log("onse data list", oneListData);
    const listingIds = selectedList.listingId;

    async function fetchData() {
      const result = await getApi(`/buyers/auctions/${listingIds}/bids`);
      setbidList(result.data);
    }
    fetchData();
  }, []);

  //   function getTime(time){
  //     console.log(time[0][1]);
  //     const interval =setInterval(()=>{

  //       const now= new Date();
  //       const end=new Date(
  //         time[0][0],
  //         time[0][1]-1,
  //         time[0][2],
  //         time[0][3],
  //         time[0][4],
  //       )
  //       const diff=now-end;
  //        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  //         const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  //         const m = Math.floor((diff / (1000 * 60)) % 60);
  //         const s = Math.floor((diff / 1000) % 60);

  //         console.log("day",d);
  //            console.log("hour",h);
  //            if(m>=60){
  //             setTimeLeftbid(`${h} hours`)
  //            }
  //           else if(h>=24){
  //              setTimeLeftbid(`${d} days`)
  //            }
  //            else{
  //             setTimeLeftbid(`${m} minutes`)
  //            }
  //     },1000)
  // return () => clearInterval(interval);
  //   }
  console.log(bidList);
  useEffect(() => {
    console.log("hello time");
    console.log("inside one data list", oneListData);
    if (!selectedList || !selectedList?.auctionEndTime) return;
    //   console.log("date",cropData[0].auctionEndTime);
    const interval = setInterval(() => {
      const now = new Date();
      console.log("today date", now);
      const end = new Date(
        selectedList.auctionEndTime[0],
        selectedList.auctionEndTime[1] - 1, // months are 0-based
        selectedList.auctionEndTime[2],
        selectedList.auctionEndTime[3],
        selectedList.auctionEndTime[4],
      );
      //  console.log(now.replace("/"," "));
      console.log(end);
      const diff = end - now;
      console.log("diff", diff);

      if (diff <= 0) {
        setTimeLeft("Auction Ended");
        clearInterval(interval);
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      console.log(d);

      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
      return;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log("this is one list data", oneListData);
  const handleChange = (e) => {
    setbidData({ [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    // console.log("this is listing details",oneListData);
    // console.log("hello");
    // console.log("this is listingid",oneListData[0].listingId)
    const listingIds = oneListData[0].listingId;

    const result = await postApi(`/buyers/${listingIds}/auctions`, bidData);
    setopenConfirm(false);
    if (result.success) {
      // alert("something right");
      toast.success(result.message)
      console.log("hello",result.message);
      // Onclose();
      setbidSucessModal(true);
      // Refresh auctions data after successful bid
      dispatch(fetchAuctions());
    } else {
      toast.error(result.message,{
        style:{
          color:"white",
        }
      });
      console.log("something wrong",result.message);
      // alert("something wrong");
    }
  };

  console.log(selectedList);

  {
    /* <div className="fixed  z-50 inset-0 bg-black/20   p-4 overflow-hidden">
        <div className="  bg-white  w-full h-full py-5 overflow-hidden overflow-y-scroll">
          Header
          <div className="mx-auto px-5 ">
            <div className="h-20 ">
              <div className="justify-between flex ">
                <div className="text-black ">
                  <p>Live Auction</p>
                  <p className="back_lime px-2 items-center  w-30 text-center flex justify-center text-sm h-7 mt-2">
                    Whole Lot
                  </p>
                </div>
                <div className="flex gap-5 ">
                  <p className="back_lime px-2 items-center  w-40 text-center flex justify-center text-sm h-7">
                    Auctions Active
                  </p>
                  <button
                    onClick={Onclose}
                    className="text-xl text_black cursor-pointer h-7"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr className="text-gray-400" />
<div className="gap-2 ">
    <div className="float-left w-[63%] h-full border-2 border-black overflow-hidden overflow-y-scroll">
        <div className="px-5 py-5">
            <div className="w-100 h-150 border-2 border-gray-500">

            </div>

        </div>

    </div>
    <div className="float-right w-[35%] h-50 border-2 border-black">

    </div>
</div>

        </div>
      </div> */


      return (
  <>
    <Toast times={4000} />

    {/* Overlay */}
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-3 sm:p-6">
      
      {/* Modal */}
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl p-4 sm:p-6 pb-28 overflow-y-auto max-h-[92.5vh] text-black">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black">
              Live Auction
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Whole Lot Auction Mode
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <span className="bg-green-100 text_lime px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap">
              Auction Active
            </span>

            <button
              onClick={Onclose}
              className="text-lg sm:text-3xl sm:absolute text-black"
            >
              ✕
            </button>
          </div>
        </div>

        {oneListData && oneListData.length > 0 ? (
          oneListData.map((item) => (
            <div key={item.listingId} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* LEFT SECTION */}
              <div className="lg:col-span-2 space-y-6">

                {/* PRODUCT CARD */}
                <div className="border rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 border-gray-300">
                  
                  <div className="w-full sm:w-40 h-40 sm:h-32 relative rounded-lg overflow-hidden">
                    <Image
                      src={getImageUrls(item.images[0].filePath)}
                      alt="crop"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1">
                    
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-lg sm:text-xl font-semibold text-black">
                        {item.cropName}
                      </h2>

                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md text-xs sm:text-sm">
                        <Star size={14} className="text-yellow-500 fill-yellow-400" />
                        <p className="text-black">4.8</p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm">
                      Variety: <span className="text_lime font-medium">{item.variety}</span>
                    </p>

                    <p className="text-gray-600 text-xs sm:text-sm mb-3">
                      Grade: <span className="font-medium">{item.grade}</span>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                      
                      <div>
                        <p className="text-gray-500">Quantity</p>
                        <p className="font-semibold text-black">
                          {item.quantity} {item.unit}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Location</p>
                        <p className="font-semibold flex items-center gap-1 text-black">
                          <MapPin size={14} />
                          {item.district} {item.state}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Packaging</p>
                        <p className="font-semibold text-black">
                          {item.packagingType}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Storage</p>
                        <p className="font-semibold text-black">
                          {item.storageType}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Harvest Date</p>
                        <p className="font-semibold text-black">
                          {item.harvestDate[2]}-{item.harvestDate[1]}-{item.harvestDate[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AUCTION INFO */}
                <div className="border rounded-lg p-4 sm:p-6 space-y-4 border-gray-300">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                    <div>
                      <p className="text-black">Base Price</p>
                      <p className="text-black">₹{item.pricePerKg}</p>
                    </div>

                    <div>
                      <p className="text-black">Min Increment</p>
                      <p className="text_lime">₹{item.minimumBidIncrement}</p>
                    </div>

                    <div>
                      <p className="text-black">Total Value</p>
                      <p className="text-black">₹{item.basePrice}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-xs">Highest Bid</p>
                      <h2 className="text-xl sm:text-2xl font-bold text_lime">
                        ₹{item.currentHighestBid}
                      </h2>
                    </div>
                    <TrendingUp size={24} className="text_lime" />
                  </div>

                  <div className="text-center">
                    <p className="text-gray-500 text-xs">Ends In</p>
                    <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm">
                      <Clock size={16} />
                      {timeLeft}
                    </div>
                  </div>
                </div>

                {/* BID TABLE */}
                <div className="border rounded-lg overflow-x-auto border-gray-300">
                  
                  {bidList && bidList.length > 0 ? (
                    <table className="w-full min-w-[500px] text-xs sm:text-sm text-black">
                      <thead className="border-b text-gray-500">
                        <tr>
                          <th className="p-2 text-left">Bidder</th>
                          <th className="p-2 text-left">Amount</th>
                          <th className="p-2 text-left">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {bidList.map((bid, i) => (
                          <tr key={i} className="border-t text-black">
                            <td className="p-2">{bid.bidderName}</td>
                            <td className="p-2">₹{bid.buyerAmount}</td>
                            <td className="p-2">{bid.bidHistoryStatus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-4 text-black">
                      No bids placed yet
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT SECTION (ONLY HIDDEN ON MOBILE) */}
              <div className="hidden lg:block border rounded-lg p-4 sm:p-6 space-y-4 h-fit border-lime-400">
                
                <h3 className="font-semibold text-base sm:text-lg text-black">
                  Place Your Bid
                </h3>

                <div className="bg-gray-100 p-3 rounded">
                  <p className="text-gray-500 text-xs">Current Bid</p>
                  <h2 className="text-lg font-bold text-black">
                    ₹{item.currentHighestBid}
                  </h2>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Minimum Next Bid</p>
                  <p className="text_lime font-semibold text-lg">
                    ₹{item.currentHighestBid + item.minimumBidIncrement}
                  </p>
                </div>

                {/*  SAME INPUT (NO CHANGE) */}
                <input
                  type="text"
                  placeholder={`Minimum ${item.currentHighestBid + item.minimumBidIncrement}`}
                  value={bidData.buyerAmount}
                  onChange={handleChange}
                  name="buyerAmount"
                  className="w-full border p-2 rounded text-sm text-black"
                />

                <button
                  className="w-full bg-lime-500 text-white py-2 rounded hover:bg-lime-600"
                  onClick={() => setopenConfirm(true)}
                >
                  Place Bid
                </button>

              

                <button className="w-full border border-green-600 text_lime py-2 rounded">
                  Set Auto Bid
                </button>

                <div className="bg-yellow-50 text-yellow-700 text-sm p-3 rounded">
                  [Demo] This is a demo interface
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-black">
            No details available
          </div>
        )}
      </div>

      {/* MOBILE STICKY BID BAR (NO LOGIC CHANGE) */}
      {oneListData && oneListData.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 z-50">
          
          <div className="flex flex-col gap-2">
            
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">Current Bid</p>
              <p className="text-lg font-bold text_lime">
                ₹{oneListData[0].currentHighestBid}
              </p>
            </div>

            <div className="flex gap-2">
              {/* 🔴 SAME INPUT + SAME STATE */}
              <input
                type="text"
                placeholder={`Minimum ${oneListData[0].currentHighestBid + oneListData[0].minimumBidIncrement}`}
                value={bidData.buyerAmount}
                onChange={handleChange}
                name="buyerAmount"
                className="w-[65%] border rounded-lg px-3 py-2 text-sm text-black"
              />

              <button
                className="bg-lime-500 w-[35%] text-white px-4 py-2 rounded-lg font-semibold hover:bg-lime-600"
                onClick={() => setopenConfirm(true)}
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>
      )}
        {/* 🔴 SAME MODALS */}
                {openConfirm && (
                  <ConfirmBidModal
                    open={openConfirm}
                    onClose={() => setopenConfirm(false)}
                    onConfirm={() => handleSubmit()}
                    cropName={selectedList.cropName}
                    pricePerKg={selectedList.pricePerKg}
                    totalPrice={bidData.buyerAmount}
                  />
                )}

                {bidSucessModal && (
                  <BidSuccessModal
                    open={bidSucessModal}
                    onClose={() => setbidSucessModal(false)}
                    totalPrice={bidData.buyerAmount}
                    Onclose={Onclose}
                  />
                )}
    </div>
  </>
);
  }

//  
}



//  return (
//   <>
//     <Toast times={4000} />

//     {/* Overlay */}
//     <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-3 sm:p-6">
      
//       {/* Modal */}
//       <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl p-4 sm:p-6 overflow-y-auto max-h-[90vh] text-black">
        
//         {/* HEADER */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          
//           {/* LEFT */}
//           <div>
//             <h2 className="text-lg sm:text-xl font-semibold text-black">
//               Live Auction
//             </h2>
//             <p className="text-gray-500 text-xs sm:text-sm">
//               Whole Lot Auction Mode
//             </p>
//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
//             <span className="bg-green-100 text_lime px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap">
//               Auction Active
//             </span>

//             <button
//               onClick={Onclose}
//               className="text-lg sm:text-xl text-black"
//             >
//               ✕
//             </button>
//           </div>
//         </div>

//         {oneListData && oneListData.length > 0 ? (
//           oneListData.map((item) => (
//             <div key={item.listingId} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
//               {/* LEFT SECTION */}
//               <div className="lg:col-span-2 space-y-6">

//                 {/* PRODUCT CARD */}
//                 <div className="border rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 border-gray-300">
                  
//                   {/* IMAGE */}
//                   <div className="w-full sm:w-40 h-40 sm:h-32 relative rounded-lg overflow-hidden">
//                     <Image
//                       src={getImageUrls(item.images[0].filePath)}
//                       alt="crop"
//                       fill
//                       className="object-cover"
//                       unoptimized
//                     />
//                   </div>

//                   {/* DETAILS */}
//                   <div className="flex-1">
                    
//                     <div className="flex justify-between items-start mb-2">
//                       <h2 className="text-lg sm:text-xl font-semibold text-black">
//                         {item.cropName}
//                       </h2>

//                       <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md text-xs sm:text-sm">
//                         <Star size={14} className="text-yellow-500 fill-yellow-400" />
//                         <p className="text-black">4.8</p>
//                       </div>
//                     </div>

//                     <p className="text-gray-600 text-xs sm:text-sm">
//                       Variety: <span className="text_lime font-medium">{item.variety}</span>
//                     </p>

//                     <p className="text-gray-600 text-xs sm:text-sm mb-3">
//                       Grade: <span className="font-medium">{item.grade}</span>
//                     </p>

//                     {/* INFO GRID */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                      
//                       <div>
//                         <p className="text-gray-500">Quantity</p>
//                         <p className="font-semibold text-black">
//                           {item.quantity} {item.unit}
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-gray-500">Location</p>
//                         <p className="font-semibold flex items-center gap-1 text-black">
//                           <MapPin size={14} />
//                           {item.district}, {item.state}
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-gray-500">Packaging</p>
//                         <p className="font-semibold text-black">
//                           {item.packagingType}
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-gray-500">Storage</p>
//                         <p className="font-semibold text-black">
//                           {item.storageType}
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-gray-500">Harvest Date</p>
//                         <p className="font-semibold text-black">
//                           {item.harvestDate[2]}-{item.harvestDate[1]}-{item.harvestDate[0]}
//                         </p>
//                       </div>

//                     </div>
//                   </div>
//                 </div>

//                 {/* AUCTION INFO */}
//                 <div className="border rounded-lg p-4 sm:p-6 space-y-4 border-gray-300">
                  
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
//                     <div>
//                       <p className="text-black">Base Price</p>
//                       <p className="text-black">₹{item.pricePerKg}</p>
//                     </div>

//                     <div>
//                       <p className="text-black">Min Increment</p>
//                       <p className="text_lime">₹{item.minimumBidIncrement}</p>
//                     </div>

//                     <div>
//                       <p className="text-black">Total Value</p>
//                       <p className="text-black">₹{item.basePrice}</p>
//                     </div>
//                   </div>

//                   {/* CURRENT BID */}
//                   <div className="bg-green-50 rounded-lg p-4 flex justify-between items-center">
//                     <div>
//                       <p className="text-gray-500 text-xs">Highest Bid</p>
//                       <h2 className="text-xl sm:text-2xl font-bold text_lime">
//                         ₹{item.currentHighestBid}
//                       </h2>
//                     </div>
//                     <TrendingUp size={24} className="text_lime" />
//                   </div>

//                   {/* TIMER */}
//                   <div className="text-center">
//                     <p className="text-gray-500 text-xs">Ends In</p>
//                     <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm">
//                       <Clock size={16} />
//                       {timeLeft}
//                     </div>
//                   </div>
//                 </div>

//                 {/* BID TABLE */}
//                 <div className="border rounded-lg overflow-x-auto border-gray-300">
                  
//                   {bidList && bidList.length > 0 ? (
//                     <table className="w-full min-w-[500px] text-xs sm:text-sm text-black">
                      
//                       <thead className="border-b text-gray-500">
//                         <tr>
//                           <th className="p-2 text-left">Bidder</th>
//                           <th className="p-2 text-left">Amount</th>
//                           <th className="p-2 text-left">Status</th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {bidList.map((bid, i) => (
//                           <tr key={i} className="border-t text-black">
//                             <td className="p-2">{bid.bidderName}</td>
//                             <td className="p-2">₹{bid.buyerAmount}</td>
//                             <td className="p-2">{bid.bidHistoryStatus}</td>
//                           </tr>
//                         ))}
//                       </tbody>

//                     </table>
//                   ) : (
//                     <div className="text-center py-4 text-black">
//                       No bids placed yet
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* RIGHT SECTION */}
//               <div className="border rounded-lg p-4 sm:p-6 space-y-4 h-fit border-lime-400">
                
//                 <h3 className="font-semibold text-base sm:text-lg text-black">
//                   Place Your Bid
//                 </h3>

//                 <div className="bg-gray-100 p-3 rounded">
//                   <p className="text-gray-500 text-xs">Current Bid</p>
//                   <h2 className="text-lg font-bold text-black">
//                     ₹{item.currentHighestBid}
//                   </h2>
//                 </div>

//                 <div>
//                   <p className="text-gray-500 text-sm">Minimum Next Bid</p>
//                   <p className="text_lime font-semibold text-lg">
//                     ₹{item.currentHighestBid + item.minimumBidIncrement}
//                   </p>
//                 </div>

//                 <input
//                   type="text"
//                   placeholder={`Minimum ${item.currentHighestBid + item.minimumBidIncrement}`}
//                   value={bidData.buyerAmount}
//                   onChange={handleChange}
//                   name="buyerAmount"
//                   className="w-full border p-2 rounded text-sm text-black"
//                 />

//                 <button
//                   className="w-full bg-lime-500 text-white py-2 rounded hover:bg-lime-600"
//                   onClick={() => setopenConfirm(true)}
//                 >
//                   Place Bid
//                 </button>

//                 {openConfirm && (
//                   <ConfirmBidModal
//                     open={openConfirm}
//                     onClose={() => setopenConfirm(false)}
//                     onConfirm={() => handleSubmit()}
//                     cropName={selectedList.cropName}
//                     pricePerKg={selectedList.pricePerKg}
//                     totalPrice={bidData.buyerAmount}
//                   />
//                 )}

//                 {bidSucessModal && (
//                   <BidSuccessModal
//                     open={bidSucessModal}
//                     onClose={() => setbidSucessModal(false)}
//                     totalPrice={bidData.buyerAmount}
//                     Onclose={Onclose}
//                   />
//                 )}

//                 <button className="w-full border border-green-600 text_lime py-2 rounded">
//                   Set Auto Bid
//                 </button>

//                 <div className="bg-yellow-50 text-yellow-700 text-sm p-3 rounded">
//                   [Demo] This is a demo interface
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-6 text-black">
//             No details available
//           </div>
//         )}
//       </div>
//     </div>
//   </>
// );
