"use client";
import Navbar from "../../Components/layouts/Navbar";
import Footer from "../../Components/layouts/Footer";
import { useState } from "react";

export default function LandingLayout({ children }) {
  const [openLogin, setopenLogin] = useState(false);
  const [openSignup, setopenSignup] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <Navbar
        togggleLogin={() => setopenLogin(!openLogin)}
        onCloseLogin={()=>setopenLogin(false)}
         onCloseSignup={()=>setopenSignup(false)}
        mobileMenu={mobileMenu}
        toggleMobileMenu={() => setMobileMenu(!mobileMenu)}
        openLoginCloseSignup={() => {
          setopenLogin(true);
          setopenSignup(false);
        }}
        openSignupCloseLogin={() => {
          setopenSignup(true);
          setopenLogin(false);
        }}
        toggleSignup={() => setopenSignup(!openSignup)}
        openLogin={openLogin}
        openSignup={openSignup}
      />
      <div className={`${openLogin || openSignup ? "fixed" : "" }`}>{children}</div>
      <Footer className={`${openLogin || openSignup ? "" : "" }`} />
    </>
  );
}
