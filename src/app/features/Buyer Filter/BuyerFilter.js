"use client";

import { Search, Filter } from "lucide-react";
import { useState } from "react";
import "@/app/globals.css";

export default function MarketFilter({ onApply,setSearchList,searchList}) {
  const [filters, setFilters] = useState({
    search: "",
    cropType: "",
    priceRange: "",
    location: "",
    saleType: "",
  });

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleApply = () => {
    onApply?.(filters); // send to backend
  };

  const handleClear = () => {
    setFilters({
      search: "",
      cropType: "",
      priceRange: "",
      location: "",
      saleType: "",
    });
  };

  return (
    <div className="bg-white p-5 border-2 border-gray-200 rounded-xl shadow-lg   mb-6 ">
      {/* SEARCH */}
      <div className="flex items-center border-2 rounded-xl px-4 py-3 mb-4">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search crops, inputs, equipment..."
          value={searchList}
          onChange={(e) => setSearchList(e.target.value)}
          className="w-full outline-none ml-2 text-gray-800 text-md "
        />
      </div>

      {/* FILTER BUTTONS */}
      {/* <div className="md:flex md:flex-wrap md:gap-3 md:justify-between hidden">
        <div className="flex flex-wrap gap-3">
          <FilterBtn label="Crop Type" />
          <FilterBtn label="Price Range" />
          <FilterBtn label="Location" />
          <FilterBtn label="Sale Type" />
        </div>

        
        <div className="flex gap-3">
          <button
            onClick={handleApply}
            className="back_lime text-white px-1 py-1 rounded-lg h-10 w-30 justify-center text-sm"
          >
            Apply Filters
          </button>

          <button
            onClick={handleClear}
            className=" px-1 py-1 rounded-lg h-10 w-30 justify-center text-sm text-black border-2 border-gray-300"
          >
            Clear All
          </button>
        </div>
      </div> */}
      {/* <div className="w-full">
      <div className="md:hidden w-[95%] flex justify-between ">
        <div className="border-black border w-20 text-black text-xs justify-center items-center flex ">
          <select className="w-20 ">
            <option className="h-2"></option>
          </select>

        </div>
         <div className="flex gap-3 w-[60%]">
          <button
            onClick={handleApply}
            className="back_lime text-white flex-1 px-1 py-1 rounded-lg h-10 w-15 justify-center text-xs"
          >
            Apply Filters
          </button>

          <button
            onClick={handleClear}
            className=" px-1 py-1 rounded-lg flex-1 h-10 w-15 justify-center text-xs text-black border-2 border-gray-300"
          >
            Clear All
          </button>
          </div>

      </div>
      </div> */}
    </div>
  );
}

/* ================= FILTER BUTTON ================= */
// function FilterBtn({ label }) {
//   return (
//     <button className="flex items-center gap-2   px-1 h-10 w-30 justify-center py-1 rounded-lg text-sm hover:bg-gray-50 text-gray-900 border-gray-300 border-2">
//       <Filter size={14} />
//       {label}
//     </button>
//   );
// }