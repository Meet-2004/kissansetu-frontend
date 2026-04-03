import Image from "next/image";
import heroImage from "../../assets/heroImage.png";
import { headFont } from "@/app/layout";

export default function HeroSection() {
  return (
    <section className="bg-[#F5F0E6] w-full">

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-20 flex flex-col md:flex-row items-center gap-10 back ">

        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left">

          <h2 className="text-3xl md:text-6xl lg:text-7xl text-black ">
            <span className={headFont.className}>Empowering</span> <br />
            <span className={`${headFont.className} text-lime-500`}>Farmers</span> <br />
            <span className={headFont.className}>Through</span> <br />
            <span className={`${headFont.className} text-lime-500`}>Technology</span>
          </h2>

          <p className="mt-6 text-gray-700 text-sm md:text-lg max-w-xl mx-auto md:mx-0">
            KisanSetu connects farmers with modern agricultural tools,
            equipment rentals, and market prices. Making farming easier,
            smarter, and more profitable.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-lime-500 px-6 py-3 text-white rounded-xl w-full sm:w-auto">
              Get Started
            </button>

            <button className="bg-white px-6 py-3 border border-gray-300 rounded-xl text-black w-full sm:w-auto">
              Learn More
            </button>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <Image
            src={heroImage}
            alt="Hero Image"
            className="rounded-3xl shadow-2xl w-full max-w-md md:max-w-xl"
            priority
            fetchPriority="high"
            placeholder="blur"
            
          />
        </div>

      </div>
    </section>
  );
}