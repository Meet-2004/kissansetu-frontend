import Requirements_Lime from "@/SVG/Dashboard/Requirements_Lime.svg"
import Image from "next/image"
export default function ZeroRequirementsLayouts(){
    return(
        <>
          {/* Buyer Requirements */}
     

      <div className="bg-[#f8f8f8] rounded-xl p-6 md:p-10 text-center shadow-sm">
        
        <div className="w-25 h-25 mx-auto mb-4 rounded-full bg-[#64B90020] flex items-center justify-center  text-green-600 text-xl">
          <Image src={Requirements_Lime} alt="Requirements_Lime" className="p-2 h-20 w-20" />
        </div>

        <h4 className="text-lg font-semibold mb-2 text-[#1F2937]">
          No buyer requirements yet
        </h4>

        <p className="text-xs text-[#6B7280] max-w-md mx-auto ">
          Once the buyers will put up their requirements, they will appear here.
        </p>
      </div>
      </>
    )
}