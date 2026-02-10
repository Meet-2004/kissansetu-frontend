export default function StatsSection() {
  return (
    <section className="py-16 bg-white text-center">
      <div className="grid md:grid-cols-4 gap-8 text-green-600 font-bold text-2xl max-w-6xl mx-auto">
        <div>10K+<p className="text-gray-500 text-sm">Active Farmers</p></div>
        <div>500+<p className="text-gray-500 text-sm">Equipment Available</p></div>
        <div>25+<p className="text-gray-500 text-sm">States Covered</p></div>
        <div>₹50Cr+<p className="text-gray-500 text-sm">Farmer Earnings</p></div>
      </div>
    </section>
  );
}
