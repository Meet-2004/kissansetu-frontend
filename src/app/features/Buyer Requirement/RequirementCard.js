import { MapPin, CalendarDays, Package, Award } from "lucide-react";

export default function RequirementCard({ item }) {

  console.log("this is item in requirement card",item);
  return (

    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {item?.cropName} - {item?.variety}
          </h2>
          <p className="text-sm text-gray-500">
            Posted by: {item?.buyerName}
          </p>
        </div>

        <span className="bg-lime-100 text-lime-700 text-xs px-3 py-1 rounded-full font-medium">
          {item?.urgency}
        </span>
         
      </div>

      {/* PRICE BOX */}
      <div className="bg-green-50 border-l-4 border-lime-500 rounded-lg p-4 mb-4">
        <p className="text-xs text-gray-500 mb-1">
          Expected Price (per {item?.unit})
        </p>
        <p className="text-xl font-bold text-lime-600">
          ₹{item?.expectedMinPrice} - ₹{item?.expectedMaxPrice}
        </p>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-y-4 text-sm mb-4">

        <div className="flex gap-2 items-start">
          <Package size={16} className="text-gray-400 mt-1" />
          <div>
            <p className="text-gray-500">Quantity Required</p>
            <p className="font-medium text-gray-800">
              {item?.quantityRequired}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <Award size={16} className="text-gray-400 mt-1" />
          <div>
            <p className="text-gray-500">Quality Grade</p>
            <p className="font-medium text-gray-800">
              {item?.grade}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <MapPin size={16} className="text-gray-400 mt-1" />
          <div>
            <p className="text-gray-500">Location</p>
            <p className="font-medium text-gray-800">
              {item?.district}, {item?.state}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <CalendarDays size={16} className="text-gray-400 mt-1" />
          <div>
            <p className="text-gray-500">Deadline</p>
            <p className="font-medium text-gray-800">
              {item?.deadline[1]}-{item?.deadline[2]}-{item?.deadline[0]}
            </p>
          </div>
        </div>

      </div>

      <hr className="my-3" />

      {/* NOTES */}
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">
          Additional Notes:
        </p>
        <p className="text-sm text-gray-700">
          {item.additionalNotes}
        </p>
      </div>

      {/* BUTTON */}
      <button className="w-full border border-lime-400 text-gray-800 py-2 rounded-xl hover:bg-lime-50 transition">
        Contact Buyer
      </button>

    </div>
  );
}