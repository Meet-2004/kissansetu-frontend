import { useState, useEffect } from "react";
// import FormLayout from "@/app/Dashboard/addCrop/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerRequirements } from "../../Store/slices/buyerRequirementSlice";
import "@/app/globals.css";
import { getApi } from "@/services/apiService";
import CommonDropdown from "@/Components/layouts/commonDropdown";

export default function QuantityBudget({ next, back }) {
  const requirements = useSelector((state) => state.requirements.form);
  const [units, setunits] = useState("");
  const[selectedUnits,setselectedUnits]=useState("");
  const [wholeTotalPrice, setwholeTotalPrice] = useState(null);
 

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const units = await getApi("/master/units");
      // console.log(crops.data);
      setunits(units.data);
    }
    fetchData();
  }, []);
  const handleUnit = (val) => {
    setselectedUnits(val);
    console.log(val.id);
    if (val && val.id) {
      dispatch(setBuyerRequirements({unitId: val.id}));
    }
  };
  const handleChange = (e) => {
    dispatch(setBuyerRequirements({ [e.target.name]: e.target.value }));
  };
  

  const today = new Date();
  const maxDate = new Date();

  maxDate.setDate(today.getDate() + 2);

  const formateDate = (date) => {
    return date.toISOString().slice(0, 16);
  };
  let totalBasePrice;

  if (requirements.quantity && requirements.pricePerKg) {
    console.log("hello", requirements.quantity, requirements.pricePerKg);
    totalBasePrice = requirements.quantity * requirements.pricePerKg;
  }
  console.log("TOTAL PRICE", totalBasePrice);


  return (
  <>
    <section className="mt-5">
      <form>

        {/* QUANTITY + UNIT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

          <div className="flex flex-col ">
            <label className="text-black">Total Quantity *</label>

            <input
              type="text"
              name="quantityRequired"
              className="text-black border border-gray-300 mt-1 w-full rounded-lg h-11 px-4"
              placeholder="Enter quantity"
              value={requirements.quantityRequired}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col w-[20%]">
            <label className="text-black">Unit</label>

            <CommonDropdown
              label="Units"
              options={units}
              value={selectedUnits}
              name="unitId"
              onChange={(val) => handleUnit(val)}
            />
          </div>
           </div>
          
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-5">
                <div>

                <label className="text-black">Expected Price Range (per unit)</label>
              <div className="flex flex-1 gap-5">

                <input
                  type="text"
                  name="minPrice"
                  className="border border-gray-300 mt-1 w-full rounded-lg h-11 px-4 text-black "
                  placeholder="Minimum Price"
                  value={requirements.minPrice}
                  onChange={handleChange}
                />
                  <input
                  type="text"
                  name="maxPrice"
                  className="border border-gray-300 mt-1 w-full rounded-lg h-11 px-4 text-black"
                  placeholder="Maximum Price"
                  value={requirements.maxPrice}
                  onChange={handleChange}
                />
              </div>
              </div>

              <div className="">
              
              </div>           

            </div>
      </form>
    </section>
  </>
);
}
