import { headFont } from "@/app/layout";
import tractor from "../../../public/Tractor.svg";
import Mobile from "../../../public/Mobile.svg";
import market from "../../../public/market.svg";
import community from "../../../public/community.svg";
import Local_Services from "../../../public/Local_Services.svg";
import Direct_market from "../../../public/Direct_market.svg";
import Image from "next/image";


const features = [
  {
    id:0,
    title:"Equipment Rental",
    description:"Access modern farming equipment and machinery on rent at affordable prices. From tractors to harvesters.",
    content:"Browse through a wide selection of farming equipment, check availability in real-time, and book machinery with just a few clicks. Our platform ensures verified equipment owners and transparent pricing.",
    src:tractor,
  },
  {
     id:1,
    title: "Mobile App",
    description:"Easy-to-use mobile application designed for farmers. Check prices, book equipment, and connect anytime.",
    content:"Available on Android and iOS, our mobile app brings all platform features to your fingertips. Work offline and sync when connected.",
    src:Mobile,

  },
  {
     id:2,
    title: "Market Prices",
    description:"Real-time market prices for crops and produce. Make informed decisions about when and where to sell.",
    content:"Get up-to-date mandi prices from across India. Track price trends, set alerts, and plan your selling strategy for maximum profit.",
    src:market,

  },
   {
     id:3,
    title:  "Community",
    description:"Connect with other farmers, share experiences, and learn best practices from your farming community.",
    content:"Join discussion forums, participate in Q&A sessions with agricultural experts, and build relationships with fellow farmers.",
    src:community,

  },
    {
     id:4,
    title:  "Local Services",
    description:"Find agricultural services near you. Connect with local dealers, experts, and service providers.",
    content:"Discover verified service providers in your area including soil testing labs, veterinary services, and agricultural consultants.",
    src:Local_Services,

  },
    {
     id:5,
    title:  "Direct Market Access",
    description:"Sell your produce directly to buyers. Cut out middlemen and get better prices for your harvest.",
    content:"Create listings for your produce, negotiate directly with buyers, and use our secure escrow system for safe transactions.",
    src:Direct_market,

  },
  
];

export default function FeaturesSection() {
  return (
    <>
      {/* TOP HEADING */}
      <section className="bg-white py-12 md:py-20 text-center px-4">
        <h3 className={`text-3xl md:text-5xl text-black ${headFont.className}`}>
          Our <span className="text-lime-500">Features</span>
        </h3>

        <p className="text-gray-600 mt-5 text-sm md:text-lg max-w-2xl mx-auto">
          Discover all the powerful tools and features that make KisanSetu the
          most comprehensive farming platform in India
        </p>
      </section>

      {/* CORE FEATURES */}
      <section className="py-12 md:py-20 w-full bg-[#F5F0E6] px-4">

        <h3 className={`${headFont.className} text-3xl md:text-5xl text-center`}>
          <span className="text-black">
            Core <span className="text-lime-500">Features</span>
          </span>
        </h3>

        {/* GRID */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-7xl mx-auto text-black">
          {features.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl shadow border-2 border-lime-200 hover:border-lime-600 bg-[#F5F0E6] hover:shadow-xl transition"
            >
              <div className="flex gap-5 items-start">

                {/* ICON */}
                <div className="min-w-[70px] h-[70px] bg-lime-500 text-white rounded-full flex items-center justify-center text-xl ">
                  <Image src={item.src} alt={item.title} />
                </div>

                {/* TEXT */}
                <div>
                  <p className="text-lg md:text-xl font-semibold">{item.title}</p>

                  <p className="mt-2 text-sm md:text-base text-gray-700">
                    {item.description}
                  </p>
                  <p className="mt-2 text-sm md:text-base text-gray-500">{item.content}</p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}