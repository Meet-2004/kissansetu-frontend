import { headFont } from "@/app/layout";
import Link from "next/link";
import Image from "next/image";
import location from "../../../public/Location.svg";
import phone from "../../../public/Phone.svg";
import message from "../../../public/Message.svg";
import FooterImage from "../../../public/Images/FooterImage.png";
import Logo from "@/SVG/Dashboard/KisanSetuLogo.svg";

export default function Footer() {
  return (
    <footer className="relative md:w-[100%] md:h-screen   ">
      <Image
        src={FooterImage}
        alt="bg"
        fill
        className="md:object-cover  h-full  md:h-full"
        priority
        fetchPriority="high"
        placeholder="blur"
      />
      <div className="absolute  inset-0 bg-linear-to-b from-[rgba(255,255,255,0.2)] via-[rgba(128,128,128,0.2)] to-[rgba(0,0,0,0.2)]"></div>
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-7 relative z-5 md:h-screen ">
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row gap-10 mt-10">
          {/* LOGO + DESC */}
          <div className="max-w-md">
            <h1>
              {/* <span className={`text-2xl text-black ${headFont.className}`}>
                Kisan
              </span>{" "}
              <span className={`text-2xl text-green-700 ${headFont.className}`}>
                Setu
              </span> */}
              <Image
                src={Logo}
                alt="KisanSetu"
                className="h-[32px] sm:h-[38px] lg:h-[44px] w-auto object-contain"
              />
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
              <h4 className="text-sm mb-3 text-black font-semibold">
                Quick Links
              </h4>
              <ul className="text-gray-800 text-sm space-y-2 flex flex-col">
                <Link href="/" className=" hover:text-lime-500 w-fit">
                  Home
                </Link>
                <Link href="/features" className=" hover:text-lime-500 w-fit">
                  Features
                </Link>
                <Link
                  href="/marketRates"
                  className=" hover:text-lime-500 w-fit"
                >
                  Market Rates
                </Link>
                <Link href="/schemes" className=" hover:text-lime-500 w-fit">
                  Scheme
                </Link>
              </ul>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="text-sm mb-3 text-black font-semibold">
                Services
              </h4>
              <ul className="text-gray-800 text-sm space-y-2 flex flex-col">
                <Link className=" hover:text-lime-500 w-fit" href="/">
                  Equipment Rental
                </Link>
                <Link className=" hover:text-lime-500 w-fit" href="/">
                  Drone Services
                </Link>
                <Link className=" hover:text-lime-500 w-fit" href="/">
                  Market Connect
                </Link>
                <Link className=" hover:text-lime-500 w-fit" href="/">
                  Expert Consulting
                </Link>
                <Link className=" hover:text-lime-500 w-fit" href="/">
                  Community Forum
                </Link>
              </ul>
            </div>

            {/* CONTACT */}
            <div className="col-span-2 md:col-span-1 ">
              <div>
                <h4 className="text-sm mb-3 text-black font-semibold">
                  Contact Us
                </h4>
                <ul className="text-gray-800 text-sm space-y-2">
                  <div className="flex gap-2">
                    <Image src={location} alt="" className="!h-4 mt-1 "></Image>
                    <li> 123 Agriculture Hub, New Delhi, India 110001</li>
                  </div>

                  <div className="flex gap-2">
                    <Image src={phone} alt="" className="!h-4 mt-1 "></Image>{" "}
                    <li>+91 1800-XXX-XXXX</li>
                  </div>
                  <div className="flex gap-2">
                    <Image src={message} alt="" className="!h-4 mt-1 "></Image>
                    <li>support@kisansetu.com</li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="md:bottom-10 mt-5 md:w-full md:absolute ">
          <hr className="border-white " />

          {/* BOTTOM */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 text-sm text-white">
            <p>© 2026 KisanSetu. All rights reserved.</p>

            <div className="flex gap-5">
              <p>Privacy Policy</p>
              <p>Terms</p>
              <p>Cookies</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
