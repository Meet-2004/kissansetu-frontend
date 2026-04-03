"use client";
import { useState } from "react";
import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";
import Link from "next/link";
import { getApi } from "@/services/apiService";

import { headFont } from "@/app/layout";
import { useEffect } from "react";

export default function Navbar() {
  const [openLogin, setopenLogin] = useState(false);
  const [openSignup, setopenSignup] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);


  // useEffect(()=>{
  //   async function fetchData(){
  //     const isLoggedIn=await getApi("")
  //   }
  // })

  return (
    <>
      <header className="bg-yellow-300 shadow w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3">

          {/* LOGO */}
          <h1 className="text-2xl ">
            <span className={`text-black cursor-pointer ${headFont.className}`}>Kisan</span>{" "}
            <span className={`text-lime-600 cursor-pointer ${headFont.className}`}>Setu</span>
          </h1>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-8 text-black font-sm items-center">
            <Link href="/" className="hover:text-lime-600">Home</Link>
            <Link href="/features" className="hover:text-lime-600">Features</Link>
            <Link href="/marketRates" className="hover:text-lime-600">Market Rates</Link>
            <Link href="/schemes" className="hover:text-lime-600">Schemes</Link>
          </nav>

          {/* RIGHT BUTTONS (desktop) */}
          <div className="hidden md:flex gap-4">
            <button
              className="bg-lime-500 text-white px-5 py-2 rounded-lg cursor-pointer"
              onClick={() => setopenLogin(true)}
            >
              Login
            </button>
            <button
              className="bg-white px-5 py-2 rounded-lg text-black cursor-pointer"
              onClick={() => setopenSignup(true)}
            >
              Sign Up
            </button>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenu(!mobileMenu)} className="text-2xl">
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="md:hidden bg-yellow-300 px-4 py-4 space-y-3 flex flex-col text-black">
            <Link href="/">Home</Link>
            <Link href="/features">Features</Link>
            <Link href="/marketRates">Market Rates</Link>
            <Link href="/schemes">Scheme</Link>

            <button
              className="bg-lime-500 text-white px-5 py-2 rounded-lg mt-2 
              "
              onClick={() => setopenLogin(true)}
            >
              Login
            </button>
            <button
              className="bg-white px-5 py-2 rounded-lg text-black 
              "
              onClick={() => setopenSignup(true)}
            >
              Sign Up
            </button>
          </div>
        )}
      </header>

      {openLogin && <LoginModal onClose={() => setopenLogin(false)} openSignup={()=>setopenSignup(true)}  />}
      {openSignup && <SignupModal onClose={() => setopenSignup(false)} openLogin={()=>setopenLogin(true)}   />}
    </>
  );
}