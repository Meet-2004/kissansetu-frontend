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
import { fetchAuctions } from "@/app/Store/slices/bidSlice";
import { postApi } from "@/services/apiService";
import { getApi } from "@/services/apiService";
import ConfirmOrderModal from "./Confirmfixed";
import { SportsHandballTwoTone } from "@mui/icons-material";
import OrderSuccessModal from "./Fixedsucessmodel";
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Alert/Toast";
import "@/app/globals.css";
import OrderTypeModal from "../order Type/OrderTypeModal";
import EscrowPayment from "../Escrow Payment/EscrowPayment";

export default function Buynow({ Onclose, selectedList, onEscrowOpen,setpartialAvailable,setbidPlaced,setselectedListData}) {
  const [timeLeft, setTimeLeft] = useState("");
  const [oneListData, setoneListData] = useState();
  // const [openConfirm, setopenConfirm] = useState(false);
  const [Ordersucessmodel, setOrdersucessmodel] = useState(false);

 
  console.log("bidsucess", Ordersucessmodel);

  const getImageUrls = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;

  useEffect(() => {
    setoneListData([selectedList]);
    console.log("onse data list", oneListData);
    const listingIds = selectedList.listingId;

    // async function fetchData() {
    //   const result = await getApi(`/buyers/fixed/${listingIds}`);
    //   setbidList(result.data);
    // }
    // fetchData();
  }, []);
// const partialConfirmDatas={
//   cropName:selectedList.cropName,
//     variety:selectedList.variety,
//       minimumOrderQuantity:selectedList.minimumOrderQuantity,
//       quantity:selectedList.quantity,
//       pricePerKg:selectedList.pricePerKg,
//       unit:selectedList.unit,
// }


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

  const handleBuyNow = (saleType) => {
    if (saleType === "WHOLE_LOT_ONLY") {
      setselectedListData(selectedList)
      onEscrowOpen();
    } else {
       setbidPlaced(false);
       setselectedListData(selectedList)
      setpartialAvailable(true);

    }
  };

  console.log("this is one list data", oneListData);

  const handleSubmit = async (e) => {
    // console.log("this is listing details",oneListData);
    // console.log("hello");
    // console.log("this is listingid",oneListData[0].listingId)
    const listingIds = oneListData[0].listingId;

    // const result = await postApi(`/buyers/${listingIds}/auctions`);
    // setopenConfirm(false);
    // if (result.success) {
    //   // alert("something right");
    //   toast.success(result.message);
    //   console.log("hello", result.message);
    //   // Onclose();
    //   setOrdersucessmodel(true);

    // } else {
    //   toast.error(result.message, {
    //     style: {
    //       color: "white",
    //     },
    //   });
    //   console.log("something wrong", result.message);
    //   // alert("something wrong");
    // }
    setopenConfirm(false);
    setOrdersucessmodel(true);
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
              <h2 className="text-xl font-semibold text_black">
                Fixed Price Purchase
              </h2>

              <p className="text-gray-500 text-sm">
                Whole Lot or Partial Orders Available
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-green-100 text_lime px-4 py-1 rounded-full text-sm">
                Available
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
                  <div
                    className="grid grid-cols-3 gap-6 min-w-lg"
                    key={item.listingId}
                  >
                    <div className="col-span-2 space-y-6">
                      <div className="border rounded-xl p-6 flex gap-6 items-start  border-gray-500">
                        {/* Crop Image */}
                        <div className="w-40 h-32 relative rounded-lg overflow-hidden">
                          <Image
                            src={getImageUrls(item?.images[0]?.filePath)}
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
                          <p className="text_black font-semibold text-lg">
                            Pricing Information
                          </p>
                          <div className="mt-4 grid grid-cols-2 ">
                            <div>
                              <p className="text_black">
                                Fixed Price per {item.unit}
                              </p>
                              <p className="text_black">₹{item.pricePerKg}</p>
                            </div>

                            <div>
                              <p className="text_black">
                                Total Price({item.purchaseType})
                              </p>
                              <p className="text_black">₹{item.quantity*item.pricePerKg}</p>
                            </div>
                          </div>
                        </div>
                        {item.purchaseType &&
                          item.purchaseType == !"WHOLE_LOT_ONLY" && (
                            <div className="bg-[oklch(98.7%_0.022_95.277)] border border-amber-200 rounded-lg p-6 flex justify-between items-center mt-5">
                              <div>
                                <p className="text-amber-900 text-sm font-semibold">
                                  Partial Orders Available
                                </p>
                                <div>
                                  <h2 className="text-amber-900 text-sm mt-2 flex">
                                    Minimum Order Quantity:{" "}
                                    <p className="font-bold ml-2">
                                      {item.minimumOrderQuantity}
                                    </p>
                                    <p className="ml-2"> Quintal</p>
                                  </h2>
                                  <h2 className="text-amber-900 text-sm mt-1 flex">
                                    Price for partial orders:{" "}
                                    <p className="font-bold ml-2 ">
                                      {item.pricePerKg}
                                    </p>{" "}
                                    <p className="ml-2">per Quintal</p>
                                  </h2>
                                </div>

                                {/* <p className="text-sm text-gray-500">Total: ₹1,250,000</p> */}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className=" rounded-lg p-6 space-y-5 h-fit border-2 border-lime-500 min-w-sm">
                      <h3 className="font-semibold text-lg text_black">
                        Purchase Now{" "}
                      </h3>

                      {/* Current Bid */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <p className="text-gray-500 text-sm">Fixed Price</p>
                        <h2 className="text-3xl font-bold text_lime  ">
                          ₹{item.pricePerKg}
                        </h2>
                        <p className="text-sm text-gray-500 mt-2">
                          per {item.unit}
                        </p>
                        <hr className="text-green-300 mt-3" />

                        <p className="text-gray-500 text-sm mt-2">
                          Total (Whole Lot)
                        </p>
                        <h2 className="text-3xl font-bold text_lime  ">
                          ₹{item.quantity*item.pricePerKg}{" "}
                        </h2>
                      </div>

                      {/* Minimum Bid */}
                      <div>
                        <p className="text-sm text-gray-500">
                          Available Quantity
                        </p>
                        <p className="text_black font-bold text-xl">
                          {item.quantity} {item.unit}
                        </p>
                      </div>

                      <div>
                        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p class="text-xs font-medium text-blue-900 mb-1">
                            📦 Flexible Ordering
                          </p>
                          <p class="text-xs text-blue-700">
                            You can choose to buy the whole lot or order a
                            partial quantity (min. 20 Quintal)
                          </p>
                        </div>
                      </div>

                      {/* Buttons */}

                      <button
                        className="w-full bg-lime-500  text-white py-3 rounded-lg font-semibold  cursor-pointer  flex justify-center items-center hover:bg-lime-600"
                        onClick={() => {
                          handleBuyNow(item.purchaseType);
                        }}
                      >
                        Buy Now
                      </button>

                      <button className="w-full border border-green-600 text_lime py-3 rounded-lg font-semibold cursor-pointer">
                        Contact Seller
                      </button>

                      {/* <div className="bg-yellow-50 text-yellow-700 text-sm p-3 rounded">
                        [Demo: Change Status] This is a demonstration interface.
                      </div> */}
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div>no details available yet</div>
          )}

        
          {Ordersucessmodel && (
            <OrderSuccessModal
              open={Ordersucessmodel}
              onClose={() => setOrdersucessmodel(false)}
              totalPrice={oneListData[0].basePrice}
            />
          )}
        </div>
      </div>
    </>
  );
}
