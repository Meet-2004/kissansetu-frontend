const steps = ["Sign Up","Browse Services","Book & Pay","Get Service"];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50 text-center">
      <h3 className="text-3xl font-bold text-black">
        How It <span className="text-green-600">Works</span>
      </h3>

      <div className="mt-16 grid md:grid-cols-4 gap-10 max-w-6xl mx-auto px-6 text-black">
        {steps.map((step,i)=>(
          <div key={i}>
            <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto text-xl">
              {i+1}
            </div>
            <h4 className="mt-6 font-semibold">{step}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
