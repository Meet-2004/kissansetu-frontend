"use client";
import { useState } from "react";
import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";
import Link from "next/link";
import Logo from "@/SVG/Dashboard/KisanSetuLogo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";

export default function Navbar({
  togggleLogin,
  openLogin,
  openSignup,
  toggleSignup,
  closeMobileMenu,
  toggleMobileMenu,
  mobileMenu,
   openLoginCloseSignup,
          openSignupCloseLogin,
           onCloseLogin,
         onCloseSignup

}) {
  // const [openLogin, setopenLogin] = useState(false);
  

  // useEffect(()=>{
  //   async function fetchData(){
  //     const isLoggedIn=await getApi("")
  //   }
  // })

  console.log("This is mobile menu:", mobileMenu);

  return (
    <>
      <header className="w-full z-20 absolute flex items-center justify-between mt-2 px-4 md:px-12 md:py-9 py-3">
        {/* <div className="max-w-[98%]  flex items-center px-4 md:px-10 md:py-7 py-3"> */}
        <div>
          {/* LOGO */}
          <h1 className="text-2xl ">
            {/* <span className={`text-black cursor-pointer ${headFont.className}`}>Kisan</span>{" "}
            <span className={`text-lime-600 cursor-pointer ${headFont.className}`}>Setu</span> */}
            <Image
              src={Logo}
              alt="KisanSetu"
              className="h-[32px] sm:h-[38px] lg:h-[44px] w-auto object-contain"
            />
          </h1>
        </div>
        <div>
          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-8 text-black font-sm items-center">
            <Link href="/" className="hover:text-lime-600">
              Home
            </Link>
            <Link href="/features" className="hover:text-lime-600">
              Features
            </Link>
            <Link href="/marketRates" className="hover:text-lime-600">
              Market Rates
            </Link>
            <Link href="/schemes" className="hover:text-lime-600">
              Schemes
            </Link>
          </nav>
        </div>

        {/* RIGHT BUTTONS (desktop) */}
        <div className="hidden md:flex gap-4">
          <button
            className="bg-lime-500 text-white px-5 py-2 rounded-lg cursor-pointer"
            onClick={() => togggleLogin()}
          >
            Login
          </button>
          <button
            className="bg-white px-5 py-2 rounded-lg text-black cursor-pointer"
            onClick={() => toggleSignup()}
          >
            Sign Up
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <div className="md:hidden">
          <button
            onClick={() => toggleMobileMenu()}
            className="w-8 h-8 flex items-center justify-center"
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
          >
            {mobileMenu ? (
              <span className="flex items-center justify-center">
                <RxCross2 className="bg-gray-300 w-7 h-7 rounded-md text-black p-1" />
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <GiHamburgerMenu className="bg-gray-300 w-7 h-7 rounded-md text-black p-1" />
              </span>
            )}
          </button>
        </div>
        {/* </div> */}

        {/* MOBILE MENU */}
        {mobileMenu && (
        <div
  className={`md:hidden absolute w-[92%] left-1/2 -translate-x-1/2 top-full
  transition-all duration-800 ease-out
  ${
    mobileMenu
      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
      : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
  }`}
>
  <div className="mt-2 bg-white w-full px-4 py-4 space-y-3 flex flex-col text-black rounded shadow-md">
    
    <Link href="/" onClick={() => toggleMobileMenu()}>
      Home
    </Link>

    <Link href="/features" onClick={() => toggleMobileMenu()}>
      Features
    </Link>

    <Link href="/marketRates" onClick={() => toggleMobileMenu()}>
      Market Rates
    </Link>

    <Link href="/schemes" onClick={() => toggleMobileMenu()}>
      Scheme
    </Link>

  </div>
</div>

         
         
        )}
      </header>

      {openLogin && (
        <LoginModal
          // openSignup={() => setopenSignup(true)}
          toggleLogin={() => togggleLogin()}
          openSignupCloseLogin={openSignupCloseLogin}
            openLogin={openLogin}
             onCloseLogin={onCloseLogin}
      
 
        />
      )}
      {openSignup && (
        <SignupModal
          // onClose={() => setopenSignup(false)}
          toggleSignup={toggleSignup}
           openLoginCloseSignup={openLoginCloseSignup}
            openSignup={openSignup}  
         onCloseSignup={onCloseSignup}
        />
      )}
    </>
  );
}
