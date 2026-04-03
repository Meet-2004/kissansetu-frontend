import {headFont} from "@/app/layout"
export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white text-center ">
      <div>
      <div className={`${headFont.className} text-5xl`}>
      <h3 className=" text-black">
        What Farmers <span className="text-lime-500">Say</span>
      </h3>
      </div>
      <div className="mt-4 "><p className="text-gray-700 text-xl">Hear from farmers across India who are growing with KisanSetu</p></div>
      </div>
     

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
