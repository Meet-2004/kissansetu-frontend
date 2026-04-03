"use client";
import Image from "next/image";
import {
  Star,
  MapPin,
  Package,
  Gavel,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import dron from "@/assets/dron.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuctions, invalidateAuctions } from "@/app/Store/slices/bidSlice";
import { fetchFixed, invalidatefixed } from "@/app/Store/slices/fixedSlice";
import Placebid from "../placeBid/Placebid";
import "@/app/globals.css";
import FixedCards from "./FixedCards";
import { headFont } from "@/app/layout";
import { useRef } from "react";
import RequirementModal from "@/app/features/Buyer Requirement/RequirementModal";



export default function CropCard({ crop, onBid, onView,openRequirement,closeRequirement }) {
  // const onBidClick = () => {
  //   console.log("Application successfull for bid");
  // };
  const [bidPlaced, setbidPlaced] = useState(false);
  const [selectedList, setselectedList] = useState();
  const [ActiveTab, setActiveTab] = useState("Auctions");
    const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
 
  // const [loading, setLoading] = useState(false);

  console.log(ActiveTab);

  const dispatch = useDispatch();
  const { auctions, loading, error,totalPages,page } = useSelector((state) => state.bid);

  console.log("this is auctions data",auctions);



  const pageRef = useRef(page);

useEffect(() => {
  pageRef.current = page;
}, [page]);
console.log("this is page ref",pageRef.current);

useEffect(() => {
   dispatch(fetchAuctions(pageRef.current))
  const interval = setInterval(() => {
    dispatch(fetchAuctions(pageRef.current)); // always latest page
  }, 30000);

  return () => clearInterval(interval);
}, [dispatch]);

  const imageUrl = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;

  console.log("this is total pages",totalPages);

  // Function to manually refresh data (can be called after bid placement)
  const refreshAuctions = () => {

    if(ActiveTab==="Auctions"){
    dispatch(invalidateAuctions());
    dispatch(fetchAuctions());
    }
    else{
      dispatch(invalidatefixed());
    dispatch(fetchFixed());
    }
  };

  const handleNextPage =()=>{
    console.log("this is page",page);
    console.log("this is total page",totalPages);
    if (page < totalPages - 1) {
    dispatch(fetchAuctions(page + 1));
    pageRef.current=page+1;

  }
  }

  const handlePreviousPage =()=>{
  if (page > 0) {
    dispatch(fetchAuctions(page - 1));
     pageRef.current=page-1;
  }
}



  return (
  <section
    className={`mx-auto w-full max-w-7xl ${
      bidPlaced ? "fixed" : ""
    } mb-5`}
  >
    {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      {/* TITLE + TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">

        <p className={`text-black text-xl sm:text-2xl md:text-3xl ${headFont.className}`}> 
          Marketplace Grid
        </p>

      </div>
        <div className="bg-white p-1 rounded-xl shadow-md flex gap-1 w-fit justify-center items-center">

          <button
            className={`px-4 md: py-2 md: font-medium rounded-lg ${
              ActiveTab === "Auctions"
                ? "bg-[#64B900] text-white"
                : "text-black bg-white"
            }`}
            onClick={() => setActiveTab("Auctions")}
          >
            Auctions
          </button>

          <button
            className={`px-4 md: py-2 md: font-medium rounded-lg ${
              ActiveTab === "Fixed"
                ? "bg-[#64B900] text-white"
                : "text-black bg-white"
            }`}
            onClick={() => setActiveTab("Fixed")}
          >
            Fixed
          </button>

        </div>

      {/* REFRESH BUTTON */}
      <button
        onClick={refreshAuctions}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 back_lime text-white rounded-lg hover:back_lime disabled:opacity-50 disabled:cursor-not-allowed w-fit"
      >
        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        Refresh
      </button>

    </div>


    {/* GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

      {loading ? (
        <div className="col-span-full text-center py-8">
          Loading auctions...
        </div>
      ) : error ? (
        <div className="col-span-full text-center py-8 text-red-500">
          Error loading auctions: {error}
        </div>
      ) : auctions &&
        ActiveTab === "Auctions" &&
        Array.isArray(auctions?.content) &&
        auctions?.content.length > 0 ? (

        auctions.content.map((item,index) => (
          <div
            key={item?.id || index }
            className="bg-white rounded-3xl shadow-md overflow-hidden border"
          >

            {/* IMAGE */}
            <div className="relative">

              <Image
                src={imageUrl(item?.images[0]?.filePath) }
                alt={dron}
                width={400}
                height={250}
                className="w-full h-[200px] sm:h-[220px] object-cover"
                unoptimized
              />

              <span className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full text-sm shadow text_lime">
                {item.saleType}
              </span>

            </div>


            {/* BODY */}
            <div className="p-5">

              {/* TITLE */}
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {item.cropName}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {item.variety}
                  </p>
                </div>

                <div className="text-right">

                  <div className="flex gap-1 items-center">
                    <p className="text-gray-800 text-sm font-medium">
                      dnd
                    </p>

                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                      <Star size={12} fill="currentColor" />5
                    </div>
                  </div>

                  <p className="text-xs text-gray-400">
                    SELLER
                  </p>

                </div>

              </div>


              {/* PRICE BOX */}
              <div className="flex gap-4 mt-5 w-full">

                <div className="bg-gray-100 px-5 py-4 rounded-2xl flex-1">
                  <p className="text-xs text-gray-500 mb-1">
                    BASE PRICE
                  </p>

                  <p className="font-semibold text-sm text_black">
                    ₹{item.pricePerKg}/{item.unit}
                  </p>
                </div>

                <div className="bg-[#64B90020] border border-[#64B90040] rounded-2xl px-5 py-4 flex-1">
                  <p className="text-xs text_lime mb-1">
                    CURRENT BID
                  </p>

                  <p className="font-semibold text-sm text_lime">
                    ₹{item.currentHighestBid}
                  </p>
                </div>

              </div>


              {/* QTY + LOCATION */}
              <div className="flex justify-between mt-5 text-gray-600 text-sm">

                <div className="flex items-center gap-2">
                  <Package size={18} />
                  {item.quantity} {item.unit}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  {item.district}, {item.state}
                </div>

              </div>


              {/* BUTTON */}
              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => {
                    setbidPlaced(true);
                    setselectedList(item);
                  }}
                  className="flex-1 back_lime hover:back_lime text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium"
                >
                  <Gavel size={18} />
                  Place Bid
                </button>

              </div>

            </div>

          </div>
        ))
      ) : (
        <div>
          
        </div>
      )}
    </div>
    


    {/* FIXED TAB */}
    {ActiveTab === "Fixed" && <FixedCards ActiveTab={ActiveTab} />}

     {/* PAGINATION */}
     { ActiveTab === "Auctions" &&  
      <div className="flex flex-wrap justify-center mt-8 gap-2">
        <button
          onClick={handlePreviousPage}
          className="px-3 py-2 border rounded text-sm text-black"
        >
          Previous
        </button>

        {Array.from({ length: auctions?.totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => {dispatch(fetchAuctions(i)); pageRef.current=i;}}
            className={`px-3 py-2 rounded text-sm text-black ${
              i === pageRef.current ? "back_lime text-white" : "border"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          className="px-3 py-2 border rounded text-sm text-black"
        >
          Next
        </button>
      </div>
}


    {/* PLACE BID MODAL */}
    {bidPlaced && (
      <Placebid
        Onclose={() => setbidPlaced(false)}
        selectedList={selectedList}
      />
    )}

    {openRequirement && <RequirementModal closeRequirement={closeRequirement}  />

    }

  </section>
  );
}


