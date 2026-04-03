import { useState, useEffect } from "react";
// import FormLayout from "@/app/Dashboard/addCrop/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { setCropData } from "@/app/Store/slices/cropSlice";
import "@/app/globals.css";
import { getApi } from "@/services/apiService";
import CommonDropdown from "@/Components/layouts/commonDropdown";
import PurchaseType from "./PurchaseType";

export default function Quantity_Sale({ next, back, errors = {} }) {
  const crop = useSelector((state) => state.crop.data.pricing);
  const [saleType, setSaleType] = useState("AUCTION");
  const [units, setunits] = useState("");
  const[selectedUnits,setselectedUnits]=useState("");
  const [wholeTotalPrice, setwholeTotalPrice] = useState(null);
 

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const units = await getApi("/master/units");
      // console.log(crops.data);
      setunits(units.data);
    }
    fetchData();
  }, []);
  const handleUnit = (val) => {
    setselectedUnits(val);
    console.log(val.id);
    if (val && val.id) {
      dispatch(setCropData({unitId: val.id}));
    }
  };
  const handleChange = (e) => {
    dispatch(setCropData({ [e.target.name]: e.target.value }));
    dispatch(setCropData({ saleType: saleType }));
       dispatch(setCropData({ totalBasePrice: totalBasePrice }));
       dispatch(setCropData({ purchaseType: "WHOLE_LOT_ONLY" }));
    console.log(saleType);
  };
  const handleSaleType=(saleType)=>{
    setSaleType(saleType);
 dispatch(setCropData({ saleType: saleType }));
 console.log("this is sale type",saleType);
  }
  console.log("crop quantity", crop.quantity);
  console.log(crop);

  const today = new Date();
  const maxDate = new Date();

  maxDate.setDate(today.getDate() + 2);

  const formateDate = (date) => {
    return date.toISOString().slice(0, 16);
  };
  let totalBasePrice;

  if (crop.quantity && crop.pricePerKg) {
    console.log("hello", crop.quantity, crop.pricePerKg);
    totalBasePrice = crop.quantity * crop.pricePerKg;
  }
  console.log("TOTAL PRICE", totalBasePrice);

  // return (
  //   <>
  //     <section className="mt-5">
  //       <div>
  //         <form>
  //           <div className="flex gap-20  ">
  //             <div className="flex flex-col">
  //               <label id="quantity" className="text-black">
  //                 Total Quantity *
  //               </label>
  //               <input
  //                 type="text"
  //                 name="quantity"
  //                 className="text-black border border-black mt-1 min-w-sm max-w-lg rounded-lg h-11 px-4"
  //                 placeholder="Enter quantity"
  //                 value={crop.quantity}
  //                 onChange={handleChange}
  //               />
  //             </div>
  //             <div className="flex flex-col">
  //               <label id="quantity" className="text-black">
  //                 Unit
  //               </label>
  //               {/* <select className="border border-black text-black mt-1 min-w-sm max-w-lg rounded-lg h-11 px-4" value={crop.unit} name="unit" onChange={handleChange} >
  //                 <option className="text-black" disabled value="">
  //                   Select Unit
  //                 </option>
  //                 <option value="Kg">Kg</option>
  //                 <option value="Quintal">Quintal</option>
  //                 <option value="Ton">Ton</option>
  //               </select> */}
  //               <CommonDropdown
  //                 label="Units"
  //                 options={units}
  //                 value={selectedUnits}
  //                 name="unitId"
  //                 onChange={(val) => handleUnit(val)}
  //               />
  //             </div>
  //           </div>
  //           <div className="mt-5">
  //             <p className="text-black">Purchase Type</p>
  //             <div className="gap-50 ">
  //               <div className="gap-10 py-1 ">
  //                 <input
  //                   className="border border-black "
  //                   type="radio"
  //                   checked={purchaseType === "WHOLE_LOT_ONLY"}
  //                   onChange={() => setpurchaseType("WHOLE_LOT_ONLY")}
  //                 />
  //                 <label className="text-black ml-2">Whole Lot Only</label>
  //               </div>
  //               <div className="gap-20">
  //                 <input
  //                   className="border border-black "
  //                   type="radio"
  //                   checked={purchaseType === "PARTIAL_ORDER_ALLOWS"}
  //                   onChange={() => setpurchaseType("PARTIAL_ORDER_ALLOWS")}
  //                 />
  //                 <label className="text-black ml-2">
  //                   Partial Orders Allowed
  //                 </label>
  //               </div>
  //               {purchaseType === "PARTIAL_ORDER_ALLOWS" && (
  //                 <div className="flex mt-2 ml-10 gap-20 ">
  //                   <div className="flex flex-col">
  //                     <label id="price_kg" className="text-black">
  //                       Minimum Order Quantity (MOQ) *
  //                     </label>
  //                     <input
  //                       type="text"
  //                       name="minimumOrderQuantity"
  //                       className="border border-black w-100 py-5 text-black mt-1 min-w-sm max-w-lg rounded-lg h-11 px-4"
  //                       placeholder="Enter minimum order quantity"
  //                       value={crop.minimumOrderQuantity}
  //                       onChange={handleChange}
  //                     />
  //                   </div>
  //                   <div className="flex flex-col">
  //                     <label id="bid_increment" className="text-black">
  //                       Price Per kg (MOQ) *
  //                     </label>
  //                     <input
  //                       type="text"
  //                       name="moqPricePerKg"
  //                       className="border border-black w-100  py-5  text-black mt-1 min-w-sm max-w-lg rounded-lg h-11 px-4"
  //                       placeholder="₹Price Per kg"
  //                       value={crop.moqPricePerKg}
  //                       onChange={handleChange}
  //                     />
  //                   </div>
  //                 </div>
  //               )}{" "}
  //               <hr className="mt-5" />
  //             </div>
  //           </div>
  //           <div className="text-black  mt-5 cursor-pointer  ">
  //             Sale Type
  //             {saleType === "AUCTION" && (
  //               <div className="mt-2 ">
  //                 <div className="border-black w-55 h-15 border flex flex-col justify-center items-center py-1 rounded-lg">
  //                   <div className="border-black w-53 h-12  flex rounded-lg ">
  //                     <p className="back_lime text-white w-[50%] px-2 py-2 rounded-lg text-center flex justify-center items-center h-12">
  //                       Auction
  //                     </p>
  //                     <p
  //                       className="bg-white text-black w-[50%] px-2 py-2 text-center h-12 flex justify-center items-center"
  //                       onClick={() => setSaleType("FIXED")}
  //                     >
  //                       Fixed Price
  //                     </p>
  //                   </div>
  //                 </div>

  //                 <div className="flex flex-col mt-3">
  //                   <div className="flex mt-1 gap-20">
  //                     <div className="flex flex-col">
  //                       <label id="price_kg">Price Per Kg</label>
  //                       <input
  //                         type="text"
  //                         name="pricePerKg"
  //                         className="border border-black w-100   mt-1 min-w-sm max-w-lg rounded-lg h-11 px-4"
  //                         placeholder="Enter Price Per Kg"
  //                         value={crop.pricePerKg}
  //                         onChange={handleChange}
  //                       />
  //                     </div>
  //                     <div className="flex flex-col">
  //                       <label id="bid_increment">Minimum Bid Increment</label>
  //                       <input
  //                         type="text"
  //                         name="minimumBidIncrement"
  //                         className="border border-black w-100 mt-1 min-w-sm max-w-lg rounded-lg h-11 px-4"
  //                         placeholder="Minimum Bid Increment"
  //                         value={crop.minimumBidIncrement}
  //                         onChange={handleChange}
  //                       />
  //                     </div>
  //                   </div>
  //                   <div>
  //                     {totalBasePrice && (
  //                       <div className="grid grid-cols-2  border rounded-lg mt-5 w-[94%] px-5 py-2 gradient">
  //                         <div>
  //                           <p className="">Price Per kg</p>
  //                           <p className="text-2xl ">₹{crop.pricePerKg}</p>
  //                         </div>
  //                         <div>
  //                           <p>Total Base Price</p>
  //                           <p className="text-2xl text_lime">
  //                             ₹{totalBasePrice}
  //                           </p>
  //                         </div>
  //                       </div>
  //                     )}
  //                   </div>

  //                   <div className="flex mt-3 gap-20">
  //                     <div className="flex flex-col">
  //                       <label id="auction_End">Auction End Date</label>
  //                       <input
  //                         // type="time"
  //                         type="datetime-local"
  //                         name="auctionEndTime"
  //                         className="border border-black w-100 mt-1 min-w-sm max-w-lg rounded-lg h-11 px-4"
  //                         placeholder="Enter Price Per Kg"
  //                         value={crop.auctionEndTime}
  //                         min={formateDate(today)}
  //                         max={formateDate(maxDate)}
  //                         onChange={handleChange}
  //                       />
  //                     </div>
  //                     {/* <div className="flex flex-col">
  //                       <label id="bid_Duration">Bidding Duration</label>
  //                       <input
  //                         type="text"
  //                         name="bid_Duration"
  //                         className="border border-black w-100 px-5 py-5 h-10"
  //                         placeholder="Bidding Duration"

  //                       />
  //                     </div> */}
  //                   </div>
  //                 </div>
  //                 {/* { totalBasePrice && <div>totalBasePrice:{totalBasePrice}</div>} */}
  //               </div>
  //             )}
  //             {saleType === "FIXED" && (
  //               <div className="mt-2">
  //                 <div className="border-black w-62 h-15 border flex flex-col justify-center items-center py-1 rounded-lg">
  //                   <div className="border-black w-60 h-12 flex  rounded-lg ">
  //                     <p
  //                       className="bg-white text-black w-[50%] px-2 py-2 text-center  h-12 flex justify-center items-center "
  //                       onClick={() => setSaleType("AUCTION")}
  //                     >
  //                       Auction
  //                     </p>
  //                     <p className="back_lime text-white w-[50%] px-2 py-2 rounded-lg text-center flex justify-center items-center h-12">
  //                       Fixed Price
  //                     </p>
  //                   </div>
  //                 </div>

  //                 <div className="mt-2">
  //                   <div className="flex flex-col mt-3">
  //                     <label id="bid_Duration">Price Per Kg</label>
  //                     <input
  //                       type="text"
  //                       name="pricePerKg"
  //                       className="border border-black w-100 mt-1 min-w-sm max-w-lg rounded-lg h-11 px-4"
  //                       placeholder="Price Per Kg"
  //                       value={crop.pricePerKg}
  //                       onChange={handleChange}
  //                     />
  //                   </div>
  //                 </div>
  //                 {totalBasePrice > 0 && (
  //                   <div>totalBasePrice:{totalBasePrice}</div>
  //                 )}
  //               </div>
  //             )}
  //           </div>
  //         </form>
  //       </div>
  //     </section>
  //   </>
  // );

  return (
  <>
    <section className="mt-5">
      <form>

        {/* QUANTITY + UNIT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="flex flex-col">
            <label className="text-black">Total Quantity *</label>

            <input
              type="text"
              name="quantity"
              className="text-black border border-gray-300 mt-1 w-full rounded-lg h-11 px-4"
              placeholder="Enter quantity"
              value={crop.quantity}
              onChange={handleChange}
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-black">Unit</label>

            <CommonDropdown
              label="Units"
              options={units}
              value={selectedUnits}
          
              name="unitId"
              onChange={(val) => handleUnit(val)}
            />
              {errors.unitId && (
              <p className="mt-1 text-sm text-red-600">{errors.unitId}</p>
            )}
          </div>

        </div>


        {/* PURCHASE TYPE */}
        {/* <div className="mt-6">

          <p className="text-black mb-2">Purchase Type</p>

          <div className="flex flex-col gap-3">

            <label className="flex items-center gap-2 text-black">
              <input
                type="radio"
                checked={purchaseType === "WHOLE_LOT_ONLY"}
                onChange={() => setpurchaseType("WHOLE_LOT_ONLY")}
              />
              Whole Lot Only
            </label>

            <label className="flex items-center gap-2 text-black">
              <input
                type="radio"
                checked={purchaseType === "PARTIAL_ORDER_ALLOWS"}
                onChange={() => setpurchaseType("PARTIAL_ORDER_ALLOWS")}
              />
              Partial Orders Allowed
            </label>

          </div> */}


          {/* MOQ */}
          {/* {purchaseType === "PARTIAL_ORDER_ALLOWS" && (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

              <div className="flex flex-col">
                <label className="text-black">
                  Minimum Order Quantity (MOQ) *
                </label>

                <input
                  type="text"
                  name="minimumOrderQuantity"
                  className="border border-gray-300 text-black mt-1 w-full rounded-lg h-11 px-4"
                  placeholder="Enter minimum order quantity"
                  value={crop.minimumOrderQuantity}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-black">
                  Price Per Kg (MOQ) *
                </label>

                <input
                  type="text"
                  name="moqPricePerKg"
                  className="border border-gray-300 text-black mt-1 w-full rounded-lg h-11 px-4"
                  placeholder="₹ Price Per Kg"
                  value={crop.moqPricePerKg}
                  onChange={handleChange}
                />
              </div>

            </div>
          )}

          <hr className="mt-6" /> */}

        {/* </div> */}


        {/* SALE TYPE */}
        <div className="text-black mt-6">

          <p className="mb-2">Sale Type</p>


          {/* TOGGLE */}
          <div className="border rounded-lg inline-flex overflow-hidden">

            <button
              className={`px-6 py-2 ${
                saleType === "AUCTION"
                  ? "back_lime text-white"
                  : "bg-white text-black"
              }`}
              onClick={() =>{setSaleType("AUCTION");handleSaleType("AUCTION")}}
              type="button"
            >
              Auction
            </button>

            <button
              className={`px-6 py-2 ${
                saleType === "FIXED"
                  ? "back_lime text-white"
                  : "bg-white text-black"
              }`}
              onClick={() =>{setSaleType("FIXED");handleSaleType("FIXED")}}
              type="button"
            >
              Fixed Price
            </button>

          </div>


          {/* AUCTION */}
          {saleType === "AUCTION" && (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

              <div className="flex flex-col">
                <label>Price Per Kg</label>

                <input
                  type="text"
                  name="pricePerKg"
                  className="border border-gray-300 mt-1 w-full rounded-lg h-11 px-4"
                  placeholder="Enter Price Per Kg"
                  value={crop.pricePerKg}
                  onChange={handleChange}
                />
                {errors.pricePerKg && (
                  <p className="mt-1 text-sm text-red-600">{errors.pricePerKg}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label>Minimum Bid Increment</label>

                <input
                  type="text"
                  name="minimumBidIncrement"
                  className="border border-gray-300 mt-1 w-full rounded-lg h-11 px-4"
                  placeholder="Minimum Bid Increment"
                  value={crop.minimumBidIncrement}
                  onChange={handleChange}
                />
              </div>


              <div className="flex flex-col">
                <label>Auction End Date</label>

                <input
                  type="datetime-local"
                  name="auctionEndTime"
                  className="border border-gray-300 mt-1 w-full rounded-lg h-11 px-4"
                  value={crop.auctionEndTime}
                  min={formateDate(today)}
                  max={formateDate(maxDate)}
                  onChange={handleChange}
                />
              </div>

            </div>
          )}


          {/* FIXED */}
          {saleType === "FIXED" && (

            <div className="mt-5 flex flex-col">

              <label>Price Per Kg</label>

              <input
                type="text"
                name="pricePerKg"
                className="border border-gray-300 mt-1 w-full rounded-lg h-11 px-4"
                placeholder="Price Per Kg"
                value={crop.pricePerKg}
                onChange={handleChange}
              />

            </div>
          )}

        </div>

      </form>
    </section>
  </>
);
}
