"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCropData, resetCrop } from "../../Store/slices/cropSlice";
import { ToastContainer, toast } from "react-toastify";
// import FormLayout from "../../Dashboard/addCrop/FormLayout";
import Image from "next/image";
``;
import { postMultipartApi } from "@/services/apiService";
import Toast from "@/Components/Alert/Toast";

export default function Media_Review({
  back,
  closeModal,
  setpublishedClicked,
  publishedClicked,
  onClose,
  state,
  setState,
}) {
  console.log("this is state at media review", state);
  console.log("this is published clicked", publishedClicked);
  const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];
  const ALLOWED_PDF_TYPE = "application/pdf";
  const MAX_PDF_SIZE_BYTES = 5 * 1024 * 1024;

  const dispatch = useDispatch();
  const cropData = useSelector((state) => state.crop);

  const product = cropData?.data?.product || {};
  const pricing = cropData?.data?.pricing || {};
  const location = cropData?.data?.location || {};
  const descriptionState = cropData?.data?.description;
  const descriptionValue =
    typeof descriptionState === "string"
      ? descriptionState
      : descriptionState?.description || "";

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewItems, setPreviewItems] = useState([]);
  const [imageError, setImageError] = useState("");
  const [activePreviewUrl, setActivePreviewUrl] = useState("");

  const selectedFilesRef = useRef([]);
  const previewUrlsRef = useRef([]);

  const selectedPdfRef = useRef([]);
  const previewPdfUrlsRef = useRef([]);
  const [selectedPdf, setSelectedPdf] = useState([]);
  const [pdfError, setPdfError] = useState("");
  const [pdfPreview, setPdfPreview] = useState([]);
  const [activePdfPreviewUrl, setActivePdfPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors,setErrors]=useState({})

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      previewPdfUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);



  const syncImagesToRedux = (files) => {
    const serializableImages = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));

    dispatch(setCropData({ imageFiles: serializableImages }));
  };

  const syncPDFtoRedux = (files) => {
    const serializablePdf = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));

    dispatch(setCropData({ certificateFile: serializablePdf }));
  };

  const clearAllImages = () => {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    previewUrlsRef.current = [];
    selectedFilesRef.current = [];
    setSelectedFiles([]);
    setPreviewItems([]);
    setImageError("");
    syncImagesToRedux([]);
  };

  const clearAllPDF = () => {
    previewPdfUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    previewPdfUrlsRef.current = [];
    selectedPdfRef.current = [];
    setSelectedPdf([]);
    setPdfPreview([]);
    setPdfError("");
    syncPDFtoRedux([]);
  };

  const removeSingleImage = (indexToRemove) => {
    const nextFiles = selectedFilesRef.current.filter(
      (_, index) => index !== indexToRemove,
    );
    const removedItem = previewItems[indexToRemove];

    if (removedItem?.url) {
      URL.revokeObjectURL(removedItem.url);
      previewUrlsRef.current = previewUrlsRef.current.filter(
        (url) => url !== removedItem.url,
      );
    }

    selectedFilesRef.current = nextFiles;
    setSelectedFiles(nextFiles);
    setPreviewItems((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
    setImageError("");
    syncImagesToRedux(nextFiles);
  };

  const singlePDFremove = (indexToRemove) => {
    const nextFiles = selectedPdfRef.current.filter(
      (_, index) => index !== indexToRemove,
    );
    const removedPdf = pdfPreview[indexToRemove];

    if (removedPdf?.url_Pdf) {
      URL.revokeObjectURL(removedPdf.url_Pdf);
      previewPdfUrlsRef.current = previewPdfUrlsRef.current.filter(
        (url) => url !== removedPdf.url_Pdf,
      );
    }

    selectedPdfRef.current = nextFiles;
    setSelectedPdf(nextFiles);
    setPdfPreview((prev) => prev.filter((_, index) => index !== indexToRemove));
    setPdfError("");
    syncPDFtoRedux(nextFiles);
  };

  const openFullPreview = (url) => {
    setActivePreviewUrl(url);
  };

  const closeFullPreview = () => {
    setActivePreviewUrl("");
  };

  const openFullPdfPreview = (url) => {
    setActivePdfPreviewUrl(url);
  };

  const handleImage = (e) => {
    setErrors((prev)=>({...prev,image:""}));
    const newFiles = Array.from(e.target.files || []);
    if (!newFiles.length) return;

    const validFiles = [];
    const rejectedFiles = [];

    newFiles.forEach((file) => {
      const isAllowedType = ALLOWED_IMAGE_TYPES.includes(file.type);
      const isAllowedSize = file.size <= MAX_IMAGE_SIZE_BYTES;

      if (isAllowedType && isAllowedSize) {
        validFiles.push(file);
      } else {
        rejectedFiles.push(file.name);
      }
    });

    if (!validFiles.length) {
      setImageError("Only JPG/PNG images up to 2 MB are allowed.");
      e.target.value = "";
      return;
    }

    if (rejectedFiles.length) {
      setImageError(`Skipped invalid file(s): ${rejectedFiles.join(", ")}`);
    } else {
      setImageError("");
    }

    const nextFiles = [...selectedFilesRef.current, ...validFiles];
    const newPreviewItems = validFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
      url: URL.createObjectURL(file),
    }));

    previewUrlsRef.current.push(...newPreviewItems.map((item) => item.url));
    selectedFilesRef.current = nextFiles;
    setSelectedFiles(nextFiles);
    setPreviewItems((prev) => [...prev, ...newPreviewItems]);
    syncImagesToRedux(nextFiles);
    e.target.value = "";
  };

  const handlePdf = (e) => {
    setErrors((prev)=>({...prev,pdf:""}));
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== ALLOWED_PDF_TYPE || file.size > MAX_PDF_SIZE_BYTES) {
      setPdfError("Only PDF up to 5 MB");
      e.target.value = "";
      return;
    }

    previewPdfUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    const previewUrl = URL.createObjectURL(file);
    const previewItem = {
      id_Pdf: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
      url_Pdf: previewUrl,
      name: file.name,
    };

    previewPdfUrlsRef.current = [previewUrl];
    selectedPdfRef.current = [file];
    setSelectedPdf([file]);
    setPdfPreview([previewItem]);
    setPdfError("");
    syncPDFtoRedux([file]);
    e.target.value = "";
  };

  const handleDesc = (e) => {
    dispatch(setCropData({ description: e.target.value }));
  };
  console.log("crop data", cropData);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    // if (state !== "idle") return;
    console.log("this is selected image file noted it ",selectedFilesRef.current);
    if( selectedFilesRef.current.length <= 0 || selectedPdfRef.current.length <= 0 ){
      console.log("hello i am inside okay  ")

      if(selectedFilesRef.current.length <= 0 && selectedPdfRef.current.length <= 0){
        console.log("condition first")
         setErrors({image:"Please Upload at least one Image",pdf:"Please Upload Pdf"})
     
      }else if(selectedFilesRef.current.length <= 0){
         console.log("condition second")
         setErrors({image:"Please Upload at least one Image"})
      }else{
           console.log("condition third")
        setErrors({pdf:"Please Upload Pdf"})
      }
       setState("idle");
         setpublishedClicked(false);
      return ;
    }
    console.log("this is errors",errors)
    setIsSubmitting(true);
    const formData = new FormData();

    selectedFilesRef.current.forEach((file) =>
      formData.append("imageFiles", file),
    );

    if (selectedPdfRef.current[0]) {
      formData.append("certificateFile", selectedPdfRef.current[0]);
    }
    formData.append("data", JSON.stringify(cropData.data));
    console.log("imageFiles count:", formData.getAll("imageFiles").length);
    console.log("certificateFile:", formData.get("certificateFile"));

    try {
      //   const result = await handleApi(() =>
      //     axios.post(`${process.env.NEXT_PUBLIC_API_URL}/listings`, formData),
      // );

      // setpublishedClicked(false);
      setState("loading");
      const result = await postMultipartApi("/listings", formData, {
        withcredentials: true,
      });
      console.log("API response:", result);

      if (result.success) {
        // alert("Listing Published Successfully!");
        setTimeout(() => {
          setState("success");

          setTimeout(() => setState("idle"), 2500);
        }, 2500);
        console.log(result);
        setIsSubmitting(false);
        toast.success(result.message);
        console.log("this is result message", result.message);
        localStorage.removeItem("persist:crop");
        clearAllImages();
        clearAllPDF();
        closeModal?.();
        setpublishedClicked(false);
        setTimeout(() => {
          dispatch(resetCrop());
          onClose?.();
        }, 4000);
      } else {
          setpublishedClicked(false);
           setIsSubmitting(false);
         setState("idle")
        toast.error(result.message);
      }
    } catch (err) {
        setpublishedClicked(false);
         setIsSubmitting(false);
      setState("idle")
      toast.error(err?.message || "Failed to publish listing");
     
      // console.log("hello error")
      // console.log(err);
    } finally {
      //  setIsSubmitting(false);
        setpublishedClicked(false);
    }
  };

  useEffect(() => {
    if (!publishedClicked) return;
    handleSubmit();
  }, [publishedClicked]);

  return (
    <>
      <Toast times={3000} />
      <div className="mb-6 text-black">
        <p className="font-semibold mb-3">Product Images</p>

        {/* DROP AREA */}
        <label
          className="
    flex flex-col items-center justify-center
    border-2 border-dashed border-gray-300
    rounded-xl
    h-48
    cursor-pointer
    hover:border-lime-500
    transition
  "
        >
          {/* ICON */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-gray-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 12l-4-4m0 0L8 12m4-4v12"
            />
          </svg>

          <p className="text-gray-700 font-medium">Drag & Drop Images Here</p>

          <p className="text-sm text-gray-500 mb-3">or click to browse</p>

          {/* BUTTON */}
          <span
            className="
      border border-lime-500
      text-black
      px-4 py-2
      rounded-lg
      hover:bg-lime-50
    "
          >
            Choose Files
          </span>

          {/* FILE INPUT */}
          <input
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            multiple
            onChange={handleImage}
            className="hidden"
          />
         
        </label>
         {
            errors && errors.image && <div className="text-red-500 mt-2">{errors.image}</div>
          }

        {/* ERROR */}
        {imageError && (
          <p className="mt-2 text-sm text-red-600">{imageError}</p>
        )}

        {/* CLEAR BUTTON */}
        {selectedFiles.length > 0 && (
          <button
            type="button"
            onClick={clearAllImages}
            className="mt-3 text-sm px-3 py-1 border rounded hover:bg-gray-100"
          >
            Clear All Images
          </button>
        )}
        

        {/* IMAGE PREVIEW */}
        <div className="flex gap-3 mt-4 flex-wrap">
          {previewItems.map((item, index) => (
            <div
              key={item.id}
              className="relative w-16 h-16 bg-gray-200 rounded"
            >
              <button
                type="button"
                onClick={() => openFullPreview(item.url)}
                className="block w-16 h-16"
              >
                <Image
                  src={item.url}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded"
                  width={64}
                  height={64}
                />
              </button>

              {/* REMOVE BUTTON */}
              <button
                type="button"
                onClick={() => removeSingleImage(index)}
                className="
            absolute -top-2 -right-2
            w-5 h-5
            rounded-full
            bg-black text-white
            text-xs
            flex items-center justify-center
          "
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {activePreviewUrl ? (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={closeFullPreview}
        >
          <div
            className="relative bg-white p-2 rounded max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeFullPreview}
              className="absolute top-2 right-2 z-10 bg-black text-white rounded px-2 py-1 text-sm"
            >
              Close
            </button>
            <img
              src={activePreviewUrl}
              alt="Full preview"
              className="w-full h-auto max-h-[85vh] object-contain rounded"
            />
          </div>
        </div>
      ) : null}

      <div className="mb-6 text-black">
        <p className="font-semibold mb-3">
          Upload Quality Certificate (Optional)
        </p>

        {/* UPLOAD BOX */}
        <label
          className="
      flex flex-col items-center justify-center
      border-2 border-dashed border-gray-300
      rounded-xl
      h-40
      cursor-pointer
      hover:border-lime-500
      transition
    "
        >
          {/* ICON */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-gray-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 12l-4-4m0 0L8 12m4-4v12"
            />
          </svg>

          <p className="text-gray-600 text-sm mb-3">
            PDF or Image files accepted
          </p>

          <span
            className="
        border border-lime-500
        px-4 py-2
        rounded-lg
        hover:bg-lime-50
      "
          >
            Choose File
          </span>

          <input
            type="file"
            accept="application/pdf,image/png,image/jpeg"
            onChange={handlePdf}
            className="hidden"
          />
        </label>

        {/* ERROR */}
        {pdfError && <p className="mt-2 text-sm text-red-600">{pdfError}</p>}

          {
            errors && errors.pdf && <div className="text-red-500 mt-2">{errors.pdf}</div>
          }

        {/* PREVIEW FILE LIST */}
        <div className="flex flex-wrap gap-3 mt-4">
          {pdfPreview.map((item, index) => (
            <div
              key={item.id_Pdf}
              className="
          relative
          border
          rounded-lg
          px-3
          py-2
          bg-gray-50
          text-sm
          flex items-center
        "
            >
              <button
                className="text-blue-600 underline"
                onClick={() => openFullPdfPreview(item.url_Pdf)}
              >
                {item.name?.split(".")[0] || "certificate"}
              </button>

              {/* REMOVE BUTTON */}
              <button
                type="button"
                onClick={() => singlePDFremove(index)}
                className="
            absolute
            -top-2
            -right-2
            w-5
            h-5
            rounded-full
            bg-black
            text-white
            text-xs
            flex
            items-center
            justify-center
          "
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {activePdfPreviewUrl ? (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <iframe
            src={activePdfPreviewUrl}
            title="PDF Preview"
            className="w-200 h-150"
          ></iframe>
          <button
            type="button"
            onClick={() => setActivePdfPreviewUrl("")}
            className="absolute top-45 md:top-8 md:right-170 right-67 z-10 bg-white text-black rounded px-2 py-1 text-sm"
          >
            Close PDF Preview
          </button>
        </div>
      ) : null}

      <div className="mb-6 text-black">
        <p className="font-semibold mb-2">Description</p>
        <textarea
          value={descriptionValue}
          onChange={handleDesc}
          className="border w-full p-2 h-24"
          placeholder="Enter details..."
        />
      </div>

      <div className="border p-4 rounded mb-6 text-black">
        <p className="font-semibold mb-2">Listing Preview</p>

        <div className="flex gap-4">
          <div className="w-32 h-32 bg-gray-200" />

          <div>
            <p className="font-bold">
              {product.cropName || "Crop name"} - {product.variety || ""}
            </p>
            <p>
              Quantity: {pricing.quantity || "--"} {pricing.unit || "kg"}
            </p>
            <p>Price: Rs {pricing.pricePerKg || "--"}</p>
            <p>
              Location: {location.district || "--"}, {location.state || "--"}
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-between px-8 py-6 border-t mt-5">

   
        <button
          // disabled={step === 1}
          // onClick={() => setStep(step - 1)}
          className="px-6 py-3 rounded-lg border text-gray-500 disabled:opacity-40"
        >
          ← Back
        </button>
        <div className="flex gap-3">
          <button className="px-6 py-3 rounded-lg border">
            Save as Draft
          </button>

            <button
              className="back_lime text-white px-8 py-3 rounded-lg"
              // onClick={() => submitRef.current && submitRef.current()}
            >
              Publish
            </button>
        </div>
      </div> */}
    </>
  );
}
