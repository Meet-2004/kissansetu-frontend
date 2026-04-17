"use client";
import { useState, useRef } from "react";
import ProductDetail from "@/app/features/addCrop/ProductDetail";
import Media_Review from "@/app/features/addCrop/Media_Review";
import Qualiy_Location from "@/app/features/addCrop/Qualiy_Location";
import Quantity_Sale from "@/app/features/addCrop/Quantity_Sale";
import "../../../app/globals.css";
import { useSelector } from "react-redux";
import PurchaseType from "./PurchaseType";
import { useEffect } from "react";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "./Validations";
import { headFont } from "@/app/layout";

export default function FormLayout({ onClose }) {
  const crop = useSelector((state) => state.crop.data.pricing);
  console.log("this is crop saleType", crop.saleType);
  const isFixed = crop?.saleType === "FIXED";
  const [step, setStep] = useState(1);
  const submitRef = useRef(null);
  const [publishedClicked, setpublishedClicked] = useState(false);
  const [errors, setErros] = useState({});
  const [pageDetails, setPageDetails] = useState({});
  const [state, setState] = useState("idle");
  const [formChanging, setformChanging] = useState(false);

  // const handleClick = async () => {
  //   if (state !== "idle") return;

  //   setState("loading");

  //   // simulate API
  //   setTimeout(() => {
  //     setState("success");

  //     setTimeout(() => setState("idle"), 2500);
  //   }, 2500);
  // };

  const formData = useSelector((state) => state.crop.data);

  console.log("This is formdata at layout", formData);
  console.log("this is state at media review", state);

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

  const validations = (currentStep, data) => {
    try {
      // Validate only the current step's fields
      if (currentStep === 1) {
        step1Schema.parse(data?.product);
      } else if (currentStep === 2) {
        step2Schema.parse(data?.pricing);
      } else if (currentStep === 3 && isFixed) {
        // Step 3 is only for fixed sales
        step3Schema.parse(data?.pricing);
      } else if (
        (currentStep === 4 && isFixed) ||
        (currentStep === 3 && !isFixed)
      ) {
        // Step 4 for fixed, Step 3 for auction
        step4Schema.parse(data?.location);
      }

      return { success: true, errors: {} };
    } catch (err) {
      setformChanging(true);
      const nextErrors = {};
      console.log("Validation error:", err);
      console.log("This is steps",currentStep);

      if (err?.issues && Array.isArray(err.issues)) {
        err.issues.forEach((e) => {
          const field = e.path[0];
          nextErrors[field] = e.message;
        });
      }

      return { success: false, errors: nextErrors };
    }
  };
  console.log("steps", steps, step);

  const handleNext = () => {
    const result = validations(step, formData);

    console.log("Validation result:", result);

    if (result.success) {
      setStep((prev) => Math.min(prev + 1, steps.length));
      setErros({}); // Clear errors on success
    } else {
      setErros(result.errors);
      console.log("Validation errors:", result.errors);
    }
  };

  return (
    <div className="h-full flex flex-col ">
      {/* HEADER */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <h2 className={`text-xl sm:text-2xl text_black ${headFont.className}`}>
          Create New Listing
        </h2>

        <p className="text-black/70 mt-1 text-xs sm:text-sm">
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
                      className={`text-[10px] sm:text-xs mt-2 leading-tight md:max-w-30 max-w-13
                        ${active ? "text-black" : "text-gray-400"}
                      `}
                    >
                      {label}
                    </p>
                  </div>

                  {index !== steps.length - 1 && (
                    <div className="flex-1 h-7">
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
        <h3
          className={`text-lg sm:text-xl lg:text-2xl text_black  ${headFont.className}`}
        >
          {steps[step - 1]}
        </h3>
        {isFixed ? (
          <div className="rounded-lg flex flex-col ">
            {step === 1 && (
              <ProductDetail errors={errors} setPageDetails={setPageDetails} />
            )}
            {step === 2 && <Quantity_Sale errors={errors} />}
            {step === 3 && <PurchaseType errors={errors} />}
            {step === 4 && <Qualiy_Location errors={errors} />}
            {step === 5 && (
              <Media_Review
                publishedClicked={publishedClicked}
                setpublishedClicked={setpublishedClicked}
                onClose={onClose}
                setState={setState}
              />
            )}
          </div>
        ) : (
          <div className="rounded-lg flex flex-col ">
            {step === 1 && <ProductDetail errors={errors} />}
            {step === 2 && <Quantity_Sale errors={errors} />}
            {step === 3 && <Qualiy_Location errors={errors} />}
            {step === 4 && (
              <Media_Review
                publishedClicked={publishedClicked}
                setpublishedClicked={setpublishedClicked}
                onClose={onClose}
                setState={setState}
              />
            )}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="border-t px-4 sm:px-8 lg:px-16 py-4 ">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          {/* BACK BUTTON */}
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className=" cursor-pointer md:py-2  md:px-2 text-black md:text-black  md:h-10 md:w-25  rounded-lg border disabled:opacity-40 w-full sm:w-auto"
          >
            ← Back
          </button>

          {/* RIGHT BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center items-center">
            {/* <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg border w-full sm:w-auto">
              Save as Draft
            </button> */}

            {step === steps.length ? (
              // <button
              //   className="back_lime text-white md:h-10 md:w-25 md:px-1 md:py-1 px-6 sm:px-8 py-2 sm:py-3 rounded-lg w-full sm:w-auto text-center"
              //   onClick={() =>setpublishedClicked(true)}
              // >
              //   Publish
              // </button>
              <button
                onClick={() => setpublishedClicked(true)}
                // disabled={state !== "idle"}
                className={`
        btn-pro
        flex items-center justify-center
        h-12
        ${state === "loading" ? "w-[52px]" : "w-full px-6"}
        back_lime text-white font-semibold
        rounded-xl
        shadow-[0_10px_25px_rgba(0,0,0,0.15)]
      `}
              >
                {/* TEXT */}
                <span
                  className={`btn-text cursor-pointer ${state !== "idle" && "opacity-0 scale-90"}`}
                >
                  Publish
                </span>

                {/* LOADER */}
                {state === "loading" && (
                  <div className="absolute loader-box"></div>
                )}

                {/* SUCCESS */}
                {state === "success" && (
                  <span className="absolute success">✔ Published</span>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="back_lime cursor-pointer  text-white   md:px-1 md:py-1 md:h-10 md:w-25 sm:px-8 px-6  sm:py-3 rounded-lg w-full sm:w-auto"
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
