import Image from "next/image";
import heroImage from "../../../app/assets/heroImage.png";

export default function HeroSection() {
  return (
    <section className="bg-[#F5F0E6] py-20 flex items-center content-center gap-12">

      <div className="max-w-7xl mx-auto px-6 ">
        <h2 className="text-5xl font-bold leading-tight text-black">
          Empowering <span className="text-green-600">Farmers</span><br />
          Through <span className="text-green-600">Technology</span>
        </h2>

        <p className="mt-6 max-w-xl text-gray-600">
          KisanSetu connects farmers with modern agricultural tools,
          equipment rentals, and market prices.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl">
            Get Started
          </button>
          <button className="bg-white px-6 py-3 rounded-xl text-black">
            Learn More
          </button>
        </div>
      </div>
      <Image 
        src={heroImage} 
        alt="Hero Image" 
        className="w-1/2 h-auto rounded-lg shadow-lg"
        priority
      />
    </section>
  );
}
