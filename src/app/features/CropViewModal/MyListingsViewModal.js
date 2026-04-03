"use client";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import "@/app/globals.css";
import { getApi } from "@/services/apiService";
import { useSelector } from "react-redux";
import AcceptedBid from "../AcceptBid/AcceptedBid";

export default function MyListingsViewModal({
  onClose,
  selectedCrop,
  selectedList,
  closeViewModal,
}) {
  const [timeLeft, setTimeLeft] = useState("");
  const [bidList, setbidList] = useState([]);
  const [acceptBid, setacceptBid] = useState(false);
  const [buyerSelection, setbuyerSelection] = useState();
  const [singleBidData, setsingleBidData] = useState();
  const [refreshKey,setrefreshKey]=useState(0);
//   const[isAccepted,setisAccepted]=useState(false);
  // const cropData = useMemo(() => (crop ? [crop] : []), [crop]);
  const getImageUrls = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;

  console.log("this is selecetd list", selectedList);
  const formatCurrency = (value) => {
    if (value == null || value === "") return "-";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    async function getBidHistory() {
      if (selectedList.saleType === "AUCTION") {
        const bidHistory = await getApi(
          `/listings/${selectedList.listingId}/top-5`,
        );
        setsingleBidData([bidHistory.data]);
      } else {
        setsingleBidData([selectedList]);
      }
    }
    getBidHistory();
   
  }, [refreshKey]);
  console.log(singleBidData);
let isAccepted;
// console.log("this is your things",(singleBidData[0] && singleBidData[0].top5Bids && singleBidData[0].top5Bids.length > 0));
if(singleBidData && singleBidData.length > 0 && singleBidData[0].top5Bids && singleBidData[0].top5Bids.length > 0){
    console.log("hellooo");
  isAccepted= singleBidData[0].top5Bids.some((e)=>e.bidStatus==="ACCEPTED")
 console.log("This is accepted",isAccepted);
}
//   useEffect(()=>{

