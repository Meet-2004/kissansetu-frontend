import {headFont} from "@/app/layout";
const steps = ["Sign Up","Browse Services","Book & Pay","Get Service"];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-[#F5F0E6] text-center ">
      <div>
      <div className= {`${headFont.className} text-5xl`}>
      <h3 className=" text-black">
        How It <span className="text-lime-500">Works</span>
      </h3>
      </div>
      <p className="text-gray-700 mt-4 text-lg">Get started with KisanSetu in four simple steps</p>
      </div>

     <div className="mt-16 flex flex-col  items-center md:flex-row md:items-center md:justify-center">
        {steps.map((step,i)=>(
          <div key={i} className="  mb-10" >
            <div className="md:flex items-center ">
            <div className="w-30 h-30 bg-lime-500 text-white rounded-full flex items-center justify-center text-xl ">
              {i+1} 
            </div>
            {i<3 &&
            <p className=" hidden bg-lime-500  md:flex  md:w-40 h-1  text-center  justify-center items-center m-3"></p>
           } 
           </div>
            <h4 className="text-black mt-5 md:w-30 md:h-20">{step}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
