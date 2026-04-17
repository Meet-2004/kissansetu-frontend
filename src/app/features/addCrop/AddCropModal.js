// "use client";
// import FormLayout from "./FormLayout.js";



// export default function AddCropModal({ setOpenCropList, openCropList,setrefreshKey,refreshKey}) {
// //   if (!openCropList) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

//       <div className="bg-white min-w-6xl min-h-100 max-h-175 rounded-2xl shadow-2xl overflow-hidden">

//         {/* CLOSE BUTTON */}
//         <div className="flex justify-end relative top-5 right-10">
//           <button
//             onClick={() => {setOpenCropList(false);setrefreshKey(refreshKey+1)}}
//             className="text-2xl text-gray-500 hover:text-black absolute"
//           >
//             ✕
//           </button>
//         </div>

//         {/* FORM LAYOUT */}
//         <FormLayout  />

//       </div>
//     </div>
//   );
// }

"use client";
import FormLayout from "./FormLayout.js";
import {useState} from "react";

export default function AddCropModal({
  setOpenCropList,
  openCropList,
  setrefreshKey,
  refreshKey,
})

{
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 ">

      {/* MODAL */}
      <div className="
        bg-white 
        w-full
        md:min-w-[150vh]
        max-w-[200vh]
        sm:w-[90%] 
        lg:w-[70%] 
        xl:w-[60%] 
        max-h-[120vh] 
        rounded-2xl 
        shadow-2xl 
        overflow-hidden
        relative
        
      ">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => {
            setOpenCropList(false);
          }}
          className="
            absolute 
            top-4 
            right-4 
            text-xl 
            text-gray-500 
            hover:text-black
            cursor-pointer
          "
        >
          ✕
        </button>

        {/* FORM */}
        <div className=" max-h-[120vh]">
          <FormLayout onClose={()=>{setrefreshKey(refreshKey + 1);setOpenCropList(false)}} />
        </div>

      </div>
    </div>
  );
}