//   })





  const parseTimeValue = (time) => {
    if (!time) return null;
    if (Array.isArray(time) && time.length >= 5) {
      return new Date(
        time[0],
        time[1] - 1,
        time[2],
        time[3],
        time[4],
        time[5] || 0,
      );
    }
    const date = new Date(time);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const formatTimeAgo = (time) => {
    const date = parseTimeValue(time);
    if (!date) return "-";

    const diffMs = Date.now() - date.getTime();
    if (diffMs < 0) return "Just now";

    const seconds = Math.floor(diffMs / 1000);
    if (seconds < 60) return `${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // const getBidTimestamp = (bid) => {
  //   if (!bid) return null;
  //   return bid.bidTime || bid.createdAt || bid.created_at || bid.timestamp || null;
  // };

  //   (state)=>state.crop.data.product

  //   const fetch=async()=>{
  //     const api=await fetch();
  //     const response=await api.json();
  //     setcropData(response);

  //  if(result){
  //     console.log(result);

  //  }
  // }

  //   useEffect(() => {
  //     async function fetchListData() {
  //       if (crop.saleType === "AUCTION") {
  //         const result = await getApi(`/listings/${listingId}/top-5`);
  //         setsingleBidData([result.data]);
  //         console.log("this is bid list result", result.data);
  //         setbidList(result.data.top5Bids);
  //       } else {
  //         const result = await getApi(`/listings/${listingId}/fixed`);
  //         setsingleBidData([result.data]);
  //       }
  //     }
  //     fetchListData();
  //     console.log("hello");
  //   }, [crop]);
  //   console.log("this is single bid data", singleBidData);

  //  const result=await getApi("/listings/top-5");
  // ⏱ timer
  useEffect(() => {
    if (!singleBidData || !singleBidData[0]?.auctionEndTime) return;
    console.log("date", singleBidData[0].auctionEndTime);
    const interval = setInterval(() => {
      const now = new Date();
      console.log("today date", now);
      const end = new Date(
        singleBidData[0].auctionEndTime[0],
        singleBidData[0].auctionEndTime[1] - 1, // months are 0-based
        singleBidData[0].auctionEndTime[2],
        singleBidData[0].auctionEndTime[3],
        singleBidData[0].auctionEndTime[4],
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
  }, [singleBidData]);

  // useEffect(() => {
  //   const listingIds=cropData[0]?.listingId;
  //   console.log("ids",listingIds);
  //   async function getBidList() {
  //     try {
  //       const response = await getApi(`/buyers/auctions/${listingIds}/bids`);
  //       // assume api returns { data: [...] }
  //       setBidList(response?.data || []);
  //     } catch (err) {
  //       console.error("failed to load bids", err);
  //       setBidList([]);
  //     }
  //   }
  //   getBidList();
  // }, []);

  console.log("bid list", bidList);

  //   if (!selectedList) return null;

  return (
    <div className="fixed  z-50 inset-0 bg-black/20  flex justify-center items-center p-4">
      {singleBidData &&
        singleBidData.length > 0 &&
        singleBidData?.map((crop, index) => {
          return (
            <div
              className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl   h-fit"
              key={index}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center p-6 border-b ">
                <div>
                  <h2 className="text-2xl font-bold text_black">
                    {crop.cropName} - {crop.variety}
                  </h2>

                  {crop.saleType === "AUCTION" ? (
                    <p className="text-sm text-gray-500">
                      Posted on {crop.postedOn[2]}-{crop.postedOn[1]}-
                      {crop.postedOn[0]}
                    </p>
                  ) : (
                    <p className="text_black text-sm">
                      {crop.createdAt[2]}-{crop.createdAt[1]}-
                      {crop.createdAt[0]}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="bg-green-100 Back_color px-3 py-1 rounded-full text-sm">
                    {crop.status}
                  </span>
                  <button
                    onClick={closeViewModal}
                    className="text-xl text_black cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* rest of modal unchanged... */}
              {/* TIMER */}
              {crop.saleType === "AUCTION" && (
                <div className="bg-orange-50 text-center py-4 border-b">
                  <p className="text-sm text-gray-500">AUCTION ENDS IN</p>
                  <h3 className="text-3xl font-bold text-orange-600">
                    {timeLeft ? timeLeft : 0}
                  </h3>
                </div>
              )}
              <div className="overflow-y-scroll h-95">
                {/* IMAGE + MANAGE */}
                <div className="grid md:grid-cols-3 gap-6 p-6">
                  {/* LEFT */}
                  <div className="md:col-span-2">
                    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                      <Image
                        src={`${getImageUrls(crop?.images[0].filePath)}`}
                        alt="crop"
                        className="object-cover"
                        height={300}
                        width={800}
                        unoptimized
                      />
                    </div>

                    {/* stats */}
                    {/* <div className="flex gap-6 mt-4 text-gray-600">
                 <p>👁 {crop.views} Views</p>
                 <p>🔨 {crop.bids} Bids</p>
                 <p>💬 {crop.messages} Msg</p>
               </div> */}
                  </div>

                  {/* RIGHT PANEL */}
                  <div className="bg-gray-50 p-5 rounded-xl h-fit">
                    <h4 className="font-semibold mb-4 text_black">
                      Manage Listing
                    </h4>

                    <button className="w-full bg-green-600 text-white py-2 rounded-lg mb-3">
                      ✔ Mark as Sold
                    </button>
                    {crop.saleType === "AUCTION" && (
                      <button className="w-full border py-2 rounded-lg mb-3 text_black">
                        ⏱ Extend Auction Time
                      </button>
                    )}

                    <button className="w-full border border-red-400 text-red-500 py-2 rounded-lg">
                      🗑 Delete Listing
                    </button>
                  </div>
                </div>

                {/* PRODUCT DETAILS */}

                {/* <section title="Product Details">
             <div className="grid md:grid-cols-2 gap-6 text-gray-700">
               <p label="Crop Name" value={crop.name}/>
               <p label="Variety" value={crop.variety} >sss</p>
               <p label="Grade" value={crop.grade} />
               <p label="Harvest Date" value={crop.harvestDate} />
               <p label="Total Quantity" value={crop.quantity} />
               <p label="Remaining" value={crop.remaining} />
               <p label="Storage" value={crop.storage} />
               <p label="Location" value={crop.location} />
             </div>
           </section> */}
                <section className="w-[95%] h-98 shadow-lg  border-2 border-gray-300 mx-auto rounded-xl ">
                  <div className="px-5 py-5">
                    <div className="text_black text-sm">Product Details</div>
                    <div className="mt-3 gap-4 grid grid-cols-2">
                      <div>
                        <p className="text_gray text-sm">crop Name</p>
                        <p className="text_black text-sm">{crop.cropName}</p>
                      </div>
                      <div>
                        <p className="text_gray text-sm">Variety</p>
                        <p className="text_black text-sm">{crop.variety}</p>
                      </div>
                      <div>
                        <p className="text_gray text-sm">Grade</p>
                        <p className="text_black text-sm">{crop.grade}</p>
                      </div>
                      <div>
                        <p className="text_gray text-sm">Harvest Date</p>
                        <p className="text_black text-sm">
                          {crop.harvestDate[2]}-{crop.harvestDate[1]}-
                          {crop.harvestDate[0]}
                        </p>
                      </div>
                      <div>
                        <p className="text_gray text-sm">Total Quantity</p>
                        <p className="text_black text-sm">
                          {crop.totalQuantity} {crop.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text_gray text-sm">Quantity Remaining</p>
                        <p className="text_black text-sm">
                          {crop.remainingQuantity} {crop.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text_gray text-sm">Packaging</p>
                        <p className="text_black text-sm">{crop.packaging}</p>
                      </div>
                      <div>
                        <p className="text_gray text-sm">Storage</p>
                        <p className="text_black text-sm">{crop.storage}</p>
                      </div>
                    </div>

                    <hr className=" mx-auto mt-4" />
                    <div className="mt-2">
                      <div>
                        <p className="text_gray text-sm">Location</p>
                        <p className="text_black text-sm">
                          {crop.district}, {crop.state}
                        </p>
                      </div>
                      <div className="mt-3">
                        <p className="text_gray text-sm">Pickup Method</p>
                        <p className="text_black text-sm">
                          {crop.pickupMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* PRICING */}

                <section className="w-[95%] h-fit   mt-5 shadow-lg  border-2 border-gray-300 mx-auto rounded-xl ">
                  <div className="px-5 py-5">
                    <div className="text_black text-sm">
                      Pricing & Sale Details
                    </div>
                    {crop.saleType === "AUCTION" ? (
                      <>
                        <div className="flex gap-5 mt-2">
                          <div>
                            <span className="bg-green-100 Back_color px-3 py-1 rounded-full text-sm">
                              {crop.saleType}
                            </span>
                          </div>
                          <div></div>
                        </div>
                        <div className="mt-3 gap-4 grid grid-cols-2">
                          <div>
                            <p className="text_gray text-sm">
                              Starting Bid Price
                            </p>
                            <p className="text_black text-sm">
                              ₹{crop.totalBasePrice}
                            </p>
                          </div>
                          <div>
                            <p className="text_gray text-sm">
                              Price per Quintal
                            </p>
                            <p className="text_black text-sm">
                              ₹{crop.pricePerKg}
                            </p>
                          </div>
                          <div>
                            <p className="text_gray text-sm">
                              Minimum Bid Increment
                            </p>
                            <p className="text_black text-sm">
                              ₹{crop.minimumBidIncrement}
                            </p>
                          </div>
                          <div>
                            <p className="text_gray text-sm">
                              Current Highest Bid
                            </p>
                            <p className="text_black text-sm">
                              ₹
                              {crop.currentHighestBid
                                ? crop.currentHighestBid
                                : 0}
                              {/* +₹{crop.minimumBidIncrement} from base */}
                            </p>
                          </div>
                          <div>
                            <p className="text_gray text-sm">
                              Total Bids Received
                            </p>
                            <p className="text_black text-sm">
                              {crop.activeBidders} Bids
                            </p>
                          </div>
                          <hr className=" mx-auto mt-4" />
                        </div>

                        <hr className=" mx-auto mt-4" />
                        <div className="grid grid-cols-2 gap-5 mt-3">
                          <div className="">
                            <p className="text_gray text-sm">
                              Auction Duration
                            </p>
                            <p className="text_black text-sm">48 Hours</p>
                          </div>
                          {crop.saleType === "AUCTION" ? (
                            <div className="">
                              <p className="text_gray text-sm">Started On</p>
                              <p className="text_black text-sm">
                                {crop.postedOn[2]}-{crop.postedOn[1]}-
                                {crop.postedOn[0]}
                              </p>
                            </div>
                          ) : (
                            <div className="">
                              <p className="text_gray text-sm">Started On</p>
                              <p className="text_black text-sm">
                                {crop.createdAt[2]}-{crop.createdAt[1]}-
                                {crop.createdAt[0]}
                              </p>
                            </div>
                          )}

                          <div>
                            <p className="text_gray text-sm">Ends On</p>
                            <p className="text_black text-sm">
                              {crop.auctionEndTime[2]}-{crop.auctionEndTime[1]}-
                              {crop.auctionEndTime[0]}
                            </p>
                          </div>
                          <div className="">
                            <p className="text_gray text-sm">Time Remaining</p>
                            <p className="text_black text-sm">
                              {" "}
                              {timeLeft ? timeLeft : 0}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        <div className="flex gap-5 mt-2">
                          <div>
                            <span className="bg-green-100 Back_color px-3 py-1 rounded-full text-sm">
                              {crop.saleType}
                            </span>
                          </div>
                          <div>
                            <span className="bg-green-100 Back_color px-3 py-1 rounded-full text-sm">
                              {crop.purchaseType}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 gap-4 grid grid-cols-2">
                          <div>
                            <p className="text_gray text-sm">
                              Fixed Price (Total)
                            </p>
                            <p className="text_black text-xl font-semibold">
                              ₹{crop.fixedPrice}
                            </p>
                          </div>
                          <div>
                            <p className="text_gray text-sm">
                              Price per Quintal
                            </p>
                            <p className="text_black text-lg">
                              ₹{crop.pricePerQuintal}
                            </p>
                          </div>
                           {crop.saleType === "AUCTION" ? (
                            <div className="">
                              <p className="text_gray text-sm">Started On</p>
                              <p className="text_black text-sm">
                                {crop.postedOn[2]}-{crop.postedOn[1]}-
                                {crop.postedOn[0]}
                              </p>
                            </div>
                          ) : (
                            <div className="">
                              <p className="text_gray text-sm">Started On</p>
                              <p className="text_black text-sm">
                                {crop.createdAt[2]}-{crop.createdAt[1]}-
                                {crop.createdAt[0]}
                              </p>
                            </div>
                          )}
                          <hr className=" mx-auto mt-4" />
                        </div>

                        {crop.purchaseType === "PARTIAL_ORDER_ALLOWS" && (
                          <>
                            <hr className=" mx-auto mt-4" />
                            <div>
                              <div className="flex flex-col mt-5">
                                {" "}
                                <p className="text-black">
                                  Partial Orders Details
                                </p>{" "}
                                <p className="text-sm text-gray-400 mt-3">
                                  Buyers can purchase minimum order quantity
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-5 mt-3">
                              <div className="">
                                <p className="text_gray text-sm">
                                  Minimum Order Quantity
                                </p>
                                <p className="text_black text-sm">
                                  {crop.minimumOrderQuantity} {crop.unit}
                                </p>
                              </div>
                              <div className="">
                                <p className="text_gray text-sm">
                                  Price per {crop.unit} (for MOQ)
                                </p>
                                <p className="text_black text-sm">
                                  ₹{crop.pricePerKg}
                                </p>
                              </div>

                              <div>
                                <p className="text_gray text-sm">
                                  Total for MOQ
                                </p>
                                <p className="text_lime text-sm">
                                  ₹{crop.quantity * crop.pricePerKg}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </section>

                {/* DESCRIPTION */}
                <section className="w-[95%] shadow-lg  border-2 border-gray-300 mx-auto rounded-xl mt-5 mb-5">
                  <div className="px-5 py-5">
                    <p className="text_black">Description</p>
                    <p className="text-gray-600 mt-2 text_gray">
                      {crop.description}
                    </p>
                  </div>
                </section>
                {/* BIDS */}
                {crop.saleType === "AUCTION" && (
                  <section className="w-[96%] border border-gray-200 bg-white mx-auto mt-5 rounded-2xl shadow-sm mb-5">
                    <div className="w-[95%] mx-auto py-5">
                      <div className="text-2xl font-semibold text-black">
                        Bid History - Top 5 Bids
                      </div>

                      {(() => {
                        const bids = bidList?.length
                          ? bidList
                          : crop.top5Bids || [];
                        const hasBids = bids && bids.length > 0;

                        if (!hasBids) {
                          return (
                            <div className="flex items-center justify-center p-5">
                              <div className="text-black text-xl">
                                There are no bids currently on this listing yet
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div className="mt-5 overflow-x-auto overflow-hidden rounded-t-2xl  border-2 border-black/10 rounded-xl">
                            <table className="min-w-full text-left text-sm rounded-2xl ">
                              <thead className="bg-lime-600 text-white rounded-t-3xl">
                                <tr>
                                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                                    Bidder
                                  </th>
                                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                                    Amount
                                  </th>
                                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                                    Time
                                  </th>
                                  <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                                    Action
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {bids.map((bid, i) => {
                                  const isLeading = i === 0;
                                  // const bidTime = getBidTimestamp(bid);

                                  return (
                                    <tr
                                      key={bid.id ?? i}
                                      className={
                                        "border-b " +
                                        (i % 2 === 0
                                          ? "bg-white"
                                          : "bg-gray-50")
                                      }
                                    >
                                      <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium text-gray-900">
                                            {bid.buyerName}
                                          </span>
                                          {isLeading && (
                                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                                              Leading
                                            </span>
                                          )}
                                        </div>
                                      </td>

                                      <td className="px-4 py-3 font-semibold text_lime">
                                        {formatCurrency(bid.buyerAmount)}
                                      </td>

                                      <td className="px-4 py-3 text-gray-600">
                                        {/* {formatTimeAgo(bidTime)} */}
                                      </td>

                                      <td className="px-4 py-3">
                                        {!isAccepted && (
                                        <div className="flex flex-wrap gap-2">
                                          <button
                                            className="rounded-lg  px-3 py-1 text-sm font-semibold text-white back_lime  cursor-pointer0"
                                            onClick={() => {
                                              setbuyerSelection({
                                                buyer: bid.buyerName,
                                                bid_amount: bid.buyerAmount,
                                                cropName:
                                                  singleBidData[0].cropName,
                                                variety:
                                                  singleBidData[0].variety,
                                                quantity:
                                                  singleBidData[0].quantity,
                                                unit: singleBidData[0].unit,
                                                bidId: bid.bidId,
                                              });
                                              setacceptBid(true);
                                            }}
                                          >
                                            Accept
                                          </button>
                                          <button className="rounded-lg border text_lime px-3 py-1 text-sm font-semibold  hover:back_lime hover:text-white cursor-pointer">
                                            Message
                                          </button>
                                        </div>
                                 )}
                                 {
                                    bid.bidStatus==="ACCEPTED" && <div className="text-black">Accepted</div>

                                 }
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        );
                      })()}
                    </div>
                  </section>
                )}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between px-6 py-4 border-t-2 border-gray-200 ">
                <button className="border px-5 py-2 rounded-lg text_black">
                  View Public Preview
                </button>

                <button
                  onClick={closeViewModal}
                  className="border px-5 py-2 rounded-lg text_black"
                >
                  Close
                </button>
              </div>
            </div>
          );
        })}
      {acceptBid && (
        <AcceptedBid
          buyerSelection={buyerSelection}
          onClose={() => setacceptBid(false)}
          setrefreshKey={()=>setrefreshKey(refreshKey+1)}
        />
      )}
    </div>
  );
}
