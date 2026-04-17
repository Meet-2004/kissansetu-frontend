import {headFont} from "@/app/layout"
export default function StatsSection() {
  return (
    <section className="mb-12 bg-white text-center mt-18">
      <div className="grid md:grid-cols-4 gap-15 text-lime-500    max-w-6xl mx-auto">
        <div><p className={`${headFont.className} text-5xl`}>10K+</p><p className="text-gray-600  mt-2 text-lg">Active Farmers</p></div>
        <div><p className={`${headFont.className} text-5xl`}>500+</p><p className="text-gray-600  mt-2 text-lg">Equipment Available</p></div>
        <div><p className={`${headFont.className} text-5xl`}>25+</p><p className="text-gray-600  mt-2 text-lg">States Covered</p></div>
        <div><p className={`${headFont.className} text-5xl`}>₹50Cr+</p><p className="text-gray-600  mt-2 text-lg">Farmer Earnings</p></div>
      </div>
    </section>
  );
}
