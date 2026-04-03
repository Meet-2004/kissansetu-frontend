// import FormLayout from "@/app/Dashboard/addCrop/FormLayout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCropData } from "@/app/Store/slices/cropSlice";
import { useEffect } from "react";
import { getApi } from "@/services/apiService";
import CommonDropdown from "@/Components/layouts/commonDropdown";

export default function Quality_Location({ next, back }) {
  const crop = useSelector((state) => state.crop.data);
  const dispatch = useDispatch();
  const [pickupMethod, setpickupMethod] = useState("");
  const [packageType, setpackageType] = useState();
  const [storageTypes, setstorageTypes] = useState();
  const [districts, setdistricts] = useState();
  const [states, setstates] = useState();
  const [selectData, setselectData] = useState({
    stateId: "",
    districtId: "",
    packagingId: "",
    storageId: "",
  });

  useEffect(() => {
    async function fetchData() {
      const storage = await getApi("/master/storage");
      const packages = await getApi("/master/packaging");
      const state = await getApi("/master/states");

      setstorageTypes(storage.data);
      setpackageType(packages.data);
      setstates(state.data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (selectData.stateId) {
        console.log("hello district");
        const district = await getApi(`/master/districts/${selectData.stateId.id}`);
        setdistricts(district.data);
        console.log(district);
      }
    }
    fetchData();
  }, [selectData]);

  dispatch(setCropData({ pickupMethod:pickupMethod}));
  const handlePurchaseType = (e) => {
    setpickupMethod(e.target.value);
   
  };
  const handleSelectChange = (name, val) => {
    console.log(val);
    setselectData((prev) => ({
      ...prev,
      [name]: val
    }));
    dispatch(setCropData({ [name]: val?.id }));
  };
  console.log(selectData);

  // return (
  //   <section className="mt-5">
  //     <div>
  //       <form>
  //         <div>
  //           <div className="flex flex-col  text-black">
  //             <div className="flex mt-1 gap-10">
  //               <div className="flex flex-col">
  //                 <label name="Package type">Packaging type</label>
  //                 {/* <select className="border border-black text-black mt-2 min-w-sm max-w-lg rounded-lg h-11 px-4" onChange={handleChange}   value={crop.location.packagingType} name="packagingType">
  //                   <option className="text-black" value="" disabled>
  //                     Packaging Type *
  //                   </option>
  //                   <option value="Loose">Loose</option>
  //                   <option value="Bag">Bag</option>
  //                   <option value="creates">creates</option>
  //                 </select> */}
  //                 <CommonDropdown
  //                   label="Packaging Type"
  //                   options={packageType}
  //                   value={selectData.packagingId}
  //                   name="packagingId"
  //                   onChange={(val) => handleSelectChange("packagingId", val)}
  //                 />
  //               </div>
  //               <div className="flex flex-col">
  //                 <label>Storage Type</label>
  //                 {/* <select
  //                   className="border border-black text-black mt-2 min-w-sm max-w-lg rounded-lg h-11 px-4"
  //                   onChange={handleChange}
  //                   value={crop.location.storageType}
  //                   name="storageType"
  //                 >
  //                   <option className="text-black" value="" disabled>
  //                     Storage Type
  //                   </option>
  //                   <option value="Warehouse">Warehouse</option>
  //                   <option value="Cold Storage">Cold Storage</option>
  //                   <option value="Open Storage">Open Storage</option>
  //                 </select> */}
  //                   <CommonDropdown
  //                   label="Storage Type"
  //                   options={storageTypes}
  //                   value={selectData.storageId}
  //                   name="storageId"
  //                   onChange={(val) => handleSelectChange("storageId", val)}
  //                 />
  //               </div>
  //             </div>

  //             <div className="flex mt-5 gap-10">
  //               <div className="flex flex-col">
  //                 <label>State</label>
  //                 {/* <select
  //                   className="border border-black text-black mt-1 min-w-sm max-w-lg rounded-lg h-11 px-4"
  //                   onChange={handleChange}
  //                   value={crop.location.state}
  //                   name="state"
  //                 >
  //                   <option className="text-black" value="" disabled>
  //                     Select State
  //                   </option>
  //                   <option value="Gujarat">Gujarat</option>
  //                   <option value="Maharastra">Maharastra</option>
  //                   <option value="Rajasthan">Rajasthan</option>
  //                 </select> */}
  //                  <CommonDropdown
  //                   label="State"
  //                   options={states}
  //                   value={selectData.stateId}
  //                   name="stateId"
  //                   onChange={(val) => handleSelectChange("stateId", val)}
  //                 />
  //               </div>
  //               <div className="flex flex-col">
  //                 <label>District</label>
  //                 {/* <select
  //                   className="border border-black text-black mt-1 min-w-sm max-w-lg rounded-lg h-11 px-4"
  //                   onChange={handleChange}
  //                   value={crop.location.district}
  //                   name="district"
  //                 >
  //                   <option className="text-black" value="" disabled>
  //                     Select District
  //                   </option>
  //                   <option value="Navsari">Navsari</option>
  //                   <option value="Vadodara">Vadodara</option>
  //                   <option value="Ourat">Surat</option>
  //                 </select> */}
  //                   <CommonDropdown
  //                   label="Districts"
  //                   options={districts}
  //                   value={selectData.districtId}
  //                   name="districtId"
  //                   onChange={(val) => handleSelectChange("districtId", val)}
  //                 />
  //               </div>
  //             </div>
  //             <div className="mt-4">
  //               <p className="text-black">Pickup Method </p>
  //               <div className="gap-50 mt-1 ">
  //                 <div className="gap-10 py-1 ">
  //                   <input
  //                     className="border border-black  bg-black  text-black "
  //                     type="radio"
  //                     checked={pickupMethod === "Buyer Pickup"}
  //                      onChange={()=>setpickupMethod("Buyer Pickup")}
  //                     value="Buyer Pickup"
  //                   />
  //                   <label className="text-black ml-2">Buyer Pickup</label>
  //                 </div>
  //                 <div className="gap-20 mt-1">
  //                   <input
  //                     className="border border-black bg-black "
  //                     type="radio"
  //                     checked={pickupMethod === "Seller Delivery"}
  //                      onChange={()=>setpickupMethod("Seller Delivery")}
  //                     value="Seller Delivery"
  //                   />
  //                   <label className="text-black ml-2">Seller Delivery</label>
  //                 </div>
  //                 <div className="gap-20 mt-1">
  //                   <input
  //                     className="border border-black  bg-black"
  //                     type="radio"
  //                     checked={pickupMethod === "Transport Negotiable"}
  //                     onChange={()=>setpickupMethod("Transport Negotiable")}
  //                     value="Transport Negotiable"
  //                   />
  //                   <label className="text-black ml-2">
  //                     Transport Negotiable
  //                   </label>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   </section>
  // );

  return (
  <section className="mt-5">
    <form>

      {/* PACKAGING + STORAGE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">

        <div className="flex flex-col">
          <label>Packaging type</label>

          <CommonDropdown
            label="Packaging Type"
            options={packageType}
            value={selectData.packagingId}
            name="packagingId"
            onChange={(val) => handleSelectChange("packagingId", val)}
          />
        </div>

        <div className="flex flex-col">
          <label>Storage Type</label>

          <CommonDropdown
            label="Storage Type"
            options={storageTypes}
            value={selectData.storageId}
            name="storageId"
            onChange={(val) => handleSelectChange("storageId", val)}
          />
        </div>

      </div>


      {/* STATE + DISTRICT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-black">

        <div className="flex flex-col">
          <label>State</label>

          <CommonDropdown
            label="State"
            options={states}
            value={selectData.stateId}
            name="stateId"
            onChange={(val) => handleSelectChange("stateId", val)}
          />
        </div>

        <div className="flex flex-col">
          <label>District</label>

          <CommonDropdown
            label="Districts"
            options={districts}
            value={selectData.districtId}
            name="districtId"
            onChange={(val) => handleSelectChange("districtId", val)}
          />
        </div>

      </div>


      {/* PICKUP METHOD */}
      <div className="mt-6 text-black">

        <p className="mb-2">Pickup Method</p>

        <div className="flex flex-col gap-3">

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={pickupMethod === "Buyer Pickup"}
              onChange={() => setpickupMethod("Buyer Pickup")}
            />
            Buyer Pickup
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={pickupMethod === "Seller Delivery"}
              onChange={() => setpickupMethod("Seller Delivery")}
            />
            Seller Delivery
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={pickupMethod === "Transport Negotiable"}
              onChange={() => setpickupMethod("Transport Negotiable")}
            />
            Transport Negotiable
          </label>

        </div>

      </div>

    </form>
  </section>
);
}
