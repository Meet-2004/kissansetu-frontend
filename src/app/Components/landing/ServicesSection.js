const services = [
  "Equipment Rental",
  "Drone Services",
  "Market Connect",
  "Expert Consultation"
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-[#F5F0E6] text-center">
      <h3 className="text-3xl font-bold">
        Our <span className="text-green-600">Services</span>
      </h3>

      <div className="mt-12 grid md:grid-cols-4 gap-6 max-w-7xl mx-auto px-6 text-black">
        {services.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="h-40 bg-gray-300"></div>
            <div className="p-6">
              <h4 className="font-semibold">{item}</h4>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
