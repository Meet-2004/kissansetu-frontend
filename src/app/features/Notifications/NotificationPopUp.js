"use client";
import { useState,useEffect } from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import { getApi } from "@/services/apiService";
import { get } from "react-hook-form";
import "@/app/globals.css";
import EscrowPayment from "../Escrow Payment/EscrowPayment";
import { postApi } from "@/services/apiService";


export default function NotificationDropdown() {

  const [notifications,setnotifications]=useState();
  const [selectedListData,setselectedListData]=useState();
  const [escrowModal,setEscrowModal]=useState(false);
  const [notificationRefreshKey,confirmPaymentRefreshKey]=useState(0);

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

console.log(notifications);

  const handleReject=async (orderId,listingId)=>{
    console.log(orderId,listingId)
  const rejectApi =await postApi(`orders/${listingId}/reject`);
   if(rejectApi.success){
    console.log("hello rejected");
    confirmPaymentRefreshKey(notificationRefreshKey+1);
   }
  }

  console.log("this is purchase details",selectedListData);
  return (
    <div className="relative">
    

      {/* Dropdown */}
      
        <div className="absolute right-15 mt-8 w-[360px] bg-white rounded-xl shadow-xl border z-50">
          
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-700">Notifications</h3>
            <button className="text_lime text-sm font-medium">
              Mark all as read
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[400px] overflow-y-auto">
          {
           
            notifications && notifications.length > 0 &&
            (
              notifications.map((notification,index)=>(  
              <>
              
            {/* Highlight Notification */}
            { notification &&  notification?.type==="BID_ACCEPTED" &&(
            <div className="bg-lime-50 px-4 py-4 border-b">
              <div className="flex gap-3">
                
                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center back_lime rounded-full text-white text-lg">
                  ✓
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    🎉 Your Bid Has Been Accepted!
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    The seller has accepted your bid for{" "}
                    <span className="font-medium">{notification.cropName}-{notification.variety}</span> at{" "}
                    <span className="font-semibold text_lime">
                      ₹{notification.bidAmount}
                    </span>. Please confirm your purchase within 24 hours.
                  </p>

                  {/* Timer */}
                  <p className="text_lime text-sm mt-2">
                    ⏱ 23h 45m remaining
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button className="back_lime text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-lime-700" onClick={()=>{setselectedListData(notification);setEscrowModal(true)}}>
                      Confirm Purchase
                    </button>
                    <button className="border bg-red-500 text-white  px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600" onClick={()=>handleReject({orderId:notification.orderId},notification.orderId)}>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )
}

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

            {/* <div className="px-4 py-3 flex justify-between items-start hover:bg-gray-50">
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-blue-100 flex items-center justify-center rounded-full">
                  💳
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Payment received
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹12,500 received for order #12345
                  </p>
                </div>
              </div>
              <span className="w-2 h-2 bg-lime-500 rounded-full mt-2"></span>
            </div> */}
            </>
              ))
          
            )
          }

 </div>

          {/* Footer */}
          <div className="text-center py-3 border-t">
            <Link href={"/notifications"} className="text_lime font-medium text-sm hover:underline">
              View all notifications
            </Link>
          </div>

        </div>
    
        {
          escrowModal && <EscrowPayment setEscrowModal={setEscrowModal} confirmPaymentRefreshKey={()=>confirmPaymentRefreshKey(notificationRefreshKey+1)} selectedListData={selectedListData} onClose={()=>setEscrowModal(false)} />
        }
    </div>
  );
}