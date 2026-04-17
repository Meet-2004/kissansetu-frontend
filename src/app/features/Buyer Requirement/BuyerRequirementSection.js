"use client"
import { MapPin, CalendarDays, Package, Award } from "lucide-react";
import RequirementCard  from "./RequirementCard";
import { headFont } from "@/app/layout";
import { getApi } from "@/services/apiService";
import { useEffect,useState } from "react";
import Link from "next/link"
import  ZeroRequirementsLayouts  from "../My Listings/ZeroRequirementsLayouts";


export default function BuyerRequirementSection() {

  const [buyerRequirements,setBuyerRequirements]=useState();

useEffect(()=>{

  async function fetchRequirement(){
    const getRequirements= await getApi("/listings/seller/requirements");
    console.log("this is requirements",getRequirements?.data)
    // setBuyerRequirements(getRequirements.data);

  const top2= getRequirements?.data?.slice(0,2) || [];
  setBuyerRequirements(top2);


  }
  fetchRequirement();

},[])



  const data = [

    {
      crop: "Wheat – HD-2967",
      buyer: "Rajesh Mills Pvt Ltd",
      price: "₹   2,100 – ₹2,400",
      quantity: "150 Quintal",
      grade: "Grade A",
      location: "Meerut, Uttar Pradesh",
      deadline: "15 Mar 2026",
      notes: "Looking for fresh harvest with moisture content below 12%",
    },
    {
      crop: "Rice – Basmati 1121",
      buyer: "Sharma Trading Co.",
      price: "₹4,200 – ₹4,800",
      quantity: "80 Quintal",
      grade: "Premium (A+)",
      location: "Delhi NCR",
      deadline: "10 Mar 2026",
      notes: "Need premium quality for export purposes. Certification required.",
    },
  ];

  return (
    <div className="min-w-sm max-w-300  mx-auto flex flex-col ">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-3xl  text-black ${headFont.className}`}>
            Buyer Requirements
          </h1>
          <p className="text-gray-700 text-md mt-1">
            Match your inventory with buyer needs
          </p>
        </div>

        <span className="bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-sm font-medium">
          2 Active
        </span>
      </div>
     {
         buyerRequirements && buyerRequirements.length >= 2 &&
        <div>
            <Link href="/my-listings" className="float-right text_lime text-xl ">View All</Link>
            </div>
}

      {/* CARDS GRID */}
       {buyerRequirements && buyerRequirements.length > 0 ? (
      <div className="grid grid-cols-2 gap-6 mt-5">
        {buyerRequirements && buyerRequirements.length > 0 && buyerRequirements.map((item, index) => (
          <RequirementCard key={index} item={item} />
        ))}
      </div>):(<ZeroRequirementsLayouts />)

}
    </div>
  );
}