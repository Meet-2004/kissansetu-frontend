"use client";
import React from "react";
// import FormLayout from "@/app/Dashboard/addCrop/FormLayout";
import { setCropData } from "../../Store/slices/cropSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getApi } from "@/services/apiService";
import CommonDropdown from "@/Components/layouts/commonDropdown";
import TextField from "@/Components/layouts/TextField";


const ProductDetail = ({ next, back, errors = {}, setPageDetails }) => {
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
        setCropData({
          [name]: value.name,
        }),
      );
    } else {
      dispatch(
        setCropData({
          [name]: value.id,
        }),
      );
    }
  };

  const handleChange = (e) => {
    console.log("This is target", e.target.name);
    const currentTarget = e.target.name;
    dispatch(setCropData({ [e.target.name]: e.target.value }));
    const errorsArray = Object.keys(errors);

    const finalerror = errorsArray.some((err) => err === e.target.name);
    console.log("this is final error", finalerror);

    if (finalerror) {
      console.log("this is current target error", errors[currentTarget]);
      errors[currentTarget] = "";
      //  console.log(currentTarget);
      console.log("Thi is erros", errors.variety);
      // errors.currentTarget="";
    }

    // console.log("this is crop okay at product page", errorss);
  };

  const handleCropname = (val) => {
    console.log("hello", val);
    errors.cropName = "";
    setselectedCrop(val);
    if (val && val.id) {
      // use the incoming value rather than stale state
      dispatch(setCropData({ cropId: val.id }));
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

  const handleGrade = (e) => {
    console.log("value of grade", e.target.name);
    // dispatch(setCropData({ grade: val }));
  };

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
                  placeholder="Crop Name"
                  options={cropName}
                  value={cropName?.find((g) => g.id === crop.cropId) || null}
                  className=" text-black mt-1 rounded-lg  focus:border-lime-500 outline-none"
                  name="cropId"
                  onChange={handleDropdown}
                  // className="w-full"
                />
                {errors.cropId && (
                  <p className="mt-1 text-sm text-red-600">{errors.cropId}</p>
                )}
              </div>
            </div>

            {/* Variety */}
            <div>
              <label className="text-black text-sm font-medium">Variety</label>
              <div className="mt-1">
                <TextField
                  // type="text"
                  placeholder="eg., Basmati, Durum"
                  name="variety"
                  className="w-full text-black  rounded-lg  focus:border-lime-500 outline-none"
                  onChange={handleChange}
                  value={crop.variety}
                />
              </div>
              {/* <TextField /> */}
              {errors.variety && (
                <p className="mt-1 text-sm text-red-600">{errors.variety}</p>
              )}
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {/* Grade */}
            <div className="">
              <label className="text-black text-sm font-medium">Grade</label>

              <CommonDropdown
                className="w-full text-black mt-1 rounded-lg focus:border-lime-500 outline-none"
                onChange={handleDropdown}
                options={grades}
                placeholder="Select Grade"
                value={grades.find((g) => g.name === crop.grade) || null}
                name="grade"
              />

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
                className="w-full border border-gray-300 text-black mt-1 rounded-sm h-11 px-3 focus:border-lime-500 outline-none"
                onChange={handleChange}
                value={crop.harvestDate}
                name="harvestDate"
              />
              {errors.harvestDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.harvestDate}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProductDetail;
