export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#F5F0E6] text-center">
      <h3 className="text-3xl font-bold text-black">
        What Farmers <span className="text-green-600">Say</span>
      </h3>

      <div className="mt-12 grid md:grid-cols-4 gap-6 max-w-7xl mx-auto px-6 text-black">
        {[1,2,3,4].map((_,i)=>(
          <div key={i} className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-600 italic">
              "This platform improved my income!"
            </p>
            <h4 className="mt-6 font-semibold">Farmer Name</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
