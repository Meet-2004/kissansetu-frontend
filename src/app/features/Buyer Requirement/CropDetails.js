"use client";
import React from "react";
// import FormLayout from "@/app/Dashboard/addCrop/FormLayout";
import { setBuyerRequirements } from "../../Store/slices/buyerRequirementSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getApi } from "@/services/apiService";
import Autocomplete from "@mui/material/Autocomplete";
import CommonDropdown from "@/Components/layouts/commonDropdown";
import TextField from "@/Components/layouts/TextField";


const CropDetails = ({ next, back,errors }) => {
  const [cropName, setcropName] = useState();
  const [selectedCrop, setselectedCrop] = useState("");
  const dispatch = useDispatch();

  const requirements = useSelector((state) => state.requirements.form);
  console.log("this is crop", requirements);

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
     const errorsArray = Object.keys(errors);
 const currentTarget = e.target.name;
    const finalerror = errorsArray.some((err) => err === currentTarget);

    if (finalerror) {
      console.log("this is current target error", errors[currentTarget]);
      errors[currentTarget] = "";
    }
     
    dispatch(setBuyerRequirements({ [e.target.name]: e.target.value }));
  };

  const handleCropname = (val) => {
    console.log("hello", val);
    setselectedCrop(val);
    if (val && val.id) {
      // use the incoming value rather than stale state
      dispatch(setBuyerRequirements({ cropId: val.id }));
    }
  };
  const handleDropdown = (name, value) => {
    console.log("this is handle dropdown", name, value);
     const errorsArray = Object.keys(errors);
 const currentTarget = name;
    const finalerror = errorsArray.some((err) => err === name);

    if (finalerror) {
      console.log("this is current target error", errors[currentTarget]);
      errors[currentTarget] = "";
    }
     

    if (name === "grade") {
      dispatch(
        setBuyerRequirements({
          [name]: value?.name,
        }),
      );
    } else {
      dispatch(
        setBuyerRequirements({
          [name]: value.id,
        }),
      );
    }
  };
  const grades = [
    {
      name: "Grade A",
    },
    {
      name: "Grade B",
    },
    {
      name: "Grade C",
    },
    {
      name: "Grade D",
    },
  ];
  const handleGrade = (val) => {
    console.log(val.name);
    dispatch(setBuyerRequirements({ grade: val.name }));
  };

  return (
    <section className="px-3 sm:px-4">
      <div className="mt-5">
      
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
                  placeholder="Crop Name"
                  options={cropName}
                  value={
                    cropName?.find((val) => val?.id === requirements?.cropId) ||
                    null
                  }
                  name="cropId"
                  onChange={handleDropdown}
                />
                {
                  errors?.cropId &&<p className="text-red-600 text-sm">{ errors?.cropId}</p>
                  
                }
              </div>
            </div>

            {/* Variety */}
            <div>
              <label className="text-black text-sm font-medium">Variety</label>

              {/* <input
              type="text"
              placeholder="eg., Basmati, Durum"
              name="variety"
              className="w-full text-black border border-gray-300 mt-1 rounded-lg h-11 px-3 focus:border-lime-500 outline-none"
              onChange={handleChange}
              value={requirements.variety}
            /> */}
              <div className="mt-1">
                <TextField
                  // type="text"
                  placeholder="eg., Basmati, Durum"
                  name="variety"
                  className="w-full text-black border border-gray-300 mt-1 rounded-lg  focus:border-lime-500 outline-none"
                  onChange={handleChange}
                  value={requirements.variety}
                />
                  {
                  errors?.variety &&<p className="text-red-600 text-sm">{ errors?.variety}</p>
                  
                }
              </div>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-5">
            {/* Grade */}
            <label className="text-black text-sm font-medium">Grade</label>

            <CommonDropdown
              className="w-full text-black mt-1 rounded-lg  focus:border-lime-500 outline-none"
              onChange={handleDropdown}
              options={grades}
              placeholder="Select Grade"
              value={grades?.find((val) => val.name === requirements.grade)}
              name="grade"
            />
             {
                  errors?.grade &&<p className="text-red-600 text-sm">{ errors?.grade}</p>
                  
                }
            
          </div>
   
      </div>
    </section>
  );
};

export default CropDetails;
