const features = [
  "Equipment Rental",
  "Mobile App",
  "Market Prices",
  "Community",
  "Local Services",
  "Direct Market Access"
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50 text-center">
      <h3 className="text-3xl font-bold text-black">
        Our <span className="text-green-600">Features</span>
      </h3>

      <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 text-black">
        {features.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow">
            <div className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto">
              ★
            </div>
            <h4 className="mt-6 font-semibold">{item}</h4>
            <p className="mt-2 text-gray-500 text-sm">
              Description about {item}.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
