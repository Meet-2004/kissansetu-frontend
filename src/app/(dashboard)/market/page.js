// "use client"
// import { useEffect, useState } from "react";
// import { getApi } from "@/services/apiService";



// export default function MarketPage() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async (pageNo = 1) => {
//     setLoading(true);
//     try {
//       const marketResponse = await getApi("/market/listings");

//       console.log(marketResponse);

//       // setData(json.items || []);
//       // setTotalPages(json.totalPages || 1);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData(page);
//   }, [page]);

//   return (
//     <div className=" min-h-screen px-4 sm:px-6 lg:px-8 py-4 sm:py-6">

//       {/* SEARCH + FILTER */}
//       <div className="bg-white p-4 sm:p-5 rounded-xl shadow mb-6">
//         <input
//           type="text"
//           placeholder="Search crops, inputs, equipment..."
//           className="w-full p-3 border rounded-lg mb-4 text-sm sm:text-base"
//         />

//         <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
//           <div className="flex flex-wrap gap-2">
//             {[
//               "Crop Type",
//               "Price Range",
//               "Location",
//               "Quantity",
//               "Sale Type",
//               "Time Left",
//             ].map((item) => (
//               <button
//                 key={item}
//                 className="px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm"
//               >
//                 {item}
//               </button>
//             ))}
//           </div>

//           <div className="w-full md:w-auto md:ml-auto">
//             <select className="w-full md:w-auto border px-3 py-2 rounded-lg text-sm">
//               <option>Ending Soon</option>
//               <option>Price Low to High</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* MARKET INSIGHTS */}
//       <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-6">
//         <h2 className="text-lg sm:text-xl font-semibold mb-4">Market Insights</h2>

//         <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mb-4">
//           <div>
//             <p className="text-gray-500 text-xs sm:text-sm">LIVE AUCTIONS COUNT</p>
//             <h3 className="text-xl sm:text-2xl font-bold">87</h3>
//           </div>

//           <div>
//             <p className="text-gray-500 text-xs sm:text-sm">TOP TRADED CROP</p>
//             <h3 className="text-lg sm:text-xl font-bold">Basmati Rice</h3>
//           </div>
//         </div>

//         {/* SCROLLING MARKET RATES */}
//         <div className="overflow-hidden border-t pt-3 sm:pt-4">
//           <div className="marquee flex gap-6 sm:gap-10 whitespace-nowrap text-xs sm:text-sm">
//             {[...Array(10)].map((_, i) => (
//               <span key={i}>
//                 Wheat ₹2,150 ↑ 2.5% | Cotton ₹8,500 ↓ 1.2% | Soybean ₹4,200 ↑ 1.5%
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* LISTINGS */}
//       <h2 className="text-lg sm:text-xl font-semibold mb-4">Live Listings</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//           {data.map((item, index) => (
//             <div key={index} className="bg-white rounded-xl shadow hover:shadow-lg transition">
//               <img
//                 src={item.image}
//                 alt="crop"
//                 className="h-40 sm:h-48 w-full object-cover rounded-t-xl"
//               />

//               <div className="p-4">
//                 <h3 className="font-semibold text-base sm:text-lg">{item.title}</h3>

//                 <div className="mt-2 text-xs sm:text-sm space-y-1">
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Sale Type: {item.saleType}</p>
//                 </div>

//                 <div className="mt-3">
//                   <p className="text_lime font-bold text-lg sm:text-xl">
//                     ₹{item.totalPrice}
//                   </p>
//                   <p className="text-xs sm:text-sm text-gray-500">
//                     ₹{item.perQuintal}/quintal
//                   </p>
//                 </div>

//                 <div className="mt-2 text-xs sm:text-sm text-gray-500">
//                   📍 {item.location}
//                 </div>

//                 <div className="flex gap-2 mt-4">
//                   <button className="flex-1 back_lime text-white py-2 rounded-lg text-xs sm:text-sm">
//                     View
//                   </button>
//                   <button className="flex-1 border py-2 rounded-lg text-xs sm:text-sm">
//                     Edit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* PAGINATION */}
//       <div className="flex flex-wrap justify-center mt-8 gap-2">
//         <button
//           onClick={() => setPage((p) => Math.max(p - 1, 1))}
//           className="px-3 py-2 border rounded text-sm"
//         >
//           Previous
//         </button>

//         {Array.from({ length: totalPages }).map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setPage(i + 1)}
//             className={`px-3 py-2 rounded text-sm ${
//               page === i + 1 ? "back_lime text-white" : "border"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//           className="px-3 py-2 border rounded text-sm"
//         >
//           Next
//         </button>
//       </div>

    
//     </div>
//   );
// }
