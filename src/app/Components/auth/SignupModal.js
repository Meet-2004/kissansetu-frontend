"use client";

import {useState} from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { handleApi } from "../../lib/apiHndler";
import { loginSuccess } from "../../Store/slices/authSlice";

export default function SignupModal({ onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    userType: "",
    // check:false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log(formData);
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    // const { confirmPassword, ...dataToSend } = formData;
console.log("hello:",process.env.NEXT_PUBLIC_API_URL);
    const result = await handleApi(() =>
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,formData)
    );
    console.log(result);

    setLoading(false);

    if (result.success) {
      const user = result.data?.user;
      const token = result.data?.token;

      if (!user || !token) {
        setError("Signup failed: missing user data from server.");
        return;
      }

      // Save token
      localStorage.setItem("token", token);

      // Save in Redux
      dispatch(
        loginSuccess({
          user,
          token,
          role: user.role,
        })
      );

      // Redirect
      if (user.role === "FARMER") {
        // router.push("/farmer/dashboard");
        console.log("redirected to farmer dashboard");
      } else {
        // router.push("/buyer/dashboard");
      }

    } else {
      setError(result.message);
    }
  }
  return (
   
    <div className="fixed inset-0 z-50 flex items-center justify-center ">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-[#F3EFE4] w-full max-w-2xl rounded-2xl shadow-2xl p-10 z-50 h-170 overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Join <span className="text-green-600">KisanSetu</span>
        </h2>

        <p className="text-center text-gray-500 mt-2 text-sm">
          Create your account and start your journey
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
        <div className="mt-8 space-y-5">

          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 ">
                First Name
              </label>
              <input
              value={formData.firstName}
              onChange={handleChange}
              name="firstName"
                type="text"
                placeholder="Enter first name"
                className="w-full mt-2 px-4 py-3 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black "
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                value={ formData.lastName}
              onChange={handleChange}
                name="lastName"
                type="text"
                placeholder="Enter last name"
                className="w-full mt-2 px-4 py-3 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black "
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                 value={ formData.mobileNumber}
              onChange={handleChange}
              name="mobileNumber"
                type="text"
                placeholder="+91 98765 43210"
                className="w-full mt-2 px-4 py-3 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
              name="email"
                value={formData.email}
              onChange={handleChange}
              
                type="email"
                placeholder="your.email@example.com"
                className="w-full mt-2 px-4 py-3 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              I am a
            </label>
            <select
             value={formData.userType}
            onChange={handleChange}
            name="userType"
             className="w-full mt-2 px-4 py-3 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black">
              <option disabled value="">Choose Role</option>
              <option value="FARMER">Farmer</option>
              <option value="BUYER">Buyer</option>
            </select>
          </div>

          {/* Password Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
              name="password"
                value={ formData.password}
              onChange={handleChange}
                type="password"
                placeholder="Create password"
                className="w-full mt-2 px-4 py-3 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                value={ formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                className="w-full mt-2 px-4 py-3 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <input type="checkbox" className="accent-green-600" name="check" />
            <span>
              I agree to the{" "}
              <span className="text-green-600 font-medium">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-green-600 font-medium">
                Privacy Policy
              </span>
            </span>
          </div>

          {/* Create Button */}
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-medium">
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Button */}
          <button className="w-full border bg-white py-3 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-3">
            <span className="text-red-500 font-bold text-lg ">G</span>
           <span className="text-black"> Continue with Google</span>
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span className="text-green-600 font-medium hover:underline cursor-pointer">
              Login
            </span>
          </p>

        </div>
        </form>
      </div>
    </div>
  );
}
