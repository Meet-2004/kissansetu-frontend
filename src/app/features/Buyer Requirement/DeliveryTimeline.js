// import FormLayout from "@/app/Dashboard/addCrop/FormLayout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerRequirements } from "../../Store/slices/buyerRequirementSlice";
import { useEffect } from "react";
import { getApi } from "@/services/apiService";
import CommonDropdown from "@/Components/layouts/commonDropdown";

export default function DeliveryTimeline({ next, back }) {
  const requirements = useSelector((state) => state.requirements.form);
  const dispatch = useDispatch();
  const [districts, setdistricts] = useState();
  const [states, setstates] = useState();
  const [urgency,seturgency]=useState("");
  const [selectData, setselectData] = useState({
    stateId: "",
    districtId: "",
    
  })
  

  useEffect(() => {
    async function fetchData() {
      const state = await getApi("/master/states");

      setstates(state.data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (selectData.stateId) {
        console.log("hello district");
        const district = await getApi(
          `/master/districts/${selectData.stateId.id}`,
        );
        setdistricts(district.data);
        console.log(district);
      }
    }
    fetchData();
  }, [selectData]);

  console.log(selectData);

  dispatch(setBuyerRequirements({ urgency: urgency }));
//   const handlePurchaseType = (e) => {
//     setpickupMethod(e.target.value);
//   };
  const handleSelectChange = (name, val) => {
    console.log(val);
    setselectData((prev) => ({
      ...prev,
      [name]: val,
    }));
    dispatch(setBuyerRequirements({ [name]: val?.id }));
  };
  const handleChange=(e)=>{
    
  }
  console.log(selectData);

  return (
    <section className="mt-5">
      <form>
        {/* STATE + DISTRICT */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4  text-black">
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
          <div className="flex flex-col gap-2">
            <div>
              <label>Delivery Location (Full Address)</label>
              <input
                type="text"
                placeholder="Complete Delivery address"
                name="deliveryAddress"
                className="w-full text-black border border-gray-300 mt-1 rounded-lg h-11 px-3 focus:border-lime-500 outline-none"
                  onChange={(e)=>{dispatch(setBuyerRequirements({deliveryAddress:e.target.value}))}}
                  value={requirements.deliveryAddress}
              />
            </div>
            <div>
              <label>Deadline</label>
              <input
                type="date"
                placeholder="Complete Delivery address"
                name="variety"
                className="w-full text-black border border-gray-300 mt-1 rounded-lg h-11 px-3 focus:border-lime-500 outline-none"
                onChange={(e)=>{dispatch(setBuyerRequirements({deadline:e.target.value}))}}
                  value={requirements.deadline}
              />
            </div>
            <div className="">
                <label>Urgency</label>
              <div className="flex flex-1 gap-5 mt-2">
                <button type="button" className={`border-2 border-gray-300 p-3 w-[48%] rounded-xl ${urgency==="NORMAL" && "bg-lime-100 border-lime-600"}`} onClick={()=>seturgency("NORMAL")}>Normal</button>
                <button type="button" className={`border-2 border-gray-300 p-3 w-[48%] rounded-xl ${urgency==="URGENT" && "bg-lime-100 border-lime-600"}`} onClick={()=>seturgency("URGENT")}>Urgent</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
