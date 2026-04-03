"use client";

import {
  Check,
  TrendingUp,
  Package,
  MessageSquare,
  Settings,
  Clock,
} from "lucide-react";
import "@/app/globals.css";
import { useState,useEffect } from "react";
import { getApi } from "@/services/apiService";
import EscrowPayment from "@/app/features/Escrow Payment/EscrowPayment";
import { postApi } from "@/services/apiService";




export default function NotificationsPage() {
   const[notifications,setnotifications]=useState();
     const [escrowModal,setEscrowModal]=useState(false);
  const [selectedListData,setselectedListData]=useState();

     const [notificationRefreshKey,setnotificationRefreshKey]=useState(0);
   
  
     useEffect(()=>{
    const fetchData=async()=>{
      const getData= await getApi("/notifications");
      const allNotifications=getData.data
      setnotifications(allNotifications)
      console.log(getData);
      setnotifications(notifications =>
      notifications.filter(n => n.actionCompleted !== true)
    );

    }
    fetchData();
   
  },[notificationRefreshKey])
  console.log("selectedListData",selectedListData);
   const handleReject=async (orderId,listingId)=>{
      console.log(orderId,listingId)
    const rejectApi =await postApi(`orders/${listingId}/reject`);
     if(rejectApi.success){
      setnotificationRefreshKey(refreshKey+1);
     }
  
    }
  return (
    <>
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-semibold text-gray-800">
          Notifications
        </h1>
        <button className="text_lime text-sm font-medium">
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-lime-100 text_lime text-xs px-3 py-1 rounded-full font-medium">
          3 new
        </span>

        <button className="back_lime text-white px-4 py-1.5 rounded-full text-sm font-medium">
          All
        </button>

        <button className="bg-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium">
          Unread
        </button>
      </div>

      {/* Notifications List */}
      {
         notifications && notifications.length > 0 &&
            (
           notifications.map((notification,index)=>(  

      <div className="bg-white rounded-xl border overflow-hidden" key={index}>
       
        {/* Highlight Notification */}
        {
          notification &&  notification?.type==="BID_ACCEPTED" &&(
        <div className="flex items-center justify-between px-5 py-4 bg-lime-50 border-b">
          
          <div className="flex items-start gap-4">
            
            {/* Icon */}
            <div className="w-10 h-10 rounded-full back_lime flex items-center justify-center text-white">
              <Check size={18} />
            </div>

           
            {/* Content */}
            <div>
              <p className="font-semibold text-gray-800">
                Bid Accepted
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Your bid of ₹{notification.bidAmount} for {notification.cropName}-{notification.variety} has been accepted by the seller
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mt-3">
                <button className="back_lime text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-lime-700" onClick={()=>{setselectedListData(notification);setEscrowModal(true)}}>
                      Confirm Purchase
                    </button>
                    <button className="border bg-red-500 text-white  px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600" onClick={()=>handleReject({orderId:notification.orderId},notification.orderId)}>
                      Reject
                    </button>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-end gap-2">
            <span className="w-2 h-2 back_lime rounded-full"></span>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={12} /> 4 hours ago
            </p>
          </div>
        </div>
)}
   {/* Normal Notifications */}
             { notification &&  notification?.type==="BID_PLACED" &&(
            <div className="px-4 py-3 flex justify-between items-start border-b hover:bg-gray-50">
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-lime-100 flex items-center justify-center rounded-full">
                  📦
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    New Bid received
                  </p>
                  <p className="text-sm text-gray-500">
                    You have recieved new bid ₹{notification.bidAmount} for {notification.cropName}-{notification.variety} ({notification.quantity} {notification.unit}) from {notification.sellerName}
                  </p>
                  {/* <p className="text-xs text-gray-400 mt-1">2 minutes ago</p> */}
                </div>
              </div>
              <span className="w-2 h-2 bg-lime-500 rounded-full mt-2"></span>
            </div>
)}


        {/* Normal Notification */}
        {/* <NotificationItem
          icon={<TrendingUp size={18} />}
          title="New Bid Received"
          desc="Ramesh Trading Co. placed a bid of ₹2,30,000 on your Wheat listing"
          time="2 hours ago"
          color="bg-lime-100 text_lime"
        /> */}

        {/* <NotificationItem
          icon={<Package size={18} />}
          title="Order Confirmation Pending"
          desc="Please confirm your purchase for Cotton - Bt Cotton within 24 hours"
          time="6 hours ago"
          color="bg-blue-100 text-blue-600"
        />

        <NotificationItem
          icon={<MessageSquare size={18} />}
          title="New Message"
          desc="Priya Sharma sent you a message about Rice - Basmati listing"
          time="1 day ago"
          color="bg-purple-100 text-purple-600"
        />

        <NotificationItem
          icon={<Settings size={18} />}
          title="Profile Completion"
          desc="Complete your KYC verification to unlock all platform features"
          time="2 days ago"
          color="bg-orange-100 text-orange-600"
        /> */}

      </div>

      )))}
    </div>
     {
              escrowModal && <EscrowPayment setEscrowModal={setEscrowModal} setnotificationRefreshKey={()=>setnotificationRefreshKey(notificationRefreshKey+1)} selectedListData={selectedListData} onClose={()=>setEscrowModal(false)} />
            }
            </>
  );
}

/* Reusable Component */
function NotificationItem({ icon, title, desc, time, color }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b last:border-none hover:bg-gray-50">
      
      <div className="flex items-start gap-4">
        
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>

        <div>
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-600 mt-1">{desc}</p>

          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <Clock size={12} /> {time}
          </p>
        </div>
      </div>

      {/* Unread dot */}
      <span className="w-2 h-2 back_lime rounded-full"></span>
    </div>

      
  );
}