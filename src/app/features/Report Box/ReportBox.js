"use client";
import { Description } from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";
import { postApi } from "@/services/apiService";
import Toast from "@/Components/Alert/Toast";
import { ToastContainer, toast } from "react-toastify";

export default function ReportBox({ onClose, reportCardDeta }) {
  const [formData, setformData] = useState({
    reason: "",
    description: "",
  });
  const imageUrl = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  console.log("report data at report card", reportCardDeta);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const postReport = await postApi(
      `/orderHistory/report/${reportCardDeta.orderId}`,
   formData );

    if (postReport.success) {
      toast.success(postReport.message);
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      toast.error(postReport.message);
    }
  };

  return (
    <>
      <Toast times={2000} />
      <div className="flex justify-center items-center inset-0 fixed z-50 bg-black/40">
        <div className="bg-white w-[520px] rounded-2xl shadow-2xl p-6">
          {/* ICON */}
          <div className="flex justify-center mb-3">
            <div className="bg-red-100 p-3 rounded-full">🚩</div>
          </div>

          {/* TITLE */}
          <h2 className="text-xl font-semibold text-center text-gray-800">
            Report {reportCardDeta.user}
          </h2>
          <p className="text-center text-gray-500 text-sm mb-5">
            Report issue with:{" "}
            <span className="font-medium text-gray-700">
              {reportCardDeta.userName}
            </span>
          </p>

          {/* PRODUCT CARD */}
          <div className="bg-gray-50 rounded-xl p-3 flex gap-3 mb-4 items-center">
            <Image
              src={imageUrl(reportCardDeta.Image)}
              width={150}
              height={100}
              alt="Image"
              className="w-14 h-14 rounded-lg object-cover"
              unoptimized
            />

            <div className="">
              <p className="font-semibold text-gray-800 text-sm">
                {reportCardDeta.cropName} - {reportCardDeta.variety}
              </p>
              <p className="text-xs text-gray-500">
                #{reportCardDeta.orderId} •{" "}
                {`${reportCardDeta.orderDate[2]}-${reportCardDeta.orderDate[1]}-${reportCardDeta.orderDate[0]}`}
              </p>
            </div>
          </div>

          {/* DROPDOWN */}
          <label className="text-sm text-gray-700 font-medium">
            Reason for reporting *
          </label>

          <select
            className="w-full text-black mt-2 mb-4 border-2 border-red-400 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300"
            value={formData.reason}
            onChange={handleChange}
            name="reason"
          >
            <option disabled>Select a reason</option>
            <option>Poor product quality</option>
            <option>Late or no delivery</option>
            <option>Product not as described</option>
            <option>Payment issues</option>
            <option>Poor communication</option>
            <option>Suspected fraud</option>
            <option>Other</option>
          </select>

          {/* TEXTAREA */}
          <label className="text-sm text-gray-700 font-medium">
            Additional details
          </label>

          <textarea
            placeholder="Please provide more details about the issue..."
            className="w-full mt-2 mb-4 border text-black border-gray-300 rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-200 resize-none"
            value={formData.description}
            onChange={handleChange}
            name="description"
            rows={4}
          />

          {/* WARNING */}
          <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 text-sm rounded-lg p-3 mb-5">
            ⚠️ False reports may result in account suspension. Please ensure
            your report is accurate and truthful.
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <button
              className="flex-1 border border-gray-300 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
              onClick={handleSubmit}
            >
              ✈ Submit Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
