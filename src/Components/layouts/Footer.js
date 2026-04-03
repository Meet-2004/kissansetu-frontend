import { headFont } from "@/app/layout";
import Link from "next/link";
import Image from "next/image";
import location from "../../../public/Location.svg";
import phone from "../../../public/Phone.svg";
import message from "../../../public/Message.svg";

export default function Footer() {
  return (
    <footer className="bg-yellow-300 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-7">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row gap-10 ">

          {/* LOGO + DESC */}
          <div className="max-w-md">
            <h1>
              <span className={`text-2xl text-black ${headFont.className}`}>Kisan</span>{" "}
              <span className={`text-2xl text-green-700 ${headFont.className}`}>Setu</span>
            </h1>

            <p className="text-gray-800 text-sm mt-3 max-w-70">
              Empowering farmers with technology to build a prosperous
              agricultural future.
            </p>
          </div>

          {/* LINKS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 flex-1">

            {/* QUICK LINKS */}
            <div>
              <h4 className="text-sm mb-3 text-black font-semibold">Quick Links</h4>
              <ul className="text-gray-800 text-sm space-y-2 flex flex-col">
                <Link href="/"  className=" hover:text-lime-500 w-fit">Home</Link >
                <Link href="/features" className=" hover:text-lime-500 w-fit">Features</Link >
                <Link href="/marketRates" className=" hover:text-lime-500 w-fit">Market Rates</Link >
                <Link href="/schemes" className=" hover:text-lime-500 w-fit">Scheme</Link >
              </ul>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="text-sm mb-3 text-black font-semibold">Services</h4>
              <ul className="text-gray-800 text-sm space-y-2 flex flex-col">
                <Link className=" hover:text-lime-500 w-fit"  href="/">Equipment Rental</Link>
                <Link className=" hover:text-lime-500 w-fit" href="/">Drone Services</Link>
                <Link className=" hover:text-lime-500 w-fit" href="/">Market Connect</Link>
                <Link className=" hover:text-lime-500 w-fit" href="/">Expert Consulting</Link>
                <Link className=" hover:text-lime-500 w-fit" href="/">Community Forum</Link>
              </ul>
            </div>

            {/* CONTACT */}
            <div className="col-span-2 md:col-span-1 ">
              <div>
              <h4 className="text-sm mb-3 text-black font-semibold">Contact Us</h4>
              <ul className="text-gray-800 text-sm space-y-2">

                <div className="flex gap-2"><Image src={location} alt="" className="!h-4 mt-1 "></Image><li> 123 Agriculture Hub, New Delhi, India 110001</li></div>
              
               <div className="flex gap-2"><Image src={phone}  alt="" className="!h-4 mt-1 "></Image> <li>+91 1800-XXX-XXXX</li></div>
               <div className="flex gap-2"><Image src={message}  alt="" className="!h-4 mt-1 "></Image><li>support@kisansetu.com</li></div> 
              </ul>
              </div>
            </div>

          </div>
        </div>

        {/* DIVIDER */}
        <hr className="border-gray-500 mt-8" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 text-sm text-gray-800">

          <p>© 2026 KisanSetu. All rights reserved.</p>

          <div className="flex gap-5">
            <p>Privacy Policy</p>
            <p>Terms</p>
            <p>Cookies</p>
          </div>

        </div>
      </div>
    </footer>
  );
}