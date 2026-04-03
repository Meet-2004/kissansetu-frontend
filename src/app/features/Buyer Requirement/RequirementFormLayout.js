"use client";
import { useState, useRef } from "react";
import ProductDetail from "@/app/features/addCrop/ProductDetail";
import Media_Review from "@/app/features/addCrop/Media_Review";
import Qualiy_Location from "@/app/features/addCrop/Qualiy_Location";
import Quantity_Sale from "@/app/features/addCrop/Quantity_Sale";
import "../../../app/globals.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import CropDetail from "@/app/features/Buyer Requirement/CropDetails";
import QuantityBudget from "./QuantityBudget";
import DeliveryTimeline from "./DeliveryTimeline";
import ReviewSubmit from "./ReviewSubmit"




export default function RequirementFormLayout({closeRequirement}) {

const crop = useSelector((state) => state.crop.data.pricing);
// console.log("this is crop saleType",crop.saleType)
const isFixed = crop?.saleType === "FIXED";
const [step, setStep] = useState(1);
const submitRef = useRef(null);
const [publishedClicked,setpublishedClicked]=useState(false);


const steps = isFixed
  ? [
      "Product Details",
      "Quantity & Pricing",
      "Purchase Type",
      "Quality & Location",
      "Media & Review",
    ]
  : [
      "Product Details",
      "Quantity & Pricing",
      "Quality & Location",
      "Media & Review",
    ];

  
   
 

useEffect(() => {
    if (step > steps.length) {
      setStep(steps.length);
    }
  }, [step, steps.length]);

  return (
    <div className="h-full flex flex-col ">

      {/* HEADER */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-xl sm:text-2xl font-semibold text_black">
          Create New Listing
        </h2>

        <p className="text-gray-500 text-xs sm:text-sm">
          List your crop for auction or fixed price sale
        </p>
      </div>

      {/* STEPPER */}
      <div className="gradient w-full">

        <div className="py-5 px-4 sm:px-8 lg:px-16">

          <div className="flex items-center justify-between">

            {steps.map((label, index) => {

              const num = index + 1;
              const active = step === num;
              const done = step > num;

              return (
                <div
                  key={index}
                  className={`flex items-center ${index !== steps.length - 1 ? "flex-1" : ""}`}
                >

                  <div className="flex flex-col items-center text-center">

                    <div
                      className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold
                      ${
                        active || done
                          ? "back_lime text-white"
                          : "bg-white border text-gray-400"
                      }`}
                    >
                      {num}
                    </div>

                    <p
                      className={`text-[10px] sm:text-xs mt-2 leading-tight max-w-[70px] sm:max-w-none
                        ${active ? "text-black" : "text-gray-400"}
                      `}
                    >
                      {label}
                    </p>

                  </div>

                  {index !== steps.length - 1 && (
                    <div className="flex-1 h-[2px] bg-gray-300 mx-2 sm:mx-4" />
                  )}

                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="px-4 sm:px-8 lg:px-16 py-6 flex-1 overflow-y-scroll max-h-85">

        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text_black mb-4">
          {steps[step - 1]}
        </h3>
{  isFixed ? (
        <div className="rounded-lg flex flex-col ">
          {step === 1 && <CropDetail />}
          {step === 2 && <QuantityBudget />}
          {step === 4 && <DeliveryTimeline />}
          {step === 5 && <ReviewSubmit publishedClicked={publishedClicked} setpublishedClicked={setpublishedClicked} closeRequirement={closeRequirement} />}
            </div>
) :    (
        <div className="rounded-lg flex flex-col ">
          {step === 1 && <CropDetail />}
          {step === 2 && <QuantityBudget/>}
          {step === 3 && <DeliveryTimeline />}
          {step === 4 && <ReviewSubmit  publishedClicked={publishedClicked} closeRequirement={closeRequirement} setpublishedClicked={setpublishedClicked}/>}
           </div>
)
}

      </div>

      {/* FOOTER */}
      <div className="border-t px-4 sm:px-8 lg:px-16 py-4 ">

        <div className="flex flex-col sm:flex-row justify-between gap-3">

          {/* BACK BUTTON */}
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-4 md:py-2 md:px-2 text-black md:text-black sm:px-6 md:h-10 md:w-25 py-2 sm:py-3 rounded-lg border disabled:opacity-40 w-full sm:w-auto"
          >
            ← Back 
          </button>

          {/* RIGHT BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center items-center">

            {/* <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg border w-full sm:w-auto">
              Save as Draft
            </button> */}

            {step === steps.length ? (
              <button
                className="back_lime text-white md:h-10 md:w-25 md:px-1 md:py-1 px-6 sm:px-8 py-2 sm:py-3 rounded-lg w-full sm:w-auto text-center"
                onClick={() =>setpublishedClicked(true)}
              >
                Publish
              </button>
            ) : (
              <button
                onClick={() => setStep((prev) => Math.min(prev + 1, steps.length))}
                className="back_lime  text-white   md:px-1 md:py-1 md:h-10 md:w-25 sm:px-8 px-6  sm:py-3 rounded-lg w-full sm:w-auto"
              >
                Next
              </button>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}