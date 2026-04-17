// import FormLayout from "@/app/Dashboard/addCrop/FormLayout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerRequirements } from "../../Store/slices/buyerRequirementSlice";
import { useEffect } from "react";
import { getApi } from "@/services/apiService";
import CommonDropdown from "@/Components/layouts/commonDropdown";
import TextField from "@/Components/layouts/TextField";

export default function DeliveryTimeline({ next, back, errors }) {
  const requirements = useSelector((state) => state.requirements.form);
  const dispatch = useDispatch();
  const [districts, setdistricts] = useState();
  const [states, setstates] = useState();
  const [urgency, seturgency] = useState("NORMAL");
  const [selectData, setselectData] = useState({
    stateId: "",
    districtId: "",
  });

  useEffect(() => {
    async function fetchData() {
      const state = await getApi("/master/states");

      setstates(state.data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (requirements.stateId) {
        const district = await getApi(
          `/master/districts/${requirements?.stateId}`,
        );
        setdistricts(district?.data || []);
      } else {
        setdistricts([]);
      }
    }
    fetchData();
  }, [requirements.stateId]);

  console.log(selectData);
  const handleDropdown = (name, value) => {
    const errorsArray = Object.keys(errors);
    const currentTarget = name;
    const finalerror = errorsArray.some((err) => err === name);

    if (finalerror) {
      console.log("this is current target error", errors[currentTarget]);
      errors[currentTarget] = "";
    }

    if (name === "stateId") {
      setdistricts([]);
      dispatch(setBuyerRequirements({ districtId: "" }));
    }

    console.log("this is handle dropdown", name, value);
    dispatch(
      setBuyerRequirements({
        [name]: value?.id,
      }),
    );
  };

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
  const handleChange = (e) => {};
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
              placeholder="Select State"
              value={
                states?.find((val) => val?.id === requirements?.stateId) || null
              }
              name="stateId"
              onChange={handleDropdown}
            />
            {errors.stateId && (
              <p className="text-red-600 text-sm">{errors.stateId}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label>District</label>

            <CommonDropdown
              label="Districts"
              placeholder="Select Districts"
              options={districts}
              // value={selectData.districtId}
              value={
                districts?.find(
                  (val) => val?.id === requirements?.districtId,
                ) || null
              }
              name="districtId"
              onChange={handleDropdown}
            />
            {errors.districtId && (
              <p className="text-red-600 text-sm">{errors.districtId}</p>
            )}
          </div>
        </div>

        {/* PICKUP METHOD */}
        <div className="mt-6 text-black">
          <div className="flex flex-col gap-2">
            <div>
              <label>Delivery Location (Full Address)</label>

              <TextField
                // type="text"
                placeholder="Complete Delivery address"
                name="deliveryAddress"
                className=" text-black mt-1 rounded-lg  focus:border-lime-500 outline-none"
                onChange={(e) => {
                  {dispatch(
                    setBuyerRequirements({ deliveryAddress: e.target.value }),
                  );};{errors["deliveryAddress"]=""}
                }}
                value={requirements.deliveryAddress}
              />
              {errors.deliveryAddress && (
                <p className="text-red-600 text-sm">{errors.deliveryAddress}</p>
              )}
            </div>
            <div>
              <label>Deadline</label>
              <input
                type="date"
                placeholder="Complete Delivery address"
                name="deadline"
                className="w-full text-black border border-gray-300 mt-1 rounded-lg h-11 px-3 focus:border-lime-500 outline-none"
                onChange={(e) => {
                {  dispatch(setBuyerRequirements({ deadline: e.target.value }))};{errors["deadline"]=""}
                }}
                value={requirements.deadline}
              />
              {errors.deadline && (
                <p className="text-red-600 text-sm">{errors.deadline}</p>
              )}
            </div>
            <div className="">
              <label>Urgency</label>
              <div className="flex flex-1 gap-5 mt-2">
                <button
                  type="button"
                  className={`border-2 border-gray-300 p-3 w-[48%] rounded-xl ${urgency === "NORMAL" && "bg-lime-100 border-lime-600"}`}
                  onClick={() => seturgency("NORMAL")}
                >
                  Normal
                </button>
                <button
                  type="button"
                  className={`border-2 border-gray-300 p-3 w-[48%] rounded-xl ${urgency === "URGENT" && "bg-lime-100 border-lime-600"}`}
                  onClick={() => seturgency("URGENT")}
                >
                  Urgent
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
