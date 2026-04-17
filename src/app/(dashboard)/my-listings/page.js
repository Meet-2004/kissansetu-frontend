"use client";
import FilterBtn from "@/app/features/My Listings/FilterBtn";
import ListingCard from "@/app/features/My Listings/ListingCard";
import StatCard from "@/app/features/My Listings/StateCard";
import { getApi } from "@/services/apiService";
import My_Listing from "@/SVG/Dashboard/My_Listing.svg";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import MyListingsViewModal from "@/app/features/CropViewModal/MyListingsViewModal";
import AcceptedBid from "@/app/features/AcceptBid/AcceptedBid";
import  RequirementCard  from "@/app/features/Buyer Requirement/RequirementCard";

export default function Listings() {
  const [active, setactive] = useState("All");
  const [fetchedListings, setfetchedListings] = useState();
  const [selectedList, setselectedList] = useState();
  const [viewModal, setviewModal] = useState(false);
  const [acceptBidModal, setacceptBidModal] = useState(false);
  const [buyerSelection, setbuyerSelection] = useState();
  const [refreshKey, setrefreshKey] = useState(0);
  const [ActiveTab, setActiveTab] = useState("Sell");
  const [buyerRequirements,setBuyerRequirements]=useState();

  console.log(active);

  console.log(selectedList);

  useEffect(() => {
    async function fetchData() {
      if(ActiveTab==="Sell"){
   
      if (active === "All" ) {
       const result = await getApi(`/listings/my-listings`);
        setfetchedListings(result.data.content);
      } else {
        // setfetchedListings(result.data.content);
      }
    } else{
        const getRequirements= await getApi("/listings/seller/requirements");
         setBuyerRequirements(getRequirements?.data);
      console.log("hello");
    }
  }
    fetchData();
  }, [active, refreshKey,ActiveTab]);
  console.log(fetchedListings);

  console.log("this is buyer requirement state",buyerRequirements)
  

  const filteredListing = fetchedListings?.filter((item) => {
    if (active === "All") return true;
    return item.auctionStatus === active.toUpperCase();
  });
  console.log("this is filtered listings", filteredListing);

  const sellStats = [
    {
      title: "Total Listings",
      value: "4",
    },
    {
      title: "Active Bids",
      value: "4",
    },
    {
      title: "Total Views",
      value: "4",
    },
  ];
  const buyStats=[
    {
      title: "Total Requirements",
      value: "4",
    },
    {
      title: "Total Responses",
      value: "4",
    },
    {
      title: "Active Requests",
      value: "4",
    },

  ]
  const sellFilterType = [
    {
      name: "All",
    },
    {
      name: "Active",
    },
    {
      name: "Sold",
    },
    {
      name: "Expired",
    },
    {
      name: "Pending",
    },
  ];

  return (
  <>
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4">
        
        {/* Title + Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
            My Listings
          </h1>

          {/* Tabs */}
          <div className="bg-gray-100 p-1 rounded-xl flex w-fit">
            <button
              className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition ${
                ActiveTab === "Sell"
                  ? "bg-white shadow text-[#64B900]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("Sell")}
            >
              Sell
            </button>

            <button
              className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition ${
                ActiveTab === "Buy"
                  ? "bg-white shadow text-[#64B900]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("Buy")}
            >
              Buy
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(ActiveTab === "Sell" ? sellStats : buyStats)?.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-black">
                {item.value}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-full bg-lime-100 flex items-center justify-center text-lg">
              📦
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 STICKY SEARCH + FILTER */}
      <div className="sticky top-0 z-10 bg-white pb-3">
        
        <div className="bg-white border rounded-2xl p-3 sm:p-4 shadow-sm space-y-3">

          {/* Search */}
          <div>
            <input
              placeholder="Search listings..."
              className="w-full px-4 py-2.5 bg-gray-50 rounded-xl outline-none border border-gray-200 focus:ring-2 focus:ring-lime-400"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {sellFilterType &&
              ActiveTab === "Sell" &&
              sellFilterType.map((item, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                    active === item.name
                      ? "bg-lime-500 text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setactive(item.name)}
                >
                  {item.name}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* CARDS */}
      {ActiveTab === "Sell" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {filteredListing?.length > 0 ? (
            filteredListing.map((item, i) => (
              <div className="transition hover:scale-[1.02]" key={i}>
                <ListingCard
                  item={item}
                  setselectedList={setselectedList}
                  openCropModal={() => setviewModal(true)}
                  viewModal={viewModal}
                  openAcceptBid={() => setacceptBidModal(true)}
                  onClose={() => setacceptBidModal(false)}
                  setbuyerSelection={setbuyerSelection}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center py-16">
              <div className="bg-white border rounded-2xl p-8 text-center shadow-sm">
                <Image src={My_Listing} width={80} height={80} alt="svg" />
                <p className="mt-4 text-lg font-medium text-black">
                  No listings found
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Try adjusting filters or create a new listing
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {buyerRequirements?.length > 0 ? (
            buyerRequirements.map((item, i) => (
              <div className="transition hover:scale-[1.02]" key={i}>
                <RequirementCard item={item} />
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center py-16">
              <div className="bg-white border rounded-2xl p-8 text-center shadow-sm">
                <Image src={My_Listing} width={80} height={80} alt="svg" />
                <p className="mt-4 text-lg font-medium text-black">
                  No listings found
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Try adjusting filters or create a new listing
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    {/* MODALS (UNCHANGED) */}
    {viewModal && (
      <MyListingsViewModal
        closeViewModal={() => setviewModal(false)}
        selectedList={selectedList}
        setbuyerSelection={setbuyerSelection}
        openCropModal={() => setviewModal(true)}
      />
    )}

    {acceptBidModal && (
      <AcceptedBid
        setsetrefreshKey={() => setrefreshKey(refreshKey + 1)}
        onClose={() => setacceptBidModal(false)}
        buyerSelection={buyerSelection}
      />
    )}
  </>
);
 

  
}

// "use client";
// import ListingCard from "@/app/features/My Listings/ListingCard";
// import { getApi } from "@/services/apiService";
// import My_Listing from "@/SVG/Dashboard/My_Listing.svg";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import MyListingsViewModal from "@/app/features/CropViewModal/MyListingsViewModal";
// import AcceptedBid from "@/app/features/AcceptBid/AcceptedBid";
// import RequirementCard from "@/app/features/Buyer Requirement/RequirementCard";

// export default function Listings() {
//   const [active, setactive] = useState("All");
//   const [fetchedListings, setfetchedListings] = useState();
//   const [selectedList, setselectedList] = useState();
//   const [viewModal, setviewModal] = useState(false);
//   const [acceptBidModal, setacceptBidModal] = useState(false);
//   const [buyerSelection, setbuyerSelection] = useState();
//   const [refreshKey, setrefreshKey] = useState(0);
//   const [ActiveTab, setActiveTab] = useState("Sell");
//   const [buyerRequirements, setBuyerRequirements] = useState();

//   useEffect(() => {
//     async function fetchData() {
//       if (ActiveTab === "Sell") {
//         const result = await getApi(`/listings/my-listings`);
//         setfetchedListings(result.data.content);
//       } else {
//         const getRequirements = await getApi("/listings/seller/requirements");
//         setBuyerRequirements(getRequirements?.data);
//       }
//     }
//     fetchData();
//   }, [active, refreshKey, ActiveTab]);

//   const filteredListing = fetchedListings?.filter((item) => {
//     if (active === "All") return true;
//     return item.auctionStatus === active.toUpperCase();
//   });

//   const sellStats = [
//     { title: "Total Listings", value: "4" },
//     { title: "Active Bids", value: "4" },
//     { title: "Total Views", value: "4" },
//   ];

//   const buyStats = [
//     { title: "Total Requirements", value: "4" },
//     { title: "Total Responses", value: "4" },
//     { title: "Active Requests", value: "4" },
//   ];

//   const sellFilterType = ["All", "Active", "Sold", "Expired", "Pending"];

//   return (
//     <>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">

//         {/* HEADER */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black">
//             My Listings
//           </h1>

//           <div className="bg-white p-1 rounded-xl shadow-md flex gap-1 w-full sm:w-fit">
//             <button
//               className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg ${
//                 ActiveTab === "Sell"
//                   ? "bg-[#64B900] text-white"
//                   : "text-black"
//               }`}
//               onClick={() => setActiveTab("Sell")}
//             >
//               Sell
//             </button>

//             <button
//               className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg ${
//                 ActiveTab === "Buy"
//                   ? "bg-[#64B900] text-white"
//                   : "text-black"
//               }`}
//               onClick={() => setActiveTab("Buy")}
//             >
//               Buy
//             </button>
//           </div>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//           {(ActiveTab === "Sell" ? sellStats : buyStats).map(
//             (item, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-4 sm:p-6 rounded-xl flex justify-between items-center shadow-sm"
//               >
//                 <div>
//                   <p className="text-gray-600 text-sm">{item.title}</p>
//                   <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text_black">
//                     {item.value}
//                   </h2>
//                 </div>

//                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
//                   📦
//                 </div>
//               </div>
//             )
//           )}
//         </div>

//         {/* SEARCH + FILTER */}
//         <div className="flex flex-col gap-3 bg-white p-4 rounded-xl text-black">
//           <input
//             placeholder="Search listings..."
//             className="w-full px-4 py-2 bg-[#F9FAFB] rounded-lg outline-none border"
//           />

//           {ActiveTab === "Sell" && (
//             <div className="flex gap-2 overflow-x-auto no-scrollbar">
//               {sellFilterType.map((item, index) => (
//                 <button
//                   key={index}
//                   className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs sm:text-sm ${
//                     active === item
//                       ? "bg-lime-500 text-white"
//                       : "bg-gray-100 text-gray-600"
//                   }`}
//                   onClick={() => setactive(item)}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* CARDS */}
//         {ActiveTab === "Sell" ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//             {filteredListing?.length > 0 ? (
//               filteredListing.map((item, i) => (
//                 <ListingCard
//                   key={i}
//                   item={item}
//                   setselectedList={setselectedList}
//                   openCropModal={() => setviewModal(true)}
//                   viewModal={viewModal}
//                   openAcceptBid={() => setacceptBidModal(true)}
//                   setbuyerSelection={setbuyerSelection}
//                 />
//               ))
//             ) : (
//               <div className="col-span-full flex justify-center items-center py-10">
//                 <div className="w-full border rounded-2xl text-center flex flex-col justify-center items-center bg-white text-black p-6">
//                   <Image
//                     src={My_Listing}
//                     width={80}
//                     height={80}
//                     alt="empty"
//                   />
//                   <p className="mt-3 font-medium">No listings found</p>
//                   <p className="mt-2 text-sm text-gray-500">
//                     Try adjusting your filters or create a new listing
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//             {buyerRequirements?.length > 0 ? (
//               buyerRequirements.map((item, i) => (
//                 <RequirementCard key={i} item={item} />
//               ))
//             ) : (
//               <div className="col-span-full flex justify-center items-center py-10">
//                 <div className="w-full border rounded-2xl text-center flex flex-col justify-center items-center bg-white text-black p-6">
//                   <Image
//                     src={My_Listing}
//                     width={80}
//                     height={80}
//                     alt="empty"
//                   />
//                   <p className="mt-3 font-medium">No requirements found</p>
//                   <p className="mt-2 text-sm text-gray-500">
//                     Try adjusting your filters
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* MODALS */}
//       {viewModal && (
//         <MyListingsViewModal
//           closeViewModal={() => setviewModal(false)}
//           selectedList={selectedList}
//           setbuyerSelection={setbuyerSelection}
//         />
//       )}

//       {acceptBidModal && (
//         <AcceptedBid
//           setsetrefreshKey={() => setrefreshKey((prev) => prev + 1)}
//           onClose={() => setacceptBidModal(false)}
//           buyerSelection={buyerSelection}
//         />
//       )}
//     </>
//   );
// }









// return (
  //   <>
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
  //       <div className="flex">
  //         <div className="text-3xl text-black">My Listings</div>
  //         <div className="flex justify-center items-center w-[70%]">
  //           {" "}
  //           <div className="bg-white p-1 rounded-xl shadow-md flex gap-1 w-fit justify-center items-center">
  //             <button
  //               className={`px-4 md: py-2 md: font-medium rounded-lg ${
  //                 ActiveTab === "Sell"
  //                   ? "bg-[#64B900] text-white"
  //                   : "text-black bg-white"
  //               }`}
  //               onClick={() => setActiveTab("Sell")}
  //             >
  //               Sell
  //             </button>

  //             <button
  //               className={`px-4 md: py-2 md: font-medium rounded-lg ${
  //                 ActiveTab === "Buy"
  //                   ? "bg-[#64B900] text-white"
  //                   : "text-black bg-white"
  //               }`}
  //               onClick={() => setActiveTab("Buy")}
  //             >
  //               Buy
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //       {/* Stats */}
  //       <div className="grid grid-cols-3 gap-6 mb-6 mt-5">
  //         {
             
  //            ActiveTab==="Sell" ? (
  //             sellStats &&
  //           sellStats.length > 0 &&
  //           sellStats.map((item, index) => {
  //             return (
  //               <div
  //                 className="bg-white p-6 rounded-xl flex justify-between items-center shadow-sm"
  //                 key={index}
  //               >
  //                 <div>
  //                   <p className="text-gray-600">{item.title}</p>
  //                   <h2 className="text-3xl font-bold text_black">
  //                     {item.value}
  //                   </h2>
  //                 </div>

  //                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
  //                   📦
  //                 </div>
  //               </div>
  //             );
  //           })):( buyStats &&
  //           buyStats.length > 0 &&
  //           buyStats.map((item, index) => {
  //             return (
  //               <div
  //                 className="bg-white p-6 rounded-xl flex justify-between items-center shadow-sm"
  //                 key={index}
  //               >
  //                 <div>
  //                   <p className="text-gray-600">{item.title}</p>
  //                   <h2 className="text-3xl font-bold text_black">
  //                     {item.value}
  //                   </h2>
  //                 </div>

  //                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
  //                   📦
  //                 </div>
  //               </div>
  //             );
  //           }))}
  //       </div>

  //       {/* Search + Filter */}
  //       <div className="flex justify-between items-center bg-white p-4 rounded-xl mb-6 text-black ">
  //         <div className="flex justify-center items-center w-full">
  //         <input
  //           placeholder="Search listings..."
  //           className= {`  ${ActiveTab === "Buy" ? "w-[70%]" : "w-[95%]"}  px-4 py-2  bg-[#F9FAFB] rounded-lg outline-none text-black border-gray-400 border flex justify-center items-center 
  //                   `}          />
  //         </div>

  //         <div className="flex gap-2 ml-2">
  //           {/* <FilterBtn text="All" active />
  //         <FilterBtn text="Active" />
  //         <FilterBtn text="Sold" />
  //         <FilterBtn text="Expired" /> */}
  //           {sellFilterType && ActiveTab==="Sell" &&
  //             sellFilterType.length > 0 &&
  //             sellFilterType.map((item, index) => {
  //               return (
  //                 <div key={index}>
  //                   <button
  //                     className={`px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 cursor-pointer ${active === item.name ? "bg-lime-500 text-white" : ""}  `}
  //                     onClick={() => setactive(item.name)}
  //                   >
  //                     <p className={``}>{item.name}</p>
  //                   </button>
  //                 </div>
  //               );
              
  //             })}
  //         </div>
  //       </div>

  //       {/* Cards */}
        
  //   { ActiveTab==="Sell" ? (
  //       <div className="grid grid-cols-3 gap-6">
  //         {filteredListing && filteredListing?.length > 0 ? (
  //           filteredListing?.map((item, i) => (
  //             <ListingCard
  //               key={i}
  //               item={item}
  //               setselectedList={setselectedList}
  //               openCropModal={() => setviewModal(true)}
  //               viewModal={viewModal}
  //               openAcceptBid={() => setacceptBidModal(true)}
  //               onClose={() => setacceptBidModal(false)}
  //               setbuyerSelection={setbuyerSelection}
  //             />
  //           ))
  //         ) : (
  //           <div className="flex justify-center items-center col-span-3 py-10 ">
  //             <div className="h-70 w-full border border-gray-200 rounded-2xl text-center flex flex-col justify-center items-center   bg-white text-black">
  //               <p>
  //                 <Image
  //                   src={My_Listing}
  //                   width="20"
  //                   height="20"
  //                   className="h-20 w-20"
  //                   alt="svg"
  //                 ></Image>
  //               </p>
  //               <p className="mt-3">No listings found</p>{" "}
  //               <p className="mt-3">
  //                 Try adjusting your filters or create a new listing
  //               </p>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //   ):(

  //      <div className="grid grid-cols-3 gap-6">
  //         {buyerRequirements && buyerRequirements?.length > 0 ? (
  //           buyerRequirements?.map((item, i) => (
  //             <RequirementCard
  //               key={i}
  //               item={item}
  //               // setselectedList={setselectedList}
  //               // openCropModal={() => setviewModal(true)}
  //               // viewModal={viewModal}
  //               // openAcceptBid={() => setacceptBidModal(true)}
  //               // onClose={() => setacceptBidModal(false)}
  //               // setbuyerSelection={setbuyerSelection}
  //             />
  //           ))
  //         ) : (
  //           <div className="flex justify-center items-center col-span-3 py-10 ">
  //             <div className="h-70 w-full border border-gray-200 rounded-2xl text-center flex flex-col justify-center items-center   bg-white text-black">
  //               <p>
  //                 <Image
  //                   src={My_Listing}
  //                   width="20"
  //                   height="20"
  //                   className="h-20 w-20"
  //                   alt="svg"
  //                 ></Image>
  //               </p>
  //               <p className="mt-3">No listings found</p>{" "}
  //               <p className="mt-3">
  //                 Try adjusting your filters or create a new listing
  //               </p>
  //             </div>
  //           </div>
  //         )}
  //       </div>
       
  //   )
  //       }
  //     </div>
        
  //     {viewModal && (
  //       <MyListingsViewModal
  //         closeViewModal={() => setviewModal(false)}
  //         selectedList={selectedList}
  //         setbuyerSelection={setbuyerSelection}
  //         openCropModal={() => setviewModal(true)}
  //       />
  //     )}
  //     {acceptBidModal && (
  //       <AcceptedBid
  //         setsetrefreshKey={() => setrefreshKey(refreshKey + 1)}
  //         onClose={() => setacceptBidModal(false)}
  //         buyerSelection={buyerSelection}
  //       />
  //     )}
  //   </>
  // );
