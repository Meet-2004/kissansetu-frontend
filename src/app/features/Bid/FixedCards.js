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
import Buynow from "../placeBid/Buynow";
import dron from "@/assets/dron.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFixed, invalidateFixed } from "@/app/Store/slices/fixedSlice";
import Placebid from "../placeBid/Placebid";
import "@/app/globals.css";
import EscrowPayment from "../Escrow Payment/EscrowPayment";
import OrderTypeModal from "../order Type/OrderTypeModal";
import PartialConfirmPurchase from "@/app/features/Confirm Purchase (Partial)/PartialConfirmPuchase";
import { handleApi } from "@/lib/apiHndler";
import { useRef } from "react";
import SkeletonCard from "@/app/features/Skeleton Card/SkeletonCard";

export default function FixedCards({ crop, onBid, onView, buyerActiveTab,searchList}) {
  // const onBidClick = () => {
  //   console.log("Application successfull for bid");
  // };
  const [bidPlaced, setbidPlaced] = useState(false);
  const [selectedList, setselectedList] = useState();
  const [escrowModal, setEscrowModal] = useState(false);
  const [partialAvailable, setpartialAvailable] = useState(false);
  const [selectedPurchaseType, setselectedPurchaseType] = useState("");
  const [selectedListData, setselectedListData] = useState();
  const [isPartial, setisPartial] = useState(false);
  const [partialQuantity, setpartialQuantity] = useState(0);
  const [data, setData] = useState([]);

  console.log("this is search list at fixed card ",searchList);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  console.log("this is selected type", selectedPurchaseType);
  console.log("this is selected list data", selectedListData);
  const { fixed, loading, error, page, totalPages } = useSelector(
    (state) => state.fixed,
  );

  const imageUrl = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;

  console.log("this is fixed", fixed);

  // useEffect(() => {
  //   // Initial fetch
  //   dispatch(fetchFixed());
  //   // Set up polling every 30 seconds for real-time updates
  //   const interval = setInterval(() => {
  //     dispatch(fetchFixed());
  //   }, 30000); // 30 seconds

  //   return () => clearInterval(interval);
  // }, [dispatch]);


   const pageRef = useRef(page);
  
  useEffect(() => {
    pageRef.current = page;
  }, [page]);
  console.log("this is page ref",pageRef.current);
  
  useEffect(() => {
    if(searchList===""){
     dispatch(fetchFixed(pageRef.current));
    }
    else{
      dispatch(fetchFixed({page:0,search:searchList}))
    }
    const interval = setInterval(() => {
      dispatch(fetchFixed({page:pageRef.current,search:searchList})); // always latest page
    }, 30000);
  
  
    return () => clearInterval(interval);
  }, [dispatch,searchList]);

  

   const handleNextPage =()=>{
      console.log("this is page",page);
      console.log("this is total page",totalPages);
      if (page < totalPages - 1) {
      dispatch(fetchFixed({page:page + 1,search:searchList}));
      pageRef.current=page+1;
  
    }
    }

  const handlePreviousPage = () => {
      if (page > 0) {
      dispatch(fetchFixed({page:page - 1,search:searchList}));
         pageRef.current=page-1;
      }
  }

  return (
    <section
      className={` mx-auto  ${bidPlaced === true ? "fixed" : " "} ${escrowModal && "fixed"} ${selectedPurchaseType === "Partial Order" && "fixed"}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* {ActiveTab ==="Auctions" &&} */}
        {buyerActiveTab === "Fixed" && loading ? (
        <SkeletonCard Count={3} />
        ) : error && buyerActiveTab === "Fixed" ? (
          <div className="col-span-3 text-center py-8 text-red-500">
            Error loading auctions: {error}
          </div>
        ) : fixed &&
          Array.isArray(fixed?.content) &&
          fixed?.content?.length > 0 ? (
          fixed?.content?.map((item, index) => {
            return (
              <div
                className="bg-white rounded-3xl shadow-md overflow-hidden  border mt-5"
                key={index}
              >
                {/* IMAGE */}
                <div className="relative">
                  <Image
                    src={imageUrl(item?.images[0]?.filePath)}
                    alt="crop"
                    width={400}
                    height={250}
                    className="w-full h-[220px] object-cover"
                    unoptimized
                  />

                  {/* Auction badge */}
                  <span className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full text-sm shadow text_lime">
                    {item.saleType}
                  </span>
                </div>

                {/* BODY */}
                <div className="p-5">
                  {/* TITLE + SELLER */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {item.cropName}
                      </h2>
                      <p className="text-gray-500">{item.variety}</p>
                    </div>

                    <div className="text-right ">
                      <div className="flex gap-1">
                        <p className="text-gray-800 font-medium">dnd</p>
                        <div className="flex items-center justify-end gap-1 text-sm text-yellow-500">
                          <Star size={12} fill="currentColor" />5
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">SELLER</p>
                    </div>
                  </div>

                  {/* PRICE BOX */}
                  <div className="flex gap-4 mt-5 ">
                    {/* base */}
                    <div className="bg-gray-100 px-5 py-4 rounded-2xl w-2 flex-1">
                      <p className="text-xs text-gray-500 mb-1 ">BASE PRICE</p>
                      <p className="font-semibold text-sm text_black">
                        ₹{item.pricePerKg}/{item.unit}
                      </p>
                    </div>

                    {/* bid */}
                    <div className="bg-[#64B90020] border border-[#64B90040] rounded-2xl px-5 py-4 flex-1">
                      <p className="text-xs text_lime mb-1">FIXED PRICE</p>
                      <p className="font-semibold text-sm text_lime">
                        ₹{item.basePrice}
                      </p>
                    </div>
                  </div>

                  {/* QTY + LOCATION */}
                  <div className="flex justify-between mt-5 text-gray-600">
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
                      Buy Now
                    </button>

                    {/* <button
                      // onClick={onView}
                      className="w-12 h-12 flex items-center justify-center border rounded-xl"
                    >
                      <ChevronRight />
                    </button> */}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>There is no listings</div>
        )}
      </div>
      {/* PAGINATION */}
      { fixed?.totalPages > 0 && 
        <div className="flex flex-wrap justify-center mt-8 gap-2">
              <button
                onClick={handlePreviousPage}
                className="px-3 py-2 border rounded text-sm text-black"
              >
                Previous
              </button>
      
              {Array.from({ length: fixed?.totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {dispatch(fetchFixed(i)); pageRef.current=i;}}
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
      {bidPlaced && (
        <Buynow
          Onclose={() => setbidPlaced(false)}
          selectedList={selectedList}
          escrowModal={escrowModal}
          onEscrowOpen={() => {
            setbidPlaced(false);
            setEscrowModal(true);
          }}
          setpartialAvailable={setpartialAvailable}
          setbidPlaced={setbidPlaced}
          setselectedListData={setselectedListData}
        />
      )}
      {escrowModal && (
        <EscrowPayment
          onClose={() => {
            setEscrowModal(false);
            setisPartial(false);
          }}
          setEscrowModal={setEscrowModal}
          escrowModal={escrowModal}
          selectedListData={selectedListData}
          isPartial={isPartial}
          setisPartial={setisPartial}
          partialQuantity={partialQuantity}
        />
      )}
      {partialAvailable && (
        <OrderTypeModal
          onClose={() => setpartialAvailable(false)}
          setselectedPurchaseType={setselectedPurchaseType}
          setisPartial={setisPartial}
          setEscrowModal={setEscrowModal}
          onEscrowOpen={() => {
            setpartialAvailable(false);
            setEscrowModal(true);
          }}
          selectedListData={selectedListData}
        />
      )}
      {selectedPurchaseType === "Partial Order" && (
        <PartialConfirmPurchase
          open={() => setpartialAvailable(false)}
          setpartialAvailable={setpartialAvailable}
          onClose={() => {
            setselectedPurchaseType("");
            setisPartial(false);
            setbidPlaced(true);
          }}
          selectedListData={selectedListData}
          setpartialQuantity={setpartialQuantity}
          partialQuantity={partialQuantity}
          onConfirm={() => {
            {
              setselectedPurchaseType("");

              setEscrowModal(true);
            }
          }}
        />
      )}
    </section>
  );
}

//  return (
//   <div className="bg-white rounded-3xl shadow-md overflow-hidden w-[360px] border">

//     {/* IMAGE */}
//     <div className="relative">
//       <Image
//         src={bid.image}
//         alt="crop"
//         width={400}
//         height={250}
//         className="w-full h-[220px] object-cover"
//       />

//       {/* Auction badge */}
//       <span className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full text-sm shadow">
//         {bid.purchaseType}
//       </span>
//     </div>

//     {/* BODY */}
//     <div className="p-5">

//       {/* TITLE + SELLER */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900">
//             {bid.cropName}
//           </h2>
//           <p className="text-gray-500">{bid.userName}</p>
//         </div>

//         <div className="text-right">
//           <p className="text-gray-800 font-medium">{bid.variety}</p>
//           <div className="flex items-center justify-end gap-1 text-sm text-yellow-500">
//             <Star size={16} fill="currentColor" />
//             5
//           </div>
//           <p className="text-xs text-gray-400">SELLER</p>
//         </div>
//       </div>

//       {/* PRICE BOX */}
//       <div className="flex gap-4 mt-5">
//         {/* base */}
//         <div className="bg-gray-100 rounded-2xl px-5 py-4 flex-1">
//           <p className="text-xs text-gray-500 mb-1 ">BASE PRICE</p>
//           <p className="font-semibold text-lg text_black">
//             ₹{bid.pricePerKg}/{bid.unit}
//           </p>
//         </div>

//         {/* bid */}
//         <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4 flex-1">
//           <p className="text-xs text-green-600 mb-1">CURRENT BID</p>
//           <p className="font-semibold text-lg text-green-600">
//             ₹{bid.currentHighestBid}
//           </p>
//         </div>
//       </div>

//       {/* QTY + LOCATION */}
//       <div className="flex justify-between mt-5 text-gray-600">
//         <div className="flex items-center gap-2">
//           <Package size={18} />
//           {bid.quantity}
//         </div>

//         <div className="flex items-center gap-2">
//           <MapPin size={18} />
//           {bid.district} {bid.state}
//         </div>
//       </div>

//       {/* BUTTON */}
//       <div className="flex gap-3 mt-5">
//         <button
//           onClick={onBidClick}
//           className="flex-1 back_lime hover:back_lime text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium"
//         >
//           <Gavel size={18} />
//           Place Bid
//         </button>

//         <button
//           // onClick={onView}
//           className="w-12 h-12 flex items-center justify-center border rounded-xl"
//         >
//           <ChevronRight />
//         </button>
//       </div>
//     </div>
//   </div>
// );
