
"use client";
import HeroSection from "../../Components/landing/HeroSection";
import ServicesSection from "../../Components/landing/ServicesSection";
import HowItWorksSection from "../../Components/landing/HowItWorksSection";
import TestimonialsSection from "../../Components/landing/TestimonialsSection";
import StatsSection from "../../Components/landing/StatsSection";
import { getApi } from "@/services/apiService";
import {useEffect} from "react";




export default function Home() {

useEffect(()=>{
async function getAuth(){
 const URL = `${process.env.NEXT_PUBLIC_API_URL}/users/session`;
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      // add auth token if needed
      // Authorization: `Bearer `
      credentials: "include"
    }
  });
  console.log(response);
}

getAuth();

},[])





  return (
    <>
     
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <StatsSection />
     
    </>
  );
}
