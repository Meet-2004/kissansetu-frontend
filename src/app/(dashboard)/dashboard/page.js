// "use client"
// import React from 'react'
// import {useState} from "react"
// import FormLayout from './addCrop/FormLayout';
// import AddCropModal from './addCrop/AddCropModal';

// const page = (setlistCrop,listCrop) => {

//   const [openCropList,setopenCropList] = useState(false);
//    console.log(openCropList)
//   console.log("hello");

//   return (

//    <section className='w-full  min-h-screen max-h-9xl  bg-amber-100'>
//     <div className='text-black text-center'>Welcome to dashboard</div>
//     Crop liststing section
//     <div className='mt-30  text-center flex justify-center items-center'><button className='text-center w-40 h-10  bg-black text-white' onClick={()=>setopenCropList(true)}>List new crop</button></div>

//       <div className="flex justify-center items-center ">
//        {openCropList && <AddCropModal  />}
//       </div>
//    </section>

//   )
// }

// export default page

"use client";

import Image from "next/image";
import Bids_Recieves from "@/SVG/Dashboard/Bid_recieves.svg";
import Approval_pending from "@/SVG/Dashboard/Approval_Pending.svg";
import Active_Listing from "@/SVG/Dashboard/Active_Listing.svg";
import Total_Revenue from "@/SVG/Dashboard/Total_Revenue.svg";
import { useState, useEffect } from "react";
import "@/app/globals.css";
import ActiveListingsSection from "@/app/features/cropListings/ActiveListingSection";
import Bidcard from "@/app/features/Bid/Bidcard";
import BuyerFilter from "@/app/features/Buyer Filter/BuyerFilter";
import RequirementBanner from "@/app/features/Buyer Requirement/RequirementsBanner";
import BuyerRequirementSection from "@/app/features/Buyer Requirement/BuyerRequirementSection";
import MarketInsights from "@/app/features/market insights/MarketInsights";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAuctions, invalidateAuctions } from "@/app/Store/slices/bidSlice";

