"use client";
import { useEffect, useState } from "react";
import {
  Package,
  TrendingUp,
  User,
  MapPin,
  Calendar,
  Star,
  Flag,
  Download,
  Lock,
} from "lucide-react";
import "@/app/globals.css";
import { InsertEmoticon } from "@mui/icons-material";
import ReviewBox from "@/app/features/Review Rating Box/ReviewBox";
import OtpBox from "@/app/features/OTP Box/OtpBox";
import ReportBox from "@/app/features/Report Box/ReportBox";
import { MdLockOutline } from "react-icons/md";
import Image from "next/image";
import { getApi } from "@/services/apiService";
import { headFont } from "@/app/layout";

export default function OrderHistory() {
  const [orders, setOrders] = useState();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [orderId, setorderId] = useState();
  const [reportCardDeta, setreportCardDetail] = useState();
  const [refreshKey, setrefreshKey] = useState(0);
  const [amountAtOtp,setamountAtOtp]=useState();
  const[ratingReviewData,setratingReviewData]=useState();
  const [pdfSrc,setpdfSrc]= useState(null);

  const [stats, setStats] = useState({
    total: 0,
    purchases: 0,
    sales: 0,
    value: 0,
  });
  const [reviewRatings, setreviewRatings] = useState(false);
  const [otpBox, setotpBox] = useState(false);
  const [reportBox, setreportBox] = useState(false);
console.log("report data at page",reportCardDeta);
  // API CALL
  useEffect(() => {
    // fetch(`/api/orders?type=${filter}&search=${search}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setOrders(data.orders);
    //     setStats(data.stats);
    //   });
    async function fetchOrders() {
      if (filter === "all") {
        const ordersHistory = await getApi("/orderHistory");
        setOrders(ordersHistory.data);
      } else if (filter === "purchases") {
        const orderPurchased = await getApi("/orderHistory/purchased");
        setOrders(orderPurchased.data);
      } else if (filter === "sales") {
        const orderSold = await getApi("/orderHistory/sold");
        setOrders(orderSold.data);
      }
    }
    fetchOrders();
  }, [filter, refreshKey]);
  console.log("this is orders history", orders);

 async function handleDownload(orderId) {

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/orderHistory/${orderId}/download-invoice`;
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      // add auth token if needed
      // Authorization: `Bearer `
      credentials: "include"
    }
  });
  //  const response = await getApi(`/orderHistory/${orderId}/download-invoice`);

  const blob = await response.blob(); // correct

  const contentDisposition = response.headers.get("Content-Disposition") || "";
  const match = contentDisposition.match(/filename="?([^"]+)"?/);
  const fileName = match ? match[1] : `invoice_${orderId}.pdf`;

  const url = window.URL.createObjectURL(blob);

  //  OPEN in new tab
  window.open(url, "_blank");

  //  OR download (choose one)
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
}
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-3 sm:space-y-6">
      {/* TITLE */}
      <div>
        <h1 className={`text-xl sm:text-2xl text-3xl text-black ${headFont.className}`}>Order History</h1>
        <p className="text-sm sm:text-base text-gray-500 mb-2 sm:mb-4">
          Complete record of all your past transactions
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <StatCard icon={<Package />} value={stats.total} label="Total Orders" />
        <StatCard
          icon={<TrendingUp />}
          value={stats.purchases}
          label="Purchases"
        />
        <StatCard icon={<TrendingUp />} value={stats.sales} label="Sales" />
        <StatCard
          icon={<Package />}
          value={`₹${stats.value}`}
          label="Total Value"
          highlight
        />
      </div>

      {/*  SEARCH + FILTER  */}
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-xl border border-gray-300">
        <input
          type="text"
          placeholder="Search by product, order ID, or buyer/seller..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-300 outline-none text-black h-10 text-sm sm:text-base"
        />

        <div className="grid grid-cols-3 gap-2 text-black md:flex">
          {["all", "purchases", "sales"].map((f, index) => (
            <button
              key={index}
              onClick={() => setFilter(f)}
              className={`px-2 sm:px-4 py-2 rounded-lg capitalize text-xs sm:text-sm ${
                filter === f ? "back_lime text-white" : "bg-gray-200"
              } h-10`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/*  LIST  */}
      <div className="space-y-4">
        {orders &&
          orders.map((orders, index) => (
            <OrderCard
              key={index}
              orders={orders}
              setotpBox={setotpBox}
              setorderId={setorderId}
              setreportBox={setreportBox}
              setamountAtOtp={setamountAtOtp}
              setreviewRatings={setreviewRatings}
              setreportCardDetail={setreportCardDetail}
              reportCardDeta={reportCardDeta}
              setratingReviewData={setratingReviewData}
              handleDownload={handleDownload}
              pdfSrc={pdfSrc}
            />
          ))}
      </div>
      {reviewRatings && (
        <ReviewBox
          onClose={() => {
            setreviewRatings(false);
          }}
          ratingReviewData={ratingReviewData}
        
        />
      )}
      {reportBox && (
        <ReportBox
          onClose={() => {
            setreportBox(false);
          }}
          reportCardDeta={reportCardDeta}
        />
      )}
      {otpBox && (
        <OtpBox
          onClose={() => {
            setotpBox(false);
          }}
          open={true}
          orderId={orderId}
          setrefreshKey={() => setrefreshKey(refreshKey + 1)}
          amountAtOtp={amountAtOtp}
        />
      )}
        {pdfSrc !== null && <a href={pdfSrc} target="_blank">h</a>}
    </div>
  );
}

/*  STAT CARD  */
function StatCard({ icon, value, label, highlight }) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border bg-white ${
        highlight ? "border-lime-500" : "border-gray-200"
      }`}
    >
      <div className="p-3 bg-lime-100 rounded-lg text_lime">{icon}</div>
      <div>
        <p className="text-lg font-semibold text-black">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

/*  ORDER CARD  */
function OrderCard({
  orders,
  setotpBox,
  setreportBox,
  setreviewRatings,
  setorderId,
  setreportCardDetail,
  setratingReviewData,
  setamountAtOtp,
  handleDownload,
  pdfSrc
}) {
  const imageUrl = (path) => `${process.env.NEXT_PUBLIC_API_URL}/${path}`;

  console.log("This is orders inside list", orders);
  return (
    <div className="bg-white p-3 sm:p-5 rounded-xl border shadow-sm flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-8 hover:shadow-xl transition">
      {/* LEFT */}
      <div className="flex gap-3 sm:gap-4 md:flex-1 md:w-50">
        <div className="flex flex-col shrink-0">
          <span
            className={`bg-blue-1 px-2 py-1 text-[10px] sm:text-xs rounded w-full text-center font-medium ${orders?.type === "SOLD" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}
          >
            {orders.type}
          </span>
          <Image
            src={imageUrl(orders?.images[0]?.filePath)}
            alt="Image"
            width={300}
            height={250}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover mt-2"
            unoptimized
          />
        </div>

        <div className="min-w-0">
          <h2 className="font-semibold text-base sm:text-lg text-black truncate">
            {orders.commodity}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 truncate">{orders.variety}</p>

          <div className="flex flex-col gap-1 mt-1">
            <span className="text-xs sm:text-sm text-gray-400">#{orders.orderId}</span>
            <p className="text_lime font-semibold text-xl sm:text-2xl">₹{orders.amount}</p>

          </div>
          { orders.type === "PURCHASED" && 
          <>
          <div className="mt-3 sm:mt-5 w-32">
            <p className="text-gray-600 text-xs sm:text-sm">Your OTP Code</p>
            <div className={`flex p-2 mt-1 gap-2 rounded-lg ${orders.paymentLabel=== "PAYMENT_HELD" ? "border-2 bg-[#64b900]/10 border-[#64b900] text_lime" :  "border-gray-300 border-2 bg-gray-100 text-gray-500"}`}>
              <p className="flex justify-center items-center text-lg sm:text-xl"><MdLockOutline /></p>
              <p className="text-lg sm:text-xl">{orders.otp}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-xs md:w-50 mt-1">{orders.paymentLabel=== "PAYMENT_HELD" ? "Share with seller for payment release" :"✓ Used by seller"}</p>
            </div>
            </>
}
        </div>
      </div>

      {/* CENTER */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs sm:text-sm md:flex md:flex-col md:gap-1 md:min-w-44">
        {/* <StatusBadge status={orders.status} /> */}

        <div>
          <span className="text-gray-500">Quantity</span>{" "}
          <p className="text-black">{orders.quantity} Quintal</p>
        </div>

        <div className="flex items-start gap-1 text-gray-600">
          <div className="flex flex-col w-4 sm:w-5 pt-1">
            <p className="flex items-center justify-center">
              <User size={16} className="flex items-center justify-center" />
            </p>
          </div>
          <div className="flex flex-col min-w-0 md:w-24">
            <p className="text-xs">
              {" "}
              {orders.type === "SOLD" ? "Buyer " : "Seller"}
            </p>
            <p className="text-black text-sm truncate">
              {orders.type === "SOLD"
                ? `${orders.buyerName}`
                : `${orders.sellerName}`}
            </p>
          </div>
        </div>

        <p className="flex items-center gap-1 sm:gap-2 text-gray-600 md:mt-2 min-w-0">
          <MapPin size={14} />
          <span className="truncate">{orders.district},{orders.state}</span>
        </p>

        <p className="flex items-center gap-1 sm:gap-2 text-gray-400 text-xs md:mt-2">
          <Calendar size={14} />
          <span className="text-gray-600">Ordered:</span>{" "}
          <span className="text-black">{`${orders.orderedAt[2]}-${orders.orderedAt[1]}-${orders.orderedAt[0]}`}</span>
        </p>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:flex md:flex-col md:w-[100%] md:items-center   md:flex-none">
        <button
          className="back_lime text-white py-2.5 md:w-[80%] md:py-3 w-full rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => { setratingReviewData({
              Image: orders?.images[0]?.filePath,
              cropName: orders.commodity,
              variety: orders.variety,
              orderDate: orders.orderedAt,
              orderId:orders.orderId,
              user:orders.type === "SOLD" ? "Buyer " : "Seller",
              userName: orders.type === "SOLD" ? orders.buyerName : orders.sellerName

            });setreviewRatings(true)}}
        >
          <Star size={16} /> <span className="text-xs">Rate & Review</span>
        </button>

        <button
          className="border border-red-400 md:w-[80%] text-red-500 py-2.5 md:py-3 w-full rounded-lg flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => {
              setreportCardDetail({
              Image: orders?.images[0]?.filePath,
              cropName: orders.commodity,
              variety: orders.variety,
              orderDate: orders.orderedAt,
              orderId:orders.orderId,
              user:orders.type === "SOLD" ? "Buyer " : "Seller",
              userName: orders.type === "SOLD" ? orders.buyerName : orders.sellerName

            });
            setreportBox(true);
          
          }}
        >
          <Flag size={16} />{" "}
          <span className="text-xs">
            {" "}
            {orders.type === "SOLD" ? "Report Buyer" : "Report Seller"}
          </span>
        </button>

        {orders.type === "SOLD" && orders.paymentLabel !== "RELEASED" && (
          <button
            className="back_lime text-white py-2.5 md:w-[80%] md:py-3 w-full rounded-lg flex items-center justify-center gap-2 cursor-pointer sm:col-span-2 md:col-span-1"
            onClick={() => {
              setorderId(orders.orderId);
              setamountAtOtp(orders.amount);
              setotpBox(true);
            }}
          >
            <Lock size={16} /> <span className="text-xs">Enter OTP</span>
          </button>
        )}

        {orders.orderStatus === "COMPLETED" &&  orders.paymentLabel === "RELEASED" && (
          <button className="border-2 border-gray-300 md:w-[80%] py-2.5 md:py-3 w-full text-black rounded-lg flex items-center justify-center gap-2 cursor-pointer sm:col-span-2 md:col-span-1" onClick={()=>handleDownload(orders.orderId)}>
            <Download size={16} />{" "}
            <span className="text-xs">Download Invoice</span>
          </button>
        )}
      </div>
    
    </div>
  );
}

/*  STATUS BADGE  */
function StatusBadge({ status }) {
  const map = {
    delivered: "bg-lime-100 text_lime",
    awaiting_otp: "bg-yellow-100 text-yellow-600",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full w-fit ${map[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
}
