"use client";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  User,
  MapPin,
} from "lucide-react";
import { getApi } from "@/services/apiService";
import "@/app/globals.css";
import Image from "next/image";
import RaiseBidModal from "@/app/features/Raise Bid (My Biddings)/RaiseBid";


const FILTERS = ["all", "pending", "accepted", "rejected", "outbid"];

export default function MyBiddings() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [bidsList, setBidsList] = useState();
  const [raiseBidModal, setraiseBidModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    value: 0,
  });
  const [raiseBidModalData, setraiseBidModalData] = useState();

  //  API CALL (Replace with your backend)
  useEffect(() => {
    // fetch(`/api/bids?status=${activeFilter}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setBids(data.bids);
    //     setStats(data.stats);
    //   });
    async function fetchBidsList() {
      const fetchedList = await getApi(`/buyers/my-${activeFilter}-bids`);
      setBidsList(fetchedList.data);
    }
    fetchBidsList();
  }, [activeFilter]);
  console.log(bidsList);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-semibold  text-black">My Biddings</h1>
        <p className="text-black">Track all your bids and their status</p>
      </div>

      {/*  STATS  */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<TrendingUp />}
          value={stats.total}
          label="Total Bids"
        />
        <StatCard icon={<Clock />} value={stats.pending} label="Pending" />
        <StatCard
          icon={<CheckCircle />}
          value={stats.accepted}
          label="Accepted"
        />
        <StatCard
          icon={<TrendingUp />}
          value={`₹${stats.value}`}
          label="Total Bid Value"
          highlight
        />
      </div>

      {/*  FILTERS  */}
      <div className="flex gap-3 mb-6 flex-wrap bg-white p-2 border-gray-200 rounded-2xl border">
        {FILTERS.map((filter,index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-xl text-sm capitalize ${
              activeFilter === filter
                ? "back_lime text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/*  LIST  */}
      <div className="grid md:grid-cols-3 gap-6">
        {bidsList &&
          bidsList.length > 0 &&
          bidsList.map((bid,index) => (
            <BidCard
             setraiseBidModalData={setraiseBidModalData}
              setraiseBidModal={() => setraiseBidModal(true)}
              key={index}
              bid={bid}
            />
          ))}
      </div>
      {raiseBidModal && (
        <RaiseBidModal onClose={() => setraiseBidModal(false)} raiseBidModalData={raiseBidModalData} />
      )}
    </div>
  );
}

/*  STAT CARD  */
function StatCard({ icon, value, label, highlight }) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border ${
        highlight ? "border-lime-500" : "border-gray-200"
      } bg-white `}
    >
      <div className="p-3 bg-lime-100 rounded-lg text_lime">{icon}</div>
      <div>
        <p className="text-lg font-semibold text-black">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

/*  BID CARD  */
function BidCard({ bid, setraiseBidModal, setraiseBidModalData }) {
  const imageUrl = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border hover:shadow-2xl ">
      {/* IMAGE */}
      <div className="relative">
        <Image
          src={imageUrl(bid?.images[0]?.filePath)}
          alt={bid.cropName}
          width={30}
          height={50}
          className="h-50 w-full object-cover duration-300"
          unoptimized
        />

        {/* STATUS BADGE */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full ${
            bid?.bidStatus === "accepted"
              ? "bg-lime-100 text_lime"
              : bid?.bidStatus === "PENDING"
                ? "bg-yellow-100 text-yellow-600"
                : bid?.bidStatus === "rejected"
                  ? "bg-red-100 text-red-600"
                  : "bg-orange-100 text-orange-600"
          }`}
        >
          {bid?.bidStatus}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-2 text-black">
          {bid?.cropName}-{bid?.variety}
        </h2>
        <div className="flex justify-between">
          <div className="text-sm text-gray-500 mb-2">Quantity:</div>
          <div className="text-black">
            {" "}
            {bid?.quantity} {bid?.unit}
          </div>
        </div>
        <hr className="text-gray-300 w-full mt-1" />

        <div className=" mt-3">
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 mb-2">Your Bid:</div>
            <div className="text_lime font-semibold text-lg">
              {" "}
              ₹{bid?.bidAmount}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 mb-2">
              Price Per {bid?.unit}
            </div>
            <div className="text-gray-500 font-semibold ">
              {" "}
              ₹{bid?.pricePerKg}
            </div>
          </div>

          {/* <p className="text-xs text-gray-400">
            ₹{bid?.pricePerKg} / {bid?.unit}
          </p> */}
        </div>

        {/* CURRENT HIGHEST */}
        {bid.currentHighestBid && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
            <div className="flex items-center justify-between text-xs text-orange-700">
              <div> Current Highest:</div>
              <div> ₹{bid?.currentHighestBid}</div>
            </div>
          </div>
        )}

        {/* USER INFO */}
        <div className="text-sm text-gray-600 space-y-1 mt-3">
          <p className="flex items-center gap-2">
            <User size={14} /> {bid?.bidderName}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={14} /> {bid?.state}
          </p>
          {/* <p className="text-xs text-gray-400">{bid.time}</p> */}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-4">
          {bid?.bidStatus === "accepted" && (
            <>
              <button className="flex-1 back_lime text-white py-2 rounded-lg">
                Pay Now
              </button>
              <button className="flex-1 bg-red-500 text-white py-2 rounded-lg">
                Reject
              </button>
            </>
          )}

          {bid?.bidStatus === "PENDING" &&
          bid.bidAmount < bid?.currentHighestBid ? (
            <button
              className="w-full back_lime text-white py-2 rounded-lg"
              onClick={() => {
                setraiseBidModalData(
                  {
                    cropName: bid?.cropName,
                    variety: bid?.variety,
                    currentHighestBid: bid?.currentHighestBid,
                    yourBid: bid?.bidAmount,
                    listingId:bid?.listingId,
                    bidIncrement:bid?.minimumBidIncrement,
                  },
                );
                setraiseBidModal(true);
              }}
            >
              Raise Bid
            </button>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 items-center justify-center w-full  ">
              <div className=" text-green-700  w-fit">
                <div className="text-center flex items-center justify-center w-fit">
                  <p className="text-center text-xs flex justify-center items-center">
                    Your bid is highest
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
