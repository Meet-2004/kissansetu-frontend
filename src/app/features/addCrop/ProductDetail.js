"use client";
import React from "react";
// import FormLayout from "@/app/Dashboard/addCrop/FormLayout";
import { setCropData } from "../../Store/slices/cropSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getApi } from "@/services/apiService";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CommonDropdown from "@/Components/layouts/commonDropdown";

const ProductDetail = ({ next, back, errors = {} }) => {
  const [cropName, setcropName] = useState();
  const [selectedCrop, setselectedCrop] = useState("");
  const dispatch = useDispatch();
  const crop = useSelector((state) => state.crop.data.product);

  useEffect(() => {
    async function fetchData() {
      const crops = await getApi("/master/crops");
      // console.log(crops.data);
      setcropName(crops.data);
    }
    fetchData();
  }, []);
  console.log("this is crop okay", cropName);

  const handleChange = (e) => {
    dispatch(setCropData({ [e.target.name]: e.target.value }));
   

  };
  
  const handleCropname=(val)=>{
    console.log("hello",val)
    setselectedCrop(val);
    if (val && val.id) {
      // use the incoming value rather than stale state
      dispatch(setCropData({cropId: val.id}));
    }
  }

  return (
  <section className="px-3 sm:px-4">
    <div className="mt-5">
      <form>

        {/* ROW 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Crop Name */}
          <div>
            <label className="text-black text-sm font-medium">
              Crop Name
            </label>

            <div className="mt-1">
              <CommonDropdown
                label="Crop Name"
                options={cropName}
                value={selectedCrop}
                name="cropId"
                onChange={(val) => handleCropname(val)}
                className="w-full"
              />
              {errors.cropId && (
                <p className="mt-1 text-sm text-red-600">{errors.cropId}</p>
              )}
            </div>
          </div>

          {/* Variety */}
          <div>
            <label className="text-black text-sm font-medium">
              Variety
            </label>

            <input
              type="text"
              placeholder="eg., Basmati, Durum"
              name="variety"
              className="w-full text-black border border-gray-300 mt-1 rounded-lg h-11 px-3 focus:border-lime-500 outline-none"
              onChange={handleChange}
              value={crop.variety}
            />
            {errors.variety && (
              <p className="mt-1 text-sm text-red-600">{errors.variety}</p>
            )}
          </div>

        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

          {/* Grade */}
          <div>
            <label className="text-black text-sm font-medium">
              Grade
            </label>

            <select
              className="w-full text-black border border-gray-300 mt-1 rounded-lg h-11 px-3 focus:border-lime-500 outline-none"
              onChange={handleChange}
              value={crop.grade}
              name="grade"
            >
              <option disabled value="">
                Select Grade
              </option>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
              <option value="D">Grade D</option>
            </select>
            {errors.grade && (
              <p className="mt-1 text-sm text-red-600">{errors.grade}</p>
            )}
          </div>

          {/* Harvest Date */}
          <div>
            <label className="text-black text-sm font-medium">
              Harvest Date
            </label>

            <input
              type="date"
              className="w-full border border-gray-300 text-black mt-1 rounded-lg h-11 px-3 focus:border-lime-500 outline-none"
              onChange={handleChange}
              value={crop.harvestDate}
              name="harvestDate"
            />
            {errors.harvestDate && (
              <p className="mt-1 text-sm text-red-600">{errors.harvestDate}</p>
            )}
          </div>

        </div>

      </form>
    </div>
  </section>
);
};

export default ProductDetail;
