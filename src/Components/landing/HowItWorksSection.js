import { headFont } from "@/app/layout";
import Step1 from "@/SVG/How it Works/Step1.svg";
import Step2 from "@/SVG/How it Works/Step2.svg";
import Step3 from "@/SVG/How it Works/Step3.svg";
import Step4 from "@/SVG/How it Works/Step4.svg";
import Image from "next/image";

export default function HowItWorksSection() {
  const steps = [
    {
      src: Step1,
      name: "Sign Up",
      description:
        "Create your free account in minutes. Simple registration process designed for farmers.",
    },
    {
      src: Step2,
      name: "Browse Services",
      description:
        "Explore our wide range of equipment, services, and market opportunities.",
    },
    {
      src: Step3,
      name: "Book & Pay",
      description:
        "Select your service, choose your dates, and make secure payments online.",
    },
    {
      src: Step4,
      name: "Get Service",
      description:
        "Receive equipment or service at your location. Start farming smarter!",
    },
  ];

  return (
    <section className=" text-center py-20 px-4 sm:px-6 lg:px-8 bg-[#fefaf0] ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className={`${headFont.className} text-5xl`}>
            <h3 className=" text-black">
              How It <span className="text-lime-500">Works</span>
            </h3>
          </div>
          <p className="text-gray-700 mt-4 text-lg">
            Get started with KisanSetu in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <div className="flex items-center w-full">
                {/* <div className="md:flex items-center "> */}
                  <div className=" bg-[#64b900] w-32 h-32 rounded-full flex items-center justify-center relative z-10 shadow-lg mx-auto ">
                    <Image src={step.src} alt={step.name} />
                  </div>
                  {/* <div className="hidden lg:block absolute left-[calc(50%+80px)] w-[calc(100%-160px+32px)] h-1 bg-[#64b900] top-16"></div> */}
                  {i < 3 && (
                // <p className="hidden lg:block top-470   left-5 w-50 h-1 bg-[#64b900] absolute gap-2 "></p>
               <div className="hidden lg:block absolute left-[calc(50%+80px)] w-[calc(100%-160px+32px)] h-1 bg-[#64b900] top-16"></div>

              )}
                {/* </div> */}
              </div>
              <div className="flex flex-col items-center text-center mt-6">
              
              <div
                className={`${headFont.className} mt-5 md:w-30 mb-4 text-6xl text-[#ffd700] opacity-70 `}
              >
                0{i + 1}
              </div>
              <h4 className=" text-xl text-black mb-3">
                {step.name}
              </h4>
              <p className=" text-black/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
