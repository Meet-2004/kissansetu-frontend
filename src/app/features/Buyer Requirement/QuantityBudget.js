import { useState, useEffect } from "react";
// import FormLayout from "@/app/Dashboard/addCrop/FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerRequirements } from "../../Store/slices/buyerRequirementSlice";
import "@/app/globals.css";
import { getApi } from "@/services/apiService";
import CommonDropdown from "@/Components/layouts/commonDropdown";
import TextField from "@/Components/layouts/TextField";

export default function QuantityBudget({ next, back,errors }) {

  console.log("this is error on budget page",errors);
  const requirements = useSelector((state) => state.requirements.form);
  const [units, setunits] = useState();
  const [selectedUnits, setselectedUnits] = useState("");
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
 
    const handleDropdown = (name, value) => {

        if(errors[name]!==""){
          errors[name]="";
        }

        dispatch(
          setBuyerRequirements({
            [name]: value.id,
          }),
        );
      
    };

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
      
          {/* QUANTITY + UNIT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="flex flex-col w-full">
              <label className="text-black">Total Quantity *</label>

              <div className=" ">
                <TextField
                  // type="text"
                  placeholder="Enter quantity"
                  name="quantityRequired"
                  className=" text-black mt-1 rounded-lg  focus:border-lime-500 outline-none"
                  onChange={handleChange}
                  value={requirements.quantityRequired}
                />
                 {
                  errors.quantityRequired &&<p className="text-red-600 text-sm">{ errors.quantityRequired}</p>
                  
                }
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-black">Unit</label>

              <CommonDropdown
                label="Units"
                options={units}
                // value={selectedUnits}
                   value={
                units?.find((val) => val?.id === requirements?.unitId) || null
              }
                 className=" text-black   mt-1 rounded-lg  focus:border-lime-500 outline-none"
                name="unitId"
                placeholder="Select Unit"
                onChange={handleDropdown}
              />
                {
                  errors.unitId &&<p className="text-red-600 text-sm">{ errors.unitId}</p>
                  
                }
            </div>
          </div>

          <div className="mt-5 w-full">
            <div className="w-full">
              <label className="text-black">
                Expected Price Range (per unit)
              </label>
              <div className="flex  flex-1 gap-5 w-full">
                {/* <input
                  type="text"
                  name="minPrice"
                  className="border border-gray-300 mt-1 w-full rounded-lg h-11 px-4 text-black "
                  placeholder="Minimum Price"
                  value={requirements.minPrice}
                  onChange={handleChange}
                /> */}
               <div className="flex flex-1 flex-col">
                  <TextField
                    // type="text"
                    placeholder="Minimum Price"
                    name="minPrice"
                    className="  text-black mt-1 rounded-lg  focus:border-lime-500 outline-none"
                    onChange={handleChange}
                    value={requirements.minPrice}
                  />
                  <div>
                  {
                  errors.minPrice &&<p className="text-red-600 text-sm">{ errors.minPrice}</p>
                  
                }
                </div>
                </div>
               
                {/* <input
                  type="text"
                  name="maxPrice"
                  className="border border-gray-300 mt-1 w-full rounded-lg h-11 px-4 text-black"
                  placeholder="Maximum Price"
                  value={requirements.maxPrice}
                  onChange={handleChange}
                /> */}
   <div className="flex flex-1 flex-col">
                 <TextField
                    // type="text"
                    placeholder="Maximum Price"
                    name="maxPrice"
                    className="  text-black  mt-1 rounded-lg  focus:border-lime-500 outline-none"
                    onChange={handleChange}
                    value={requirements.maxPrice}
                  />
                  <div>
                   {
                  errors.maxPrice &&<p className="text-red-600 text-sm">{ errors.maxPrice}</p>
                  
                }
                </div>
                </div>
              </div>
            </div>

            <div className=""></div>
          </div>
       
      </section>
    </>
  );
}
