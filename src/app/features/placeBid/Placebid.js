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
  }

  return (
    <>
    <Toast times={4000} />
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-6">
      <div className="bg-white min-w-200 max-w-350 rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text_black">Live Auction</h2>
            <p className="text-gray-500 text-sm">Whole Lot Auction Mode</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-green-100 text_lime px-4 py-1 rounded-full text-sm">
              Auction Active
            </span>
            <button
              onClick={Onclose}
              className="text-xl text_black cursor-pointer h-7"
            >
              ✕
            </button>
          </div>
        </div>

        {oneListData && oneListData.length > 0 ? (
          oneListData.map((item, index) => {
            return (
              <>
                {/* LEFT SECTION */}
                <div className="grid grid-cols-3 gap-6" key={item.listingId}>
                  <div className="col-span-2 space-y-6">
                    <div className="border rounded-xl p-6 flex gap-6 items-start  border-gray-500">
                      {/* Crop Image */}
                      <div className="w-40 h-32 relative rounded-lg overflow-hidden">
                        <Image
                          src={getImageUrls(item.images[0].filePath)}
                          alt="Premium Wheat"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Crop Details */}
                      <div className="flex-1">
                        {/* Title Row */}
                        <div className="flex justify-between items-start mb-2">
                          <h2 className="text-xl font-semibold text_black">
                            {item.cropName}
                          </h2>

                          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md text-sm">
                            <Star
                              size={16}
                              className="text-yellow-500 fill-yellow-400 "
                            />
                            <p className="text-black"> 4.8</p>
                          </div>
                        </div>

                        {/* Variety + Grade */}
                        <p className="text-sm text-gray-600">
                          Variety:
                          <span className="text_lime font-medium">
                            {item.variety}
                          </span>
                        </p>

                        <p className="text-sm text-gray-600 mb-3">
                          Grade:{" "}
                          <span className="font-medium">{item.grade}</span>
                        </p>

                        {/* Grid Info */}
                        <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
                          <div>
                            <p className="text-gray-500">Total Quantity</p>
                            <p className="font-semibold text_black">
                              {item.quantity} {item.unit}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 flex items-center gap-1">
                              Location
                            </p>
                            <p className="font-semibold flex gap-1 text_black  ">
                              {" "}
                              <p className="flex items-center">
                                <MapPin size={14} />
                              </p>{" "}
                              <p className="text-md">
                                {item.district} {item.state}
                              </p>
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 flex items-center gap-1">
                              <Package size={14} /> Packaging
                            </p>
                            <p className="font-semibold text_black">
                              {item.packagingType}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500">Storage</p>
                            <p className="font-semibold text_black">
                              {item.storageType}
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-500 flex items-center gap-1">
                              <Calendar size={14} /> Harvest Date
                            </p>
                            <p className="font-semibold text_black">
                              {item.harvestDate[2]}-{item.harvestDate[1]}-
                              {item.harvestDate[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Highest Bid */}
                    <div className="border border-gray-500 rounded-lg p-6">
                      <div>
                        <p className="text_black">Auction Information</p>
                        <div className="mt-2 grid grid-cols-3">
                          <div>
                            <p className="text_black">Base Price (per kg)</p>
                            <p className="text_black">₹{item.pricePerKg}</p>
                          </div>
                          <div>
                            <p className="text_black">Minimum Bid Increment</p>
                            <p className="text_lime">
                              ₹{item.minimumBidIncrement}
                            </p>
                          </div>
                          <div>
                            <p className="text_black">Total Lot Value (Base)</p>
                            <p className="text_black">₹{item.basePrice}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex justify-between items-center mt-5">
                        <div>
                          <p className="text-gray-500 text-sm">
                            Current Highest Bid
                          </p>
                          <h2 className="text-3xl font-bold text_lime">
                            ₹{item.currentHighestBid}
                          </h2>
                          {/* <p className="text-sm text-gray-500">Total: ₹1,250,000</p> */}
                        </div>

                        <TrendingUp className="text_lime" size={32} />
                      </div>

                      {/* Timer */}
                      <div className="text-center space-y-2 mt-5">
                        <p className="text-gray-500">Auction Ends In</p>

                        <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg text-lg font-semibold">
                          <Clock size={18} />
                          {timeLeft}
                        </div>

                        <p className="text-orange-500 text-sm">
                          If a bid is placed in the last 2 minutes, the auction
                          extends automatically.
                        </p>
                      </div>
                    </div>

                    {/* Bid Activity */}
                    <div className="border rounded-lg  border-gray-500">
                      <div className="p-4 border-b font-semibold text_black">
                        Bid Activity
                      </div>

                      {bidList && bidList.length > 0 ? (
                        <table className="w-full text-sm" key={index}>
                          <thead className="text-gray-500 border-b">
                            <tr className="">
                              <th className="text-left p-3 ">Bidder</th>
                              <th className="text-left p-3">
                                Bid Amount (per kg)
                              </th>
                              <th className="text-left p-3">Time Placed</th>
                              <th className="text-left p-3">Status</th>
                            </tr>
                          </thead>

                          <tbody>
                            {bidList?.map((bid, index) => {
                              return (
                                <tr
                                  className=" text_black border-t border-black"
                                  key={index}
                                >
                                  <td className="p-3  ">{bid.bidderName}</td>
                                  <td className="p-3  ">₹{bid.buyerAmount}</td>
                                  {/* <td className="p-3" >{getTime([bid.bidTime])}{timeLeftbid}</td> */}
                                  <td className="flex gap-2.justify-center py-2 gap-5">
                                    {bid.bidHistoryStatus}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <div className="text-center w-full text-black px-5 py-5">
                          There is no bid placed yet
                        </div>
                      )}

                      {/* <div className="text_lime text-sm p-4">View Full History</div> */}
                    </div>
                  </div>

                  {/* RIGHT SECTION */}
                  <div className=" rounded-lg p-6 space-y-5 h-fit border-2 border-lime-500">
                    <h3 className="font-semibold text-lg text_black">
                      Place Your Bid
                    </h3>

                    {/* Current Bid */}
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="text-gray-500 text-sm">
                        Current Highest Bid
                      </p>
                      <h2 className="text-2xl font-bold text_black">
                        ₹{item.currentHighestBid}
                      </h2>
                      <p className="text-sm text-gray-500"></p>
                    </div>

                    {/* Minimum Bid */}
                    <div>
                      <p className="text-sm text-gray-500">Minimum Next Bid</p>
                      <p className="text_lime font-semibold text-lg">
                        ₹{item.currentHighestBid + item.minimumBidIncrement}
                      </p>
                    </div>

                    {/* Input */}
                    <div>
                      <label className="text-sm text-gray-500 ">
                        Enter Bid Amount (per kg)
                      </label>

                      <input
                        type="text"
                        placeholder={`Minimum Amount ${item.currentHighestBid + item.minimumBidIncrement}`}
                        value={bidData.buyerAmount}
                        onChange={handleChange}
                        name="buyerAmount"
                        className="w-full mt-1 border rounded-lg p-2 text_black"
                      />

                      <p className="text-xs text-gray-500 mt-1">
                        Your bid must be at least ₹{item.minimumBidIncrement} higher than the current
                        highest bid.
                      </p>
                    </div>

                    {/* Escrow */}
                    <div className="flex items-center gap-2 text-sm text_black">
                      <input type="checkbox" />
                      Escrow Protection Enabled
                    </div>

                    {/* Buttons */}

                    <button
                      className="w-full bg-lime-500  text-white py-3 rounded-lg font-semibold  cursor-pointer  flex justify-center items-center hover:bg-lime-600"
                      onClick={() => setopenConfirm(true)}
                    >
                      Place Bid
                    </button>

                    {openConfirm && (
                      <ConfirmBidModal
                        open={openConfirm}
                        onClose={() => setopenConfirm(false)}
                        onConfirm={() => {
                          handleSubmit();
                          // setopenConfirm(false);
                        }}
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

                    <button className="w-full border border-green-600 text_lime py-3 rounded-lg font-semibold cursor-pointer">
                      Set Auto Bid
                    </button>

                    <div className="bg-yellow-50 text-yellow-700 text-sm p-3 rounded">
                      [Demo: Change Status] This is a demonstration interface.
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <div>no details available yet</div>
        )}
      </div>
    </div>
    </>
  );
}
