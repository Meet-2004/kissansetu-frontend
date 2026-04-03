"use client";
import toogle from "@/SVG/Dashboard/toogle.svg";
import leftLeaf from "@/SVG/Dashboard/Leaf_left.svg";
import rightLeaf from "@/SVG/Dashboard/Leaf_Right.svg";
import Dashboards from "@/SVG/Dashboard/Dashboards.svg";
import Setting from "@/SVG/Dashboard/Setting.svg";
import My_Listing from "@/SVG/Dashboard/My_Listing.svg";
import Messages from "@/SVG/Dashboard/Messages.svg";
import Market from "@/SVG/Dashboard/Market.svg";
import Profile from "@/SVG/Dashboard/Profile.svg";
import Mybiddings from "@/SVG/Dashboard/Mybiddings.svg";
import Orderhistory from "@/SVG/Dashboard/Orderhistory.svg";
import { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import Link from "next/link";
import "@/app/globals.css";
import { TbHammer } from "react-icons/tb";
import { GrHistory } from "react-icons/gr";
import routes from "@/app/config/routes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
// import { TbHammer } from "react-icons/tb";

export default function Sidebar({ settoogleButton, toogleButton }) {
  const pathName = usePathname();
  console.log("this is pathname", pathName);
  const [active, setactive] = useState();

  useEffect(() => {
    const current = Object.values(routes).find((r) => r.path === pathName);
    if (current) {
      setactive(current.title);
    } else {
      setactive("");
    }
  }, [pathName]);

 
  const halfList = [
    {
      id: 0,
      src: Profile,
    },
    {
      id: 1,
      src: Market,
    },
    {
      id: 2,
      src: My_Listing,
    },
    {
      id: 3,
      src: Mybiddings,
    },
    {
      id: 4,
      src: GrHistory,
    },

    {
      id: 5,
      src: Messages,
    },

    {
      id: 6,
      src: Setting,
    },
  ];
  const fullList = [
    {
      id: 0,
      src: Profile,
      name: "Dashboard",
      path: "/dashboard",
    },
   
    {
      id: 1,
      src: My_Listing,
      name: "My Listings",
      path: "/my-listings",
    },
    {
      id: 2,
      src: Mybiddings,
      name: "My Biddings",
      path: "/my-biddings",
    },
    {
      id: 3,
      src: Orderhistory,
      name: "Order History",
      path: "/order-history",
    },
    {
      id: 4,
      src: Messages,
      name: "Messages",
      path: "/messages",
    },

    {
      id: 5,
      src: Setting,
      name: "Setting",
      path: "/setting",
    },
  ];

  // const handleClick=(name)=>{
  //   console.log(name);
  //   route(/name);
  // }

  return (
    <>
      {/* MOBILE OVERLAY */}
      {toogleButton && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50  md:hidden"
          onClick={() => settoogleButton(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed
        top-0 left-0
        h-screen
        bg-white
        border-r
        transition-all duration-300
        

        ${toogleButton ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${toogleButton ? "w-64" : "w-20"}
      `}
      >
        {/* HEADER */}
        <div className="h-16 border-b flex items-center justify-between px-4">
          {/* LOGO */}
          {toogleButton && (
            <div className="flex items-center gap-1">
              <Image src={leftLeaf} alt="left leaf" />
              <Image src={rightLeaf} alt="right leaf" />
              <span className="font-semibold text-black">KissanSetu</span>
            </div>
          )}

          {/* TOGGLE BUTTON */}
          <button
            onClick={() => settoogleButton(!toogleButton)}
            className="hover:bg-gray-100 p-2 rounded-lg"
          >
            <Image src={toogle} alt="toggle button" width={20} height={20} />
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col mt-4 px-2 gap-1">
          {fullList.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              // onClick={() => setactive(item.name)}
              className={`flex items-center  gap-3 px-3 py-3 rounded-lg hover:bg-gray-200 transition
            ${active === item.name ? "bg-lime-500 text-white" : ""} ${!toogleButton && "justify-center"}`}
            >
              <Image src={item.src} alt="icon" width={20} height={20} />

              {toogleButton && (
                <span className="text-sm text-black">{item.name}</span>
              )}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}

// return (
//   <>
//     {/* <div>
//           hello this is sidebar
//       </div>      */}
//     <section>
//       {!toogleButton && (
//         <div className="hidden  md:block md:max-w-fit bg-white min-w-18 max-w-lg h-screen border-r  tarnsition-all duration-300 translate-x-0">
//           <div className=" h-18 border-b  ">
//             <div className="flex justify-between items-center px-5 py-3">
//               <div className="flex flex-col  justify-center items-center">
//                 <button onClick={() => settoogleButton(true)} className=" hover:bg-gray-100 p-2 rounded-lg">
//                   <div>
//                     <Image
//                       src={toogle}
//                       alt="toogle button"
//                       className=" text-black text-center "
//                     ></Image>
//                   </div>
//                 </button>
//                 <div>
//                   <div className="flex  gap-0 mt-1">
//                     <Image src={leftLeaf} alt="left leaf"></Image>
//                     <Image src={rightLeaf} alt="left leaf"></Image>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="">
//             <div className="flex  flex-col mt-4  justify-center items-center">
//               {halfList.map((item, i) => {
//                 return (
//                   <div
//                     key={item.id}
//                     className="flex flex-col justify-center items-center rounded-lg px-3 py-3 hover:bg-amber-100 cursor-pointer"
//                   >
//                     <Image src={item.src} alt="svg" className=""></Image>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}

//       {toogleButton && (
//         <section className="hidden md:block md:max-w-fit bg-white  min-w-3xs  h-screen  border duration-300 transition-all  translate-x-0">
//           <div className="h-15 border-b">
//             <div className="flex gap-10 h-10 w-60 mx-auto mt-3 justify-center items-center">
//               <div className="flex justify-center items-center">
//                 <div className="flex  gap-0 mt-1">
//                   <Image src={leftLeaf} alt="left leaf"></Image>
//                   <Image src={rightLeaf} alt="left leaf"></Image>

//                   <div className="text-black">Kissan setu</div>
//                 </div>
//               </div>
//               <div className="items-center justify-center flex ">
//                 <button onClick={() => settoogleButton(false)} className=" hover:bg-gray-100 p-2 rounded-lg">
//                   <div>
//                     <Image
//                       src={toogle}
//                       alt="toogle button"
//                       className=" text-black text-center "
//                     ></Image>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col mt-5 ml-4 gap-2">
//             {fullList.map((item, i) => {
//               return (
//                 <Link
//                   key={item.id}
//                   href={item.path} onClick={()=>setactive(item.name)}
//                   className={`flex  px-3 py-2 h-12 hover:bg-gray-200 max-w-55 cursor-pointer  rounded-lg ${active === item.name ? "bg-lime-500 text-white " : " "} `}
//                 >
//                   <div className="px-3  flex ">
//                     <Image src={item.src} alt="no Image found"></Image>
//                   </div>
//                   <div className="text-black py-1 text-center">
//                     {/* <Link >{item.name}</Link> */}
//                                           <p>{item.name}</p>

//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </section>
//       )}
//     </section>
//   </>
// );
