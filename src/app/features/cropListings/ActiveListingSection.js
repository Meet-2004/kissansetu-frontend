// import ListingCard from "./ListingCard";
// import AddListingButton from "./AddListingButton";
// import wheat from "@/public/wheat.jpg";
// import rice from "@/public/rice.jpg";
// import potato from "@/public/potato.jpg";
"use client";
import Plus from "@/SVG/Dashboard/Plus.svg";
import Image from "next/image";
import "@/app/globals.css";
import AddCropModal from "../addCrop/AddCropModal";
import { useState } from "react";
import CropViewModal from "../CropViewModal/cropViewModal";
import ListingCard from "./ListingCard";
import { headFont } from "@/app/layout";

export default function ActiveListingsSection() {
  const [openCropList, setOpenCropList] = useState(false);
  const [refreshKey, setrefreshKey] = useState(0);

  console.log("this is refresh key ", refreshKey);

  return (
    <div
      className={`md:min-w-sm md:max-w-300  max-w-md mx-auto  md:mx-auto ${openCropList ? "max-h-screen" : ""}`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 ">
        <h2 className={`md:text-3xl text_black text-xl  ${headFont.className}`}>
          My Active Listings
        </h2>

        <div className="float-right ">
          <div>
            {openCropList && (
              <AddCropModal
                setOpenCropList={setOpenCropList}
                openCropList={openCropList}
                setrefreshKey={setrefreshKey}
                refreshKey={refreshKey}
              />
            )}
            <button
              className="hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer "
              onClick={() => setOpenCropList(true)}
            >
              <div className="flex justify-center items-center Back_color md:gap-2  rounded-lg text-white mx-auto md:p-3 md:w-50    w-35 gap-1 p-2  ">
                <div>
                  <Image src={Plus} alt="Add new Listing"></Image>
                </div>
                <div>
                  <p className="text-xs md:text-base">Add new Listing</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div>
        <ListingCard
          setOpenCropList={() => setOpenCropList(true)}
          refreshKey={refreshKey}
          setrefreshKey={() => setrefreshKey(refreshKey + 1)}
        />
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
