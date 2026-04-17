import plus from "@/SVG/Dashboard/Plus.svg";
import Image from "next/image";
import plus_lime from  "@/SVG/Dashboard/Plus_Lime.svg"
import hammerLime from "@/SVG/Dashboard/Lime_Hammer.svg"
import acceptLime from "@/SVG/Dashboard/accept_lime.svg"
export default function ZeroListingLayout({setOpenCropList}) {

    console.log("setOpenCropList on zero list",setOpenCropList);
  return (
   
<>
      <div className="bg-[#f8f8f8] rounded-xl p-4 md:p-6 shadow-sm mb-6">
        
        <p className=" mb-4  md:text-base text-[#1F2937]">
          Start Using KisanSetu in 3 Simple Steps
        </p>

        {/* Step 1 */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg  bg-[#64B90020] flex items-center justify-center p-2 font-bold">
        <Image src={plus_lime} alt="Plus" className="text-lime-600" />
          </div>
          <div>
            <h4 className="text-sm   text-[#1F2937]" >
              Create a Crop Listing
            </h4>
            <p className="text-xs text-[#6B7280]">
              Add your crop with details and photos
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-[#64B90020] flex items-center justify-center p-2">
            <Image src={hammerLime} alt="hammerLime" />
          </div>
          <div>
            <h4 className="text-sm   text-[#1F2937]">
              Receive Bids from Buyers
            </h4>
            <p className="text-xs text-[#6B7280]">
              Buyers will place competitive bids
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg  bg-[#64B90020] flex items-center justify-center p-2">
            <Image src={acceptLime} alt="acceptLime" />
          </div>
          <div>
            <h4 className="text-sm   text-[#1F2937]">
              Accept the Best Offer
            </h4>
            <p className="text-xs text-[#6B7280]">
              Choose the highest or best bid
            </p>
          </div>
        </div>

        {/* Button */}
        
        <button className="mt-2 flex gap-2 back_lime hover:bg-lime-700 text-white text-sm px-4 py-2 rounded-md transition w-full md:w-auto cursor-pointer" onClick={setOpenCropList}>
          <Image src={plus} alt="Plus" /> Add Your First Crop Listing
        </button>
      </div>

    
</>
    // </div>
  );
}