export default function SellerTopSection() {
  const [activeTab, setActiveTab] = useState("SELL");
  const [openRequirement, setopenRequirement] = useState(false);
  const [searchList, setSearchList] = useState("");
  const [buyerActiveTab, setBuyerActiveTab] = useState("Auctions");

  console.log("this is buyer active tab", buyerActiveTab);

  useEffect(() => {
    console.log("this is search", buyerActiveTab);
  }, [buyerActiveTab]);

  useEffect(() => {
    console.log("this is search", searchList);
  }, [searchList]);

  useEffect(()=>{
    setSearchList("");
  },[buyerActiveTab])

  const Boxes = [
    {
      id: 1,
      title: "Active Listings",
      value: "12",
      src: Active_Listing,
    },
    {
      id: 2,
      title: "Total Bids Received",
      value: "47",
      src: Bids_Recieves,
    },
    {
      id: 3,
      title: "Pending Approvals",
      value: "5",
      src: Approval_pending,
    },
    {
      id: 4,
      title: "Total Revenue",
      value: "₹2.4L",
      src: Total_Revenue,
    },
  ];

  const Style = {
    backgroundColor: "#64B900",
    // color:"#FFFFFF",
    // boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.1)"
  };

  //   return (
  //     <div className="space-y-6 mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6  sm:space-y-6 ">
  //       {/* SELL BUY TOGGLE */}
  //       <div className="flex justify-center max-w-7xl  ">
  //         <div className=" bg-white p-2 rounded-xl shadow-md flex gap-2 ">
  //           <button
  //             className="  px-8 py-3  font-medium flex items-center gap-2 rounded-lg cursor-pointer"
  //             style={activeTab==="SELL" ? Style : {color:"black",backgroundColor:"white"} }
  //             onClick={() => setActiveTab("SELL")}
  //           >
  //             {activeTab==="SELL" ?<Image src={Sell} alt="seller image" ></Image>  : <Image src={Sell_black} alt="seller image" ></Image> } SELL
  //           </button>

  //           <button
  //             className="px-8 py-3 rounded-lg font-medium  flex items-center gap-2 cursor-pointer"
  //             onClick={() => setActiveTab("BUYER")}
  //              style={activeTab==="BUYER" ? Style : {color:"black",backgroundColor:"white"} }
  //           >
  //             <Image src={Buyer} alt="Buyer Image" ></Image> BUY
  //           </button>
  //         </div>
  //       </div>

  //     {/* Seller side */}

  //     { activeTab==="SELL" &&
  //     <>
  //       <div>
  //         {/* STATS CARDS */}
  //         <div className="md:grid  gap-6  min-w-sm max-w-280 mx-auto justify-center items-center grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4   ">
  //           {/* Card 1 */}
  //           {Boxes.map((box, i) => {
  //             return (
  //               <div
  //                 className="bg-white w-full rounded-xl shadow-sm p-5 flex justify-between items-center gap-2 mx-auto cursor-pointer  md:w-63 md:h-25 md:flex  hover:shadow-2xl "
  //                 key={box.id}
  //               >
  //                 <div>
  //                   <p className="text-gray-500 text-sm">{box.title}</p>
  //                   <h2 className="text-2xl font-bold mt-1 text-black">
  //                     {box.value}
  //                   </h2>
  //                 </div>

  //                 <div className="bg-lime-100 p-3 rounded-lg">
  //                   <Image src={box.src} alt={box.title}></Image>
  //                 </div>
  //               </div>
  //             );
  //           })}

  //         </div>
  //       </div>
  //     <ActiveListingsSection />
  //     {/* <ListingCard /> */}
  //     </>
  // }
  // {
  //   activeTab ==="BUYER" &&(
  //     <>
  //        <Bidcard />
  //     </>
  //   )
  // }

  //       {/* <div className="float-right min-w-65 max-w-150">
  //         <div>
  //           <button>
  //             <div className="flex gap-2 justify-center items-center bg-lime-500 w-40 h-10 rounded-lg text-white mx-auto ">
  //               <div>
  //                 <Image src={Plus} alt="Add new Listing" ></Image>
  //               </div>
  //               <div>
  //                 <p>
  //                   Add new Listing
  //                 </p>
  //               </div>
  //             </div>
  //           </button>
  //         </div>
  //       </div> */}
  //     </div>
  //   );
  return (
    <div className="space-y-6 mt-5 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* SELL BUY TOGGLE */}
      <div className="flex justify-center">
        <div className="bg-white p-1   sm:p-2 rounded-xl shadow-md flex gap-1 sm:gap-2 flex-wrap">
          {/* SELL BUTTON */}
          <button
            className={`px-4 md:px-0 lg:px-8 py-2 md:py-2 font-medium flex items-center gap-2 rounded-lg cursor-pointer transition
          ${
            activeTab === "SELL"
              ? "bg-[#64B900] text-white"
              : "text-black bg-white"
          }`}
            onClick={() => setActiveTab("SELL")}
          >
            {/* {activeTab === "SELL"
            ? <Image src={Sell} alt="seller image" width={20} height={20} />
            : <Image src={Sell_black} alt="seller image" width={20} height={20} />
          } */}

            <span className="text-sm sm:text-base">SELL</span>
          </button>

          {/* BUY BUTTON */}
          <button
            className={`px-4 md:px-0 lg:px-8 py-2 md:py-2 font-medium flex items-center gap-2 rounded-lg cursor-pointer transition
          ${
            activeTab === "BUYER"
              ? "bg-[#64B900] text-white"
              : "text-black bg-white"
          }`}
            onClick={() => setActiveTab("BUYER")}
          >
            {/* {activeTab === "BUYER"
            ? <Image src={Buyer_White} alt="seller image" width={20} height={20} />
            : <Image src={Buyer}   alt="seller image" width={20} height={20} />
          } */}
            {/* <Image src={Buyer} alt="Buyer Image" width={20} height={20} /> */}
            <span className="text-sm sm:text-base">BUY</span>
          </button>
        </div>
      </div>

      {/* SELLER SIDE */}
      {activeTab === "SELL" && (
        <>
          {/* STATS CARDS */}
          <div
            className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4 sm:gap-6
        "
          >
            {Boxes.map((box) => (
              <div
                key={box.id}
                className="
                bg-white
                rounded-xl
                shadow-sm
                p-4 sm:p-5
                flex
                justify-between
                items-center
                cursor-pointer
                hover:shadow-xl
                transition
              "
              >
                <div>
                  <p className="text-gray-500 text-sm">{box.title}</p>

                  <h2 className="text-xl sm:text-2xl font-bold mt-1 text-black">
                    {box.value}
                  </h2>
                </div>

                <div className="bg-lime-100 p-2 sm:p-3 rounded-lg">
                  <Image src={box.src} alt={box.title} width={24} height={24} />
                </div>
              </div>
            ))}
          </div>

          {/* ACTIVE LISTINGS */}
          <ActiveListingsSection />
          <BuyerRequirementSection />
        </>
      )}

      {/* BUYER SIDE */}
      {activeTab === "BUYER" && (
        <>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8  mb-5">
            <MarketInsights />
            <RequirementBanner onClick={() => setopenRequirement(true)} />
            <BuyerFilter
              setSearchList={setSearchList}
              searchList={searchList}
            />

            <Bidcard
              searchList={searchList}
              openRequirement={openRequirement}
              closeRequirement={() => setopenRequirement(false)}
              setBuyerActiveTab={setBuyerActiveTab}
              buyerActiveTab={buyerActiveTab}
            />
          </div>
        </>
      )}
      {/* STYLE */}
      <style>{`
        .marquee {
          animation: scroll 20s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
