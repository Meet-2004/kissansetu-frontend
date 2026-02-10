"use client";
import { useState } from "react";
import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";
export default function Navbar() {
    const [openLogin, setopenLogin] = useState(false);
     const [openSignup, setopenSignup] = useState(false);
  return (

    <>
    <header className="bg-yellow-400 shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">KisanSetu</h1>

        <nav className="hidden md:flex gap-8 font-medium text-black" >
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Services</a>
          <a href="#">How It Works</a>
          <a href="#">Testimonials</a>
        </nav>

        <div className="flex gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={() => setopenLogin(true)}>
            Login
          </button>
          <button className="bg-white px-4 py-2 rounded-lg  text-black " onClick={() => setopenSignup(true)}>
            Sign Up
          </button>
        </div>
      </div>
    </header>
    {openLogin && <LoginModal onClose={() => setopenLogin(false)} />}
         {openSignup && <SignupModal onClose={() => setopenSignup(false)} />}
        </>
  );
}
