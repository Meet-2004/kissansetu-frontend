"use client";
import Image from "next/image";
import { headFont } from "@/app/layout";
import landingBackGround from "@/assets/landingBackGround.png";
import landingMobileBackGround from "@/assets/landingPageMobile.png";
import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";
import { useState } from "react";

export default function HeroSection() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  return (
    <section
      className={`bg-[#F5F0E6] w-full min-h-[100svh] md:h-screen relative overflow-hidden`}
    >
      <Image
        src={landingBackGround}
        alt="Hero Image"
        className="md:object-cover object-center absolute inset-0 w-full h-full md:h-screen"
        priority
        fetchPriority="high"
        placeholder="blur"
      />
      <Image
        src={landingMobileBackGround}
        alt="Hero Image"
        className="md:object-cover md:hidden  object-center absolute inset-0 w-full h-full md:h-screen"
        priority
        fetchPriority="high"
        placeholder="blur"
      />

      <div className="absolute inset-0 bg-linear-to-b from-[rgba(255,255,255,0.15)]  via-[rgba(128,128,128,0.1)] to-[rgba(0,0,0,0.2)]" />

      <div className="max-w-7xl  relative mx-auto px-4 md:px-10 py-10 md:py-20 flex flex-col text-center  md:flex-row  md:justify-start gap-10 back min-h-[100svh] md:min-h-0">
        <div className="flex-1 mt-50 flex  md:mt-18 text-center md:text-left justify-center">
          <div className="md:hidden absolute top-25  ">
            <h2
              className={`md:hidden ${headFont.className} text-[52px] text-center leading-[1.02] text-black  flex flex-col`}
            >
              <span className="block">Empowering</span>
              <span className="block text-lime-500">Farmers</span>
              <span className="block">Through</span>
              <span className="block text-lime-500">Technology</span>
            </h2>
            <div className="leading-[1.02] mt-5 flex gap-5 justify-center items-center">
              <button
                className="bg-lime-500 z-50 text-white px-5 py-2 rounded-lg 
              "
                onClick={() => setOpenLoginModal(!openLoginModal)}
              >
                Login
              </button>
              <button
                className="bg-white px-5 py-2 rounded-lg text-black 
              "
                onClick={() => setOpenSignupModal(!openSignupModal)}
              >
                Sign Up
              </button>
            </div>
          </div>

          <h2 className="hidden md:flex text-3xl z-10 text-center md:text-6xl lg:text-7xl text-black flex-col gap-2">
            <div>
              <span className={headFont.className}>Empowering</span>
              <span className={`${headFont.className} text-lime-500 ml-3`}>
                Farmers
              </span>
            </div>
            <div>
              <span className={headFont.className}>Through</span>
              <span className={`${headFont.className} text-lime-500 ml-4`}>
                Technology
              </span>
            </div>
          </h2>
        </div>
      </div>
      {openSignupModal && (
        <SignupModal
          onCloseSignup={() => setOpenSignupModal(false)}
          openLogin={() => setOpenLoginModal(true)}
          openLoginCloseSignup={() => {
            setOpenLoginModal(true);
            setOpenSignupModal(false);
          }}
        />
      )}
      {openLoginModal && (
        <LoginModal
          onCloseLogin={() => setOpenLoginModal(false)}
          openSignup={() => setOpenSignupModal(true)}
          openSignupCloseLogin={() => {
            setOpenSignupModal(true);
            setOpenLoginModal(false);
          }}
        />
      )}
    </section>
  );
}
