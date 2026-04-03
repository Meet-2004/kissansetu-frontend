import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCropData } from "../../Store/slices/cropSlice";




export default function PurchaseType(){

      const crop = useSelector((state) => state.crop.data.pricing);
      const dispatch =useDispatch();

     const [purchaseType, setpurchaseType] = useState("WHOLE_LOT_ONLY");

     const handleChange=(e)=>{
        
         dispatch(setCropData({ [e.target.name]: e.target.value }));
     }
     const handlePurchaseType=(purchaseType)=>{
         dispatch(setCropData({ purchaseType: purchaseType }));
     }

    return(
        <section>
            <div>
                <p className="text-gray-600 text-sm">How would you like buyers to purchase your crop?</p>
            </div>
            <div className="mt-6">

          <p className="text-black mb-2">Purchase Type</p>

          <div className="flex flex-col gap-3">

            <div className={`w-full border-2 border-gray-300 px-5 py-2 rounded-xl ${purchaseType==="WHOLE_LOT_ONLY"?"bg-lime-50 border-lime-500 border-2":""}`} >

            <label className="flex items-center gap-2 text-black">
              <input
                type="radio"
                checked={purchaseType === "WHOLE_LOT_ONLY"}
                onChange={() =>{setpurchaseType("WHOLE_LOT_ONLY");handlePurchaseType("WHOLE_LOT_ONLY")}}
              />
              Whole Lot Only
            </label>
            <p className="text-gray-600 text-sm ml-5 mt-2 ">Buyers must purchase the entire quantity you're listing. This is ideal when you want to sell all your produce in a single transaction. Example: If you list 1000 kg, the buyer must buy all 1000 kg.</p>
            </div>
                <div className={`w-full border-2 border-gray-300 px-5 py-2 rounded-xl ${purchaseType==="PARTIAL_ORDER_ALLOWS"?"bg-lime-50 border-lime-500 border-2":""}`} >

            <label className="flex items-center gap-2 text-black">
              <input
                type="radio"
                checked={purchaseType === "PARTIAL_ORDER_ALLOWS"}
                onChange={() =>{setpurchaseType("PARTIAL_ORDER_ALLOWS");handlePurchaseType("PARTIAL_ORDER_ALLOWS")}}
              />
              Partial Orders Allowed
            </label>
            <p className="text-gray-600 text-sm ml-5 mt-2 ">Buyers can purchase any quantity they need, as long as it meets your minimum order quantity (MOQ). This allows multiple buyers to purchase from your listing. Example: If you list 1000 kg with MOQ of 100 kg, buyers can order 100 kg, 250 kg, 500 kg, etc.</p>
          {/* MOQ */}
           {purchaseType === "PARTIAL_ORDER_ALLOWS" && (
               <>
                <hr className="text-gray-300 mt-5 w-full"/>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

              <div className="flex flex-col ml-5">
                <label className="text-black text-sm">
                  Minimum Order Quantity (MOQ) *
                </label>

                <input
                  type="text"
                  name="minimumOrderQuantity"
                  className="border border-gray-300 text-black mt-1 w-full rounded-lg h-10 px-4 bg-white "
                  placeholder="Enter minimum order quantity"
                  value={crop.minimumOrderQuantity}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-black text-sm">
                  Price Per Kg (MOQ) *
                </label>

                <input
                  type="text"
                  name="moqPricePerKg"
                  className="border border-gray-300 text-black mt-1 w-full rounded-lg h-10 px-4 bg-white"
                  placeholder="₹ Price Per Kg"
                  value={crop.moqPricePerKg}
                  onChange={handleChange}
                />
              </div>

            </div>
            </>
          )}
            </div>

          </div> 


            </div>
        </section>
    )
}