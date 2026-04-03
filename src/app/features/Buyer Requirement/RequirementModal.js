"use client";
import {useState} from "react";
import RequirementFormLayout from "./RequirementFormLayout.js"

export default function RequirementModal({
  closeRequirement
})

{
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 ">

      {/* MODAL */}
      <div className="
        bg-white 
        w-full
        md:min-w-[180vh]
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
          onClick={closeRequirement}
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
          <RequirementFormLayout closeRequirement={closeRequirement}   />
        </div>

      </div>
    </div>
  );
}