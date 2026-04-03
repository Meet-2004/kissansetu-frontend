"use client";
import Image from "next/image";
import drone from "@/assets/dron.jpg";
import { useState, useEffect } from "react";
import CropViewModal from "../CropViewModal/cropViewModal";
import { useSelector } from "react-redux";
import { getApi } from "@/services/apiService";
import "@/app/globals.css";
import Right_Mark from "@/SVG/Dashboard/Right_Mark.svg";
import AcceptedBid from "../AcceptBid/AcceptedBid";

import { MapPin, Package } from "lucide-react";

export default function ListingCard({ refreshKey }) {
  const data = useSelector((state) => state.auth);
  const getImageUrl = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  const [apiRes, setapiRes] = useState();
  const [image, setimage] = useState();
  const [acceptBid, setacceptBid] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [buyerSelection, setbuyerSelection] = useState();
  //  console.log("data",data);

  console.log("this is refresh key", refreshKey);
  useEffect(() => {
    async function fetchData() {
      const result = await getApi(`/listings/my-active-summary`);
      console.log("this is result", result);
      setapiRes(result);
    }
    fetchData();
  }, [refreshKey]);

  return (
    <section className="mx-auto mb-10 w-full">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {apiRes?.data?.content.map((item, index) => {
          return (
            <div
              className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl"
              key={index}
            >
              {Array.isArray(item?.images) && item.images.length > 0 ? (
                <div className="relative h-[180px] sm:h-[200px]">
                  <Image
                    src={`${getImageUrl(item.images[0].filePath)}`}
                    alt="crop"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="relative h-[180px] sm:h-[200px]">
                  <Image
                    src={drone}
                    alt="crop"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col space-y-3 p-4 sm:p-5">
                <h3 className="text-lg font-semibold break-words text_black">
                  {item.cropName}-{item.variety}
                </h3>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-400 text_black">
                    {item.purchaseType}
                  </span>
                  <span className="rounded-full bg-lime-100 px-3 py-1 text-xs text-lime-700 text_black">
                    {item.saleType}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="text-2xl font-semibold text_lime">
                      â‚¹{item.totalBasePrice}
                    </span>
                  </p>
                  <p className="break-words">
                    â‚¹{item.pricePerKg} per {item.unit}
                  </p>
                </div>

                <div className="space-y-2 border-t pt-3 text-sm">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Package size={16} className="shrink-0" />
                        <p>Quantity:</p>
                      </div>

                      <span className="text-right font-semibold break-words text-black">
                        {item.quantity} {item.unit}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="shrink-0" />
                        <p>Location:</p>
                      </div>

                      <span className="text-right font-semibold break-words text-black">
                        {item.district}, {item.state}
                      </span>
                    </div>
                  </div>

                  {item.minimumOrderQuantity && (
                    <div className="mt-3 rounded-lg border border-lime-200 bg-lime-50 px-3 py-2 text_black">
                      MOQ: {item.minimumOrderQuantity}
                    </div>
                  )}
                </div>

                {item.highestBid !== null &&
                item.topBidderName !== null &&
                item.saleType === "AUCTION" ? (
                  <div className="flex w-full flex-col rounded-xl border border-[#64B9004D] bg-[#64B9001A]">
                    <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2">
                      <div>
                        <p className="text-sm text-gray-600">Leading Bid</p>
                        <p className="mt-1 text-lg font-semibold text_lime">
                          â‚¹{item.highestBid}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold break-words text-black">
                          {item.topBidderName}
                        </p>
                      </div>
                    </div>

                    <div className="back_lime mx-3 mb-3 flex items-center justify-center gap-2 rounded-xl p-2 text-center">
                      <p>
                        <Image src={Right_Mark} alt="Right Mark" />
                      </p>
                      <button
                        className="text-center"
                        onClick={() => {
                          setacceptBid(true);
                          setbuyerSelection({
                            buyer: item.topBidderName,
                            bid_amount: item.highestBid,
                            cropName: item.cropName,
                            variety: item.variety,
                            quantity: item.quantity,
                            unit: item.unit,
                            bidId: item.topBid,
                          });
                        }}
                      >
                        Accept Bid
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[120px] rounded-xl" />
                )}

                <div className="mb-3 mt-auto flex flex-col gap-3 pt-1 sm:flex-row">
                  <button
                    className="h-12 w-full cursor-pointer rounded-lg border-2 bg-lime-600 px-4 py-2 text-white hover:bg-lime-700 sm:flex-1"
                    onClick={() => {
                      setSelectedCrop(item);
                      setViewModal(true);
                    }}
                  >
                    View Listing
                  </button>
                  <button className="h-12 w-full cursor-pointer rounded-lg border px-4 py-2 hover:bg-gray-50 text_black sm:min-w-[96px] sm:w-auto">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {viewModal && selectedCrop && (
          <CropViewModal
            crop={selectedCrop}
            onClose={() => {
              setViewModal(false);
              setSelectedCrop(null);
            }}
          />
        )}
        {acceptBid && (
          <AcceptedBid
            onClose={() => setacceptBid(false)}
            buyerSelection={buyerSelection}
          />
        )}
      </div>
    </section>
  );
}




"use client";
import Image from "next/image";
import drone from "@/assets/dron.jpg";
import { useEffect, useState } from "react";
import CropViewModal from "../CropViewModal/cropViewModal";
import { getApi } from "@/services/apiService";
import "@/app/globals.css";
import Right_Mark from "@/SVG/Dashboard/Right_Mark.svg";
import AcceptedBid from "../AcceptBid/AcceptedBid";
import { MapPin, Package } from "lucide-react";

export default function ListingCard({ refreshKey }) {
  const getImageUrl = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  const [apiRes, setapiRes] = useState();
  const [acceptBid, setacceptBid] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [buyerSelection, setbuyerSelection] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await getApi(`/listings/my-active-summary`);
      setapiRes(result);
    }
    fetchData();
  }, [refreshKey]);

  return (
    <section className="mx-auto mb-10 w-full">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {apiRes?.data?.content.map((item, index) => (
          <div
            className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl"
            key={index}
          >
            {Array.isArray(item?.images) && item.images.length > 0 ? (
              <div className="relative h-[180px] sm:h-[200px]">
                <Image
                  src={`${getImageUrl(item.images[0].filePath)}`}
                  alt="crop"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="relative h-[180px] sm:h-[200px]">
                <Image
                  src={drone}
                  alt="crop"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <div className="flex flex-1 flex-col space-y-3 p-4 sm:p-5">
              <h3 className="text-lg font-semibold break-words text_black">
                {item.cropName}-{item.variety}
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-400 text_black">
                  {item.purchaseType}
                </span>
                <span className="rounded-full bg-lime-100 px-3 py-1 text-xs text-lime-700 text_black">
                  {item.saleType}
                </span>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="text-2xl font-semibold text_lime">
                    {"\u20B9"}{item.totalBasePrice}
                  </span>
                </p>
                <p className="break-words">
                  {"\u20B9"}{item.pricePerKg} per {item.unit}
                </p>
              </div>

              <div className="space-y-2 border-t pt-3 text-sm">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Package size={16} className="shrink-0" />
                      <p>Quantity:</p>
                    </div>

                    <span className="text-right font-semibold break-words text-black">
                      {item.quantity} {item.unit}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="shrink-0" />
                      <p>Location:</p>
                    </div>

                    <span className="text-right font-semibold break-words text-black">
                      {item.district}, {item.state}
                    </span>
                  </div>
                </div>

                {item.minimumOrderQuantity && (
                  <div className="mt-3 rounded-lg border border-lime-200 bg-lime-50 px-3 py-2 text_black">
                    MOQ: {item.minimumOrderQuantity}
                  </div>
                )}
              </div>

              {item.highestBid !== null &&
              item.topBidderName !== null &&
              item.saleType === "AUCTION" ? (
                <div className="flex w-full flex-col rounded-xl border border-[#64B9004D] bg-[#64B9001A]">
                  <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-600">Leading Bid</p>
                      <p className="mt-1 text-lg font-semibold text_lime">
                        {"\u20B9"}{item.highestBid}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold break-words text-black">
                        {item.topBidderName}
                      </p>
                    </div>
                  </div>

                  <div className="back_lime mx-3 mb-3 flex items-center justify-center gap-2 rounded-xl p-2 text-center">
                    <p>
                      <Image src={Right_Mark} alt="Right Mark" />
                    </p>
                    <button
                      className="text-center"
                      onClick={() => {
                        setacceptBid(true);
                        setbuyerSelection({
                          buyer: item.topBidderName,
                          bid_amount: item.highestBid,
                          cropName: item.cropName,
                          variety: item.variety,
                          quantity: item.quantity,
                          unit: item.unit,
                          bidId: item.topBid,
                        });
                      }}
                    >
                      Accept Bid
                    </button>
                  </div>
                </div>
              ) : (
                <div className="min-h-[120px] rounded-xl" />
              )}

              <div className="mb-3 mt-auto flex flex-col gap-3 pt-1 sm:flex-row">
                <button
                  className="h-12 w-full cursor-pointer rounded-lg border-2 bg-lime-600 px-4 py-2 text-white hover:bg-lime-700 sm:flex-1"
                  onClick={() => {
                    setSelectedCrop(item);
                    setViewModal(true);
                  }}
                >
                  View Listing
                </button>
                <button className="h-12 w-full cursor-pointer rounded-lg border px-4 py-2 hover:bg-gray-50 text_black sm:w-auto sm:min-w-[96px]">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}

        {viewModal && selectedCrop && (
          <CropViewModal
            crop={selectedCrop}
            onClose={() => {
              setViewModal(false);
              setSelectedCrop(null);
            }}
          />
        )}
        {acceptBid && (
          <AcceptedBid
            onClose={() => setacceptBid(false)}
            buyerSelection={buyerSelection}
          />
        )}
      </div>
    </section>
  );
}






// import ListingCard from "./ListingCard";
// import AddListingButton from "./AddListingButton";
// import wheat from "@/public/wheat.jpg";
// import rice from "@/public/rice.jpg";
// import potato from "@/public/potato.jpg";
"use client"
import Plus from "@/SVG/Dashboard/Plus.svg";
import Image from "next/image"
import "@/app/globals.css"
import AddCropModal from "../addCrop/AddCropModal";
import {useState} from "react";
import CropViewModal from "../CropViewModal/cropViewModal";
import ListingCard from "./ListingCard";
import { headFont } from "@/app/layout";


export default function ActiveListingsSection() {

     const [openCropList, setOpenCropList] = useState(false);
     const[refreshKey,setrefreshKey]=useState(0);

   
  return (
    <div className="w-full max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className={`text-2xl sm:text-3xl text_black ${headFont.className}`}>
          My Active Listings
        </h2>

       <div className="w-full sm:w-auto">
        <div>
          {openCropList && <AddCropModal setOpenCropList={setOpenCropList} openCropList={openCropList} setrefreshKey={setrefreshKey} refreshKey={refreshKey} />}
          <button className="w-full sm:w-auto hover:shadow-lg transition-shadow duration-300" onClick={() =>setOpenCropList(true)}>
            <div className="Back_color mx-auto flex w-full items-center justify-center gap-2 rounded-lg p-3 text-white sm:min-w-[200px]">
              <div>
                <Image src={Plus} alt="Add new Listing" ></Image>
              </div>
              <div>
                <p>
                  Add new Listing
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
     
      </div>
      <div>
        <ListingCard  refreshKey={refreshKey}/>
      </div>

      {/* CARDS */}
      {/* <div className="grid grid-cols-3 gap-6">

        <ListingCard
          image={wheat}
          title="Wheat - HD-2967"
          type="Whole Lot"
          quantity="100 Quintal"
          saleType="Auction"
          totalPrice="₹225,000"
          perQuintal="₹2,250 per quintal"
          location="Meerut, Uttar Pradesh"
        />

        <ListingCard
          image={rice}
          title="Rice - Basmati 1121"
          type="Partial Orders"
          quantity="50 Quintal"
          saleType="Fixed Price"
          totalPrice="₹225,000"
          perQuintal="₹4,500 per quintal"
          location="Karnal, Haryana"
          moq="10 Quintal"
        />

        <ListingCard
          image={potato}
          title="Cotton - Bt Cotton"
          type="Whole Lot"
          quantity="75 Quintal"
          saleType="Auction"
          totalPrice="₹435,000"
          perQuintal="₹5,800 per quintal"
          location="Guntur, Andhra Pradesh"
        />

      </div> */}
    </div>
  );
}


