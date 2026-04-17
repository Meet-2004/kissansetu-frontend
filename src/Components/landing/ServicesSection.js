import { headFont } from "@/app/layout";
import dron from "../../assets/dron.jpg";
import equipment from "../../assets/equipment.jpg";
import market from "../../assets/market.jpg";
import expert from "../../assets/expert.jpg";
import Image from "next/image";

const services = [
  {
    id: 0,
    name: "Equipment Rental",
    description: "Rent tractors, harvesters, and other farming equipment at competitive prices.",
    src: equipment,
    price: 500,
  },
  {
    id: 1,
    name: "Drone Services",
    description: "Advanced drone technology for crop monitoring and precision agriculture.",
    src: dron,
    price: 500,
  },
  {
    id: 2,
    name: "Market Connect",
    description: "Direct access to buyers and get the best prices for your produce.",
    src: market,
    price: 500,
  },
  {
    id: 3,
    name: "Expert Consultation",
    description: "Get advice from agricultural experts to improve your farming practices.",
    src: expert,
    price: 500,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-12 md:py-20   px-4 sm:px-6 lg:px-8 bg-white">
    
      <div className="max-w-7xl mx-auto">

      {/* TITLE */}
      <div className="text-center px-4">
        <h3 className={`text-3xl md:text-5xl ${headFont.className}`}>
          <span className="text-black">Our</span>{" "}
          <span className="text-lime-500">Services</span>
        </h3>

        <p className="text-gray-600 mt-4 text-sm md:text-lg">
          Comprehensive solutions tailored for modern farming needs
        </p>
      </div>

      {/* CARDS */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto  text-black">
        {services.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-44 w-full overflow-hidden">
              <Image
                src={item.src}
                alt="service"
                className="w-full h-full object-cover hover:scale-110 transition duration-300"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col flex-grow">
              <h4 className=" text-lg">{item.name}</h4>

              <p className="text-sm mt-2 text-gray-600 flex-grow">
                {item.description}
              </p>

              {/* PRICE + BUTTON */}
              <div className="flex justify-between items-center mt-4">
                <span className=" text_lime ">₹{item.price}/day</span>

                <button className="bg-lime-500 text-white px-4 py-2 rounded-lg text-sm">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      
    </section>
  );
}