"use client"
import Notification from "@/SVG/Dashboard/Notification.svg";
import Image from "next/image";
import {useState} from "react";
import { postApi } from "@/services/apiService";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import toogle from "@/SVG/Dashboard/toogle.svg";
import NotificationPopUp from "@/app/features/Notifications/NotificationPopUp"
import Link from "next/link";
import routes from "@/app/config/routes"
import { usePathname } from "next/navigation";
import { loginSuccess } from "@/app/Store/slices/authSlice";
import { CgProfile } from "react-icons/cg";




export default function Navbar_Dashboard({toogleButton,settoogleButton,notificationDropDown,onToogleNotification,onCloseNotification,onProfileToogle,profileDown}) {
  const router = useRouter();
  const pathName=usePathname();

  const authDetails = localStorage.getItem("persist:auth");
  const authDetailsParsed = JSON.parse(authDetails) || {};
  const userName=JSON.parse(authDetailsParsed?.user) || null ;
  const userMail=JSON.parse(authDetailsParsed?.email) || null ;
  






  const current=Object.values(routes).find((r)=>r.path===pathName);

  const title=current?.title || "dashboard";

 

  const handleLogout=async()=>{
    const logout= await postApi("/users/logout");
    localStorage.removeItem("persist:auth")
    console.log(logout);

  console.log(logout);
  if(logout.success){
  console.log("hello")
   router.push("/");
    router.refresh();
  }
   else{
    console.log(error);
   }
    
  }


  // return (
  //  <div>
  //   <header className="bg-white h-18 border-b px-6 flex items-center justify-between " >

  //     {/* Left title */}
  //     <h1 className="text-black text-lg font-semibold">
  //       Dashboard
  //     </h1>

  //     {/* Right section */}
  //     <div className="flex items-center gap-5">

  //       {/* Notification */}
  //       <button className="hover:bg-gray-100 p-2 rounded-lg">
  //         <Image src={Notification} alt="notification" />
  //       </button>

  //       {/* Profile */}
  //       <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer" onClick={()=>setprofileDown(!profileDown)} >
       
  //         <div className="text-right">
  //           <p className="text-black text-sm font-medium">Rahul Kumar</p>
  //           <p className="text-gray-500 text-xs">rahul@example.com</p>
  //         </div>
  //       {profileDown &&    <div className="w-45 h-30 bg-white  absolute top-18 border border-gray-400 rounded-xl shadow-2xl">
  //         <button className="w-full h-10 border-b border-gray-300 flex  px-5 items-center gap-3 cursor-pointer hover:bg-gray-200  "  onClick={handleLogout}>
  //           <p><FiLogOut className="text-red-600" /></p>
  //           <div className="text-red-600 text-sm " >Logout</div>
  //         </button>

  //       </div> }
  //         <div className="h-10 w-10 rounded-full bg-lime-500 flex items-center justify-center text-white font-bold">
  //           R
  //         </div>
  //       </div>

  //     </div>
  //   </header>
  //   </div>
  // );

 return (
    <header className="bg-white border-b px-4 sm:px-6 h-16 flex items-center justify-between relative shrink-0">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden hover:bg-gray-100 p-2 rounded-lg"
          onClick={() => settoogleButton(true)}
        >
          <Image
            src={toogle}
            alt="menu"
            width={22}
            height={22}
          />
        </button>

        {/* TITLE */}
        <h1 className=" text-black sm:text-lg">

          {/* Mobile */}
          <span className="block md:hidden">
            KissanSetu
          </span>

          {/* Desktop */}
          <span className="hidden md:block ">
            {title}
          </span>

        </h1>

      </div>


      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* NOTIFICATION */}
        <button className="hover:bg-gray-100 p-2 rounded-lg transition" onClick={onToogleNotification}>
          <Image
            src={Notification}
            alt="notification"
            width={22}
            height={22}
          />
        </button>


        {/* PROFILE */}
        <div
          className="relative flex items-center gap-2 sm:gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer transition"
          onClick={onProfileToogle}
        >

          {/* PROFILE TEXT */}
          <div className="hidden sm:block text-right">

            <p className="text-black text-sm font-medium">
              {userName}
            </p>

            <p className="text-gray-500 text-xs">
              {userMail}
            </p>

          </div>


          {/* AVATAR */}
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-lime-500 flex items-center justify-center text-white font-bold">
            {userName[0]?.toUpperCase()}
          </div>


          {/* DROPDOWN */}
          {profileDown && (
            <div className="absolute right-0 top-12 w-44 bg-white border rounded-xl shadow-xl overflow-hidden mt-3">

              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <FiLogOut className="text-red-600" />
                <span className="text-red-600 text-sm">
                  Logout
                </span>
              </button>
                <Link
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                href="/profile"
              >
                <CgProfile className="text-gray-700" />
                <span className="text-gray-700 text-sm">
                  View Profile
                </span>
              </Link>

            </div>
          )}
          {
            notificationDropDown && (
              <NotificationPopUp />
            )
          }

        </div>

      </div>

    </header>
  );
}
