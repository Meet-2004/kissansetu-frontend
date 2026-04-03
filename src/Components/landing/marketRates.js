import { IoIosSearch } from "react-icons/io";
import { headFont } from "@/app/layout";
export default function marketRates() {
  return (
    <section>
      <div className="bg-white p-6  mx-auto text-center h-full">
        <div>
          <div className={`${headFont.className} text-5xl`}>
            <span className="text-black">Market </span>{" "}
            <span className="text-lime-500">Rates</span>
          </div>
          <div className="mt-5 text-gray-700">
            <span>
              Real-time commodity prices from major agricultural markets across
              India
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#F5F0E6] h-full w-full ">
        <div className="p-3 mx-auto relative">
          <IoIosSearch className="absolute left-120 w-5 h-5 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600" />
          <div className="text-center">
            <input
              type="search"
              className="w-[40%] h-10 rounded-lg border-2 border-gray-600 text-gray-600 mx-auto pl-7"
              placeholder="Search Here..."
            />
          </div>
        </div>
        <div className="flex">
            <div className="float-left border-2 border-black h-100 w-[50%]"> </div>
              <div className="float-right border-2 border-black h-100 w-[50%]"> </div>
        </div>
      </div>
      <div className="text-center mt-15">
        <div className={`${headFont.className} text-4xl `}><span className="text-black ">About</span> <span className="text-lime-500">Market Rates</span></div>
        <div className="text-center flex justify-center mt-3 mb-15">
        <p className=" text-gray-700 w-195 text-lg">This section provides real-time commodity prices from major agricultural markets across India. The data is updated daily to ensure you have the most current information.</p>
        </div>
      </div>
    </section>
  );
}
