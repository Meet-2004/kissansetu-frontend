"use client";
import {useState} from "react";
import Sidebar from "@/Components/layouts/Sidebar";
import Navbar_Dashboard from "@/Components/layouts/Navbar_Dashboard";
import { fabClasses } from "@mui/material";

const Dashboardlayout = ({ children }) => {
   const[notificationDropDown,setnotificationDropDown]=useState(false);
     const[profileDown,setprofileDown]=useState(false);
   const [toogleButton, settoogleButton] = useState(true);
  return (
    <div className="h-screen overflow-hidden bg-[#FEFAF0]">
      <Sidebar
        toogleButton={toogleButton}
        settoogleButton={settoogleButton}
      />

      <div
        className={`flex h-full flex-col overflow-hidden transition-all duration-300 ${
          toogleButton ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <Navbar_Dashboard
          toogleButton={toogleButton}
          settoogleButton={settoogleButton}
          onToogleNotification={()=>setnotificationDropDown(!notificationDropDown)}
          onCloseNotification={()=>setnotificationDropDown(false)}
          notificationDropDown={notificationDropDown}
          onProfileToogle={()=>setprofileDown(!profileDown)}
          profileDown={profileDown}

        />

        <main className="flex-1 overflow-y-auto min-h-0 " onClick={()=>{setnotificationDropDown(false);setprofileDown(false)}} >
          <div className="">
          {children}
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboardlayout;
