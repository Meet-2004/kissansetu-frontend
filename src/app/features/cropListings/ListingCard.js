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
import Link from "next/link";
import ZeroListingLayout from "../My Listings/zeroListingLayout";

import {
  Clock,
  TrendingUp,
  Star,
  MapPin,
  Package,
  Calendar,
} from "lucide-react";
export default function ListingCard({
  refreshKey,
  setrefreshKey,
  setOpenCropList,
}) {
  const data = useSelector((state) => state.auth);
  const getImageUrl = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  const [apiRes, setapiRes] = useState();
  const [acceptBid, setacceptBid] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [buyerSelection, setbuyerSelection] = useState();

  console.log("setOpenCropList", setOpenCropList);
  console.log("this is  refresh key at listing card ", refreshKey);

  //  console.log("data",data);

  console.log("this is refresh key", refreshKey);
  useEffect(() => {
    async function fetchData() {
      //  const interval= setInterval( async ()=>{
      //     const result = await getApi(`/listings/my-active-summary`);
      //     console.log("this is result", result);
      //     setapiRes(result);
      //   },30000);
      //   return () => clearInterval(interval);
      const result = await getApi(`/listings/my-active-summary`);
      console.log("this is result", result);

      const top3 = result?.data?.content?.slice(0, 3) || [];
      setapiRes(top3);
      console.log();
    }

    fetchData();

    console.log("hello i am updated");
    console.log("this is apiRes outside function ", apiRes);
  }, [refreshKey]);

  console.log("this is top 3 list", apiRes && apiRes?.length > 0);

  return (
    <section
      // className="md:min-w-sm md:max-w-303 w-11/12 max-w-md mx-auto md:mx-auto  mb-10 flex flex-col"
            className="md:min-w-sm md:max-w-303  max-w-md  mx-auto md:mx-auto  mb-10 flex flex-col"


    >
      {apiRes && apiRes.length >= 3 && (
        <div>
          <Link href="/my-listings" className="float-right text_lime text-xl back_lime p-2 rounded-xl text-white ">
           <p className="text-white text-xs">View All</p> 
          </Link>
        </div>
      )}
      {apiRes && apiRes?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5 mt-5 justify-items-center">
          {apiRes && apiRes?.length > 0 ? (
            apiRes?.map((item, index) => {
              return (
                <div
                  className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[370px] min-h-full hover:shadow-2xl "
                  key={index}
                >
                  {Array?.isArray(item?.images) && item?.images?.length > 0 ? (
                    <div className="h-[180px] relative">
                      <Image
                        src={`${getImageUrl(item?.images[0]?.filePath)}`}
                        alt="crop"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="h-[180px] relative">
                      <Image
                        src={drone}
                        alt="crop"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}

                  <div className="p-5 space-y-3  flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg text_black">
                      {item?.cropName}-{item?.variety}
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="bg-gray-100 text-gray-400 text-xs px-3 py-1 rounded-full text_black">
                        {item?.purchaseType}
                      </span>
                      <span className="bg-lime-100 text-lime-700 text-xs px-3 py-1 rounded-full text_black">
                        {item?.saleType}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <span className="text-2xl text_lime font-semibold">
                          ₹{item?.totalBasePrice}
                        </span>
                      </p>
                      <p>
                        <span className="">
                          ₹{item?.pricePerKg} per {item?.unit}
                        </span>
                      </p>
                      {/* <p>
                      Sale Type:
                      <span className="float-right bg-lime-100 px-2 rounded">
                        {item.saleType}
                      </span>
                    </p> */}
                    </div>

                    <div className="border-t pt-3 text-sm space-y-2 ">
                      <div className="text-sm text-gray-600 space-y-1 ">
                        <p className="flex gap-2">
                          <p className="flex gap-2">
                            <p className="flex justify-center items-center text-center">
                              <Package size={16} />
                            </p>
                            <p>Quantity:</p>
                          </p>

                          <span className="float-right text-black font-semibold">
                            {item?.quantity} {item?.unit}
                          </span>
                        </p>
                        <p className="flex gap-2 mt-3">
                          <p className="flex gap-2">
                            <p className="flex justify-center items-center text-center">
                              <MapPin size={16} />
                            </p>
                            <p>Quantity:</p>
                          </p>

                          <span className="float-right text-black font-semibold ">
                            {item?.district}, {item?.state}
                          </span>
                        </p>
                      </div>
                      {item.minimumOrderQuantity && (
                        <div className="bg-lime-50 border border-lime-200 rounded-lg px-3 py-2 mt-3 text_black">
                          MOQ: {item?.minimumOrderQuantity}
                        </div>
                      )}
                    </div>
                    {item?.highestBid !== null &&
                    item?.topBidderName !== null &&
                    item?.saleType === "AUCTION" ? (
                      <div>
                        <div className="border border-[#64B9004D] bg-[#64B9001A] flex h-30 w-full  flex-col align-item-flex-start gap-12px rounded-xl">
                          <div className="grid grid-cols-2 p-2 gap-5">
                            <div>
                              <p className="text-gray-600 text-sm">
                                Leading Bid
                              </p>
                              <p className="text-lg font-semibold mt-1 text_lime">
                                ₹{item?.highestBid}
                              </p>
                            </div>
                            <div className="w-40">
                              <p className="font-semibold text-sm text-black">
                                {item?.topBidderName}
                              </p>
                              {/* <p className="text-sm text-gray-500">2 hours ago</p> */}
                            </div>
                          </div>

                          <button
                            className="text-center cursor-pointer"
                            onClick={() => {
                              setacceptBid(true);
                              setbuyerSelection({
                                buyer: item?.topBidderName,
                                bid_amount: item?.highestBid,
                                cropName: item?.cropName,
                                variety: item?.variety,
                                quantity: item?.quantity,
                                unit: item?.unit,
                                bidId: item?.topBid,
                              });
                            }}
                          >
                            <div className="w-[90%] mx-auto rounded-xl p-1 mb-2 text-center flex justify-center items-center  back_lime gap-2">
                              <p>
                                <Image src={Right_Mark} alt="Right Mark" />
                              </p>
                              Accept Bid
                            </div>
                          </button>
                        </div>
                      </div>
                    ) : (
                      // <div className=" h-30   flex-col align-item-flex-start gap-12px rounded-xl">
                      // {" "}
                      // </div>
                      ""
                    )}

                    <div className="  pt-1 top-20 mb-3">
                      <button
                        className="w-[100%] border-2  h-12 bg-lime-600 py-2 text-white rounded-lg hover:bg-lime-700 cursor-pointer"
                        onClick={() => {
                          setSelectedCrop(item);
                          setViewModal(true);
                        }}
                      >
                        👁 View Listing
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <ZeroListingLayout
              setrefreshKey={setrefreshKey}
              setOpenCropList={setOpenCropList}
            />
          )}
          {/* render modal conditionally and pass crop */}
          {viewModal && selectedCrop && (
            <CropViewModal
              crop={selectedCrop}
              setrefreshKey={setrefreshKey}
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
              setrefreshKey={setrefreshKey}
              refreshKey={refreshKey}
            />
          )}
        </div>
      ) : (
        <ZeroListingLayout
          setrefreshKey={setrefreshKey}
          setOpenCropList={setOpenCropList}
        />
      )}
    </section>
  );
}
