// import FormLayout from "@/app/Dashboard/addCrop/FormLayout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCropData } from "@/app/Store/slices/cropSlice";
import { useEffect } from "react";
import { getApi } from "@/services/apiService";
import CommonDropdown from "@/Components/layouts/commonDropdown";

export default function Quality_Location({errors={}} ) {
  const crop = useSelector((state) => state.crop.data.location);
  const dispatch = useDispatch();
  const [pickupMethod, setpickupMethod] = useState("");
  const [packageType, setpackageType] = useState();
  const [storageTypes, setstorageTypes] = useState();
  const [districts, setdistricts] = useState();
  const [states, setstates] = useState();

  useEffect(() => {
    async function fetchData() {
      const storage = await getApi("/master/storage");
      const packages = await getApi("/master/packaging");
      const state = await getApi("/master/states");

      setstorageTypes(storage?.data || []);
      setpackageType(packages?.data || []);
      setstates(state?.data || []);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (crop.stateId) {
        const district = await getApi(`/master/districts/${crop.stateId}`);
        setdistricts(district?.data || []);
      } else {
        setdistricts([]);
      }
    }
    fetchData();
  }, [crop.stateId]);

  dispatch(setCropData({ pickupMethod: pickupMethod }));
  const handlePurchaseType = (e) => {
    setpickupMethod(e.target.value);
  };
  const handleDropdown = (name, value) => {
    const errorsArray = Object.keys(errors);
 const currentTarget = name;
    const finalerror = errorsArray.some((err) => err === name);

    if (finalerror) {
      console.log("this is current target error", errors[currentTarget]);
      errors[currentTarget] = "";
     
    }
    console.log("this is handle dropdown", name, value);

    if (name === "stateId") {
      setdistricts([]);
      dispatch(setCropData({ districtId: "" }));
    }

    dispatch(
      setCropData({
        [name]: value?.id,
      }),
    );
  };

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
              placeholder="Packaging Type"
              value={ packageType?.find((g) => g.id === crop.packagingId) || null}
              name="packagingId"
              onChange={handleDropdown}
            />
            
               {errors.packagingId && (
                  <p className="mt-1 text-sm text-red-600">{errors.packagingId}</p>
                )}
            
          </div>

          <div className="flex flex-col">
            <label>Storage Type</label>

            <CommonDropdown
              label="Storage Type"
              placeholder="Storage Type"
              options={storageTypes}
              value={storageTypes?.find((g) => g.id === crop.storageId) || null}
              name="storageId"
              onChange={handleDropdown}
            />
              {errors.storageId && (
                  <p className="mt-1 text-sm text-red-600">{errors.storageId}</p>
                )}
          </div>
        </div>

        {/* STATE + DISTRICT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-black">
          <div className="flex flex-col">
            <label>State</label>

            <CommonDropdown
              label="State"
              placeholder="State"
              options={states}
              value={states?.find((g) => g.id === crop.stateId) || null}
              name="stateId"
              onChange={handleDropdown}
            />
              {errors.stateId && (
                  <p className="mt-1 text-sm text-red-600">{errors.stateId}</p>
                )}
          </div>

          <div className="flex flex-col">
            <label>District</label>

            <CommonDropdown
              label="Districts"
              placeholder="Districts"
              options={districts}
              value={districts?.find((g) => g.id === crop.districtId) || null}
              name="districtId"
              onChange={handleDropdown}
            />
              {errors.districtId && (
                  <p className="mt-1 text-sm text-red-600">{errors.districtId}</p>
                )}
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
             {errors.pickupMethod && (
                  <p className="mt-1 text-sm text-red-600">{errors.pickupMethod}</p>
                )}
          </div>
        </div>
      </form>
    </section>
  );
}
