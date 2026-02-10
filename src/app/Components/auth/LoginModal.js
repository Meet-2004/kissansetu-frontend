"use client";

export default function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#F5F0E6] w-full max-w-md rounded-2xl shadow-2xl p-8 z-50">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center text-black">
          Welcome <span className="text-green-600">Back</span>
        </h2>
        <p className="text-center text-gray-500 mt-2 text-sm">
          Login to access your KisanSetu account
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">

          {/* Role Select */}
          <div>
            <label className="text-sm font-medium text-black">I am a</label>
            <select className="w-full mt-2 px-4 py-3 rounded-xl text-black  bg-gray-100 focus:outline-none focus:ring-2 border-2 border-gray-400 focus:ring-green-500">
               <option disabled selected>Choose Role</option> 
              <option>Farmer</option>
              <option>Buyer</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium  text-black">Email Address</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              className="w-full mt-2 px-4 py-3 rounded-xl text-black  bg-gray-100 border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium  text-black">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 text-black rounded-xl border-2 border-gray-400 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2  text-black">
              <input type="checkbox" className="accent-green-600  text-black border-2 border-gray-400 " />
              Remember me
            </label>
            <button className="text-green-600 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Button */}
          <button className="w-full border py-3 rounded-xl bg-white hover:bg-gray-100 transition flex items-center justify-center gap-3">
            <span className="text-red-500 font-bold ">G</span>
           <span className="text-black">Continue with Google</span> 
          </button>

          {/* Signup */}
          <p className="text-center text-sm mt-4  text-black">
            Don’t have an account?{" "}
            <button className="text-green-600 font-medium hover:underline">
              Sign Up
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
