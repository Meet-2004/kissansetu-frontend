
"use client";
import HeroSection from "../../Components/landing/HeroSection";
import ServicesSection from "../../Components/landing/ServicesSection";
import HowItWorksSection from "../../Components/landing/HowItWorksSection";
import TestimonialsSection from "../../Components/landing/TestimonialsSection";
import StatsSection from "../../Components/landing/StatsSection";
import { getApi } from "@/services/apiService";
import {useEffect} from "react";
import {useRouter} from "next/navigation";




export default function Home() {

  const route=useRouter();

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
if(response.status === 200){
  console.log("User is authenticated");
  route.push("/dashboard");
  console.log(response);
}
else{
  route.push("/");
}
}

getAuth();
},[])

  return (
    <>
     
      <HeroSection  />
       <StatsSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
     
     
    </>
  );
}
