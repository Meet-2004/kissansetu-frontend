"use client";
import { useState, useRef } from "react";
import "../../../app/globals.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import CropDetail from "@/app/features/Buyer Requirement/CropDetails";
import QuantityBudget from "./QuantityBudget";
import DeliveryTimeline from "./DeliveryTimeline";
import ReviewSubmit from "./ReviewSubmit";
import { headFont } from "@/app/layout";
import { cropDetailSchema, quantityBudgetSchema,locationDeadlineSchema} from "./Validations";


export default function RequirementFormLayout({ closeRequirement }) {
  const requirements = useSelector((state) => state.requirements.form);  // console.log("this is crop saleType",crop.saleType)
  const [step, setStep] = useState(1);
  const submitRef = useRef(null);
  const [publishedClicked, setpublishedClicked] = useState(false);
  const [errors,setErrors]=useState();

  const steps = [
    "Crop Details",
    "Quantity & Budget",
    "Delivery & Timeline",
    "Review & Submit",
   
  ];

  useEffect(() => {
    if (step > steps.length) {
      setStep(steps.length);
    }
  }, [step, steps.length]);

  const validations=(currentStep,obj)=>{
    
    try{
     if(currentStep === 1){
      cropDetailSchema.parse(obj);
    }
    else if(currentStep === 2){
      quantityBudgetSchema.parse(obj);


    }else if(currentStep===3){
      locationDeadlineSchema.parse(obj);
    }
    return {success:true,errors:{}}
  }catch(err){

    const nextErrors={};
    if(err?.issues && Array.isArray(err?.issues)){
      err?.issues.forEach((err)=>{
        const field=err.path[0];
        nextErrors[field]=err?.message;

      })
    }

 return {success:false,errors:nextErrors}
  }
    
  }
  const handleNext =()=>{
const result = validations(step,requirements);
    if(result.success){
      setErrors({});
      setStep(step+1);

    }
    else{
      setErrors(result.errors);
    }
   

  }



  return (
    <div className="h-full flex flex-col ">
      {/* HEADER */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <h2 className= {`${headFont.className} text-xl sm:text-2xl  text_black `}>
          Post Buying Requirement
        </h2>

         <p className="text-gray-500">Steps {step} of {steps.length}</p>
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
                  className={`flex  h-full items-center ${index !== steps.length - 1 ? "flex-1" : ""}`}
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
                      className={`text-[10px] sm:text-xs mt-2 leading-tight md:max-w-15 max-w-13 xs:max-w-2
                        ${active ? "text-black" : "text-gray-400"}
                      `}
                    >
                      {label}
                    </p>
                  </div>

                  {index !== steps.length - 1 && (
                    <div className="flex-1 h-10">
                    <div className=" h-[2px] bg-gray-300 top-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="px-4 sm:px-8 lg:px-16 py-6 flex-1 overflow-y-scroll max-h-85">
        <h3 className="text-lg sm:text-xl lg:text-2xl  text_black mb-4">
          <p className={`${headFont.className}`}>{steps[step - 1]}</p>
        </h3>

        <div className="rounded-lg flex flex-col ">
          {step === 1 && <CropDetail errors={errors} />}
          {step === 2 && <QuantityBudget errors={errors} />}
          {step === 3 && <DeliveryTimeline errors={errors} />}
          {step === 4 && (
            <ReviewSubmit
              publishedClicked={publishedClicked}
              setpublishedClicked={setpublishedClicked}
              closeRequirement={closeRequirement}
            />
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t px-4 sm:px-8 lg:px-16 py-4 ">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
         <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className=" cursor-pointer md:py-2 md:px-2 text-black md:text-black  md:h-10 md:w-25  rounded-lg border disabled:opacity-40 w-full sm:w-auto"
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
                className="back_lime cursor-pointer text-white md:h-10 md:w-25 md:px-1 md:py-1 px-6 sm:px-8 py-2 sm:py-3 rounded-lg w-full sm:w-auto text-center"
                onClick={() => setpublishedClicked(true)}
              >
                Publish
              </button>
            ) : (
              <button
                // onClick={() =>
                //   setStep((prev) => Math.min(prev + 1, steps.length))
                // }
                onClick={handleNext}
                className="back_lime  text-white cursor-pointer   md:px-1 md:py-1 md:h-10 md:w-25 sm:px-8 px-6  sm:py-3 rounded-lg w-full sm:w-auto"
              >
                Next
              </button>
            )}
          </div>
            {/* BACK BUTTON */}
         
        </div>
      </div>
    </div>
  );
}
