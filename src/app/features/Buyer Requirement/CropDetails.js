"use client";
import React from "react";
// import FormLayout from "@/app/Dashboard/addCrop/FormLayout";
import { setBuyerRequirements } from "../../Store/slices/buyerRequirementSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getApi } from "@/services/apiService";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CommonDropdown from "@/Components/layouts/commonDropdown";

const CropDetails = ({ next, back }) => {
  const [cropName, setcropName] = useState();
  const [selectedCrop, setselectedCrop] = useState("");
  const dispatch = useDispatch();

  const requirements = useSelector((state) => state.requirements.form);
  console.log("this is crop",requirements);

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
    dispatch(setBuyerRequirements({ [e.target.name]: e.target.value }));
   

  };
  
  const handleCropname=(val)=>{
    console.log("hello",val)
    setselectedCrop(val);
    if (val && val.id) {
      // use the incoming value rather than stale state
      dispatch(setBuyerRequirements({cropId: val.id}));
    }
  }

  return (
  <section className="px-3 sm:px-4">
    <div className="mt-5">
      <form>

        {/* ROW 1 */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

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
                className="w-500"
              />
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
              value={requirements.variety}
            />
          </div>

        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-5">

          {/* Grade */}
          <div>
            <label className="text-black text-sm font-medium">
              Grade
            </label>

            <select
              className="w-full text-black border border-gray-300 mt-1 rounded-lg h-11 px-3 focus:border-lime-500 outline-none"
              onChange={handleChange}
              value={requirements.grade}
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
          </div>

          

        </div>

      </form>
    </div>
  </section>
);
};

export default CropDetails;
