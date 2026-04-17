import Image from "next/image";
import { getApi } from "@/services/apiService";
import drone from "@/assets/dron.jpg";
import "@/app/globals.css";
import Right_Mark from "@/SVG/Dashboard/Right_Mark.svg";
import AcceptedBid from "../AcceptBid/AcceptedBid";
import {
  Clock,
  TrendingUp,
  Star,
  MapPin,
  Package,
  Calendar,
} from "lucide-react";
export default function ListingCard({
  item,
  openCropModal,
  setselectedList,
  viewModal,
  setbuyerSelection,
  openAcceptBid,
}) {
  console.log(item);
  const getImageUrl = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  return (
    <section className={``}>
      <div className="">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl ">
          {Array.isArray(item?.images) && item.images.length > 0 ? (
            <div className="h-[180px] relative">
              <Image
                src={`${getImageUrl(item.images[0].filePath)}`}
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
              {item.cropName}-{item.variety}
            </h3>

            <div className="flex items-center gap-2">
              <span className="bg-gray-100 text-gray-400 text-xs px-3 py-1 rounded-full text_black">
                {item.purchaseType}
              </span>
              <span className="bg-lime-100 text-lime-700 text-xs px-3 py-1 rounded-full text_black">
                {item.saleType}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="text-2xl text_lime font-semibold">
                  ₹{item.totalBasePrice}
                </span>
              </p>
              <p>
                <span className="">
                  ₹{item.pricePerKg} per {item.unit}
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
                <div className="flex gap-2">
                  <div className="flex gap-2 ">
                    <p className="flex justify-center items-center text-center">
                      <Package size={16} />
                    </p>
                    <p>Quantity:</p>
                  </div>

                  <span className="float-right text-black font-semibold">
                    {item.quantity} {item.unit}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <div className="flex gap-2 h-10">
                    <p className="flex  text-center">
                      <MapPin size={16} />
                    </p>
                    <p>Location:</p>
                  </div >

                  <span className="float-right text-black font-semibold w-full ">
                    {item.district}, {item.state}
                  </span>
                </div>
              </div>
              {item.minimumOrderQuantity && (
                <div className="bg-lime-50 border border-lime-200 rounded-lg px-3 py-2 mt-3 text_black">
                  MOQ: {item.minimumOrderQuantity}
                </div>
              )}
            </div>
            {item.highestBid !== null &&
            item.topBidderName !== null &&
            item.saleType === "AUCTION" ? (
              <div>
                <div className="border border-[#64B9004D] bg-[#64B9001A] flex h-30 w-full  flex-col align-item-flex-start gap-12px rounded-xl">
                  <div className="grid grid-cols-2 p-2 gap-5">
                    <div>
                      <p className="text-gray-600 text-sm">Leading Bid</p>
                      <p className="text-lg font-semibold mt-1 text_lime">
                        ₹{item.highestBid}
                      </p>
                    </div>
                    <div className="w-40">
                      <p className="font-semibold text-sm text-black">
                        {item.topBidderName}
                      </p>
                      {/* <p className="text-sm text-gray-500">2 hours ago</p> */}
                    </div>
                  </div>

                  <button
                    className="text-center"
                    onClick={() => {
                      openAcceptBid();
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
               <div className=" h-30 flex-col align-item-flex-start gap-12px rounded-xl">
                 {" "}
               </div>
              
            )}

            <div className=" pt-1 top-20 mb-3">
              <button
                className="border-2 w-full h-12 bg-lime-600 py-2 text-white rounded-lg hover:bg-lime-700 cursor-pointer"
                onClick={() => {
                  setselectedList(item);
                  openCropModal();
                }}
              >
                👁 View Listing
              </button>
              {/* <button className="w-[25%] border h-12 py-2 rounded-lg hover:bg-gray-50 text_black cursor-pointer">
                       ✏ Edit
                     </button> */}
            </div>
          </div>
        </div>

        {/* render modal conditionally and pass crop */}
        {/* {viewModal && selectedCrop && (
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
               setrefreshKey={setrefreshKey}
             />
           )} */}
      </div>
    </section>
  );
}
