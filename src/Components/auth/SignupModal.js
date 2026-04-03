"use client";
import { postApi } from "@/services/apiService";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { handleApi } from "../../lib/apiHndler";
import { loginSuccess } from "../../app/Store/slices/authSlice";
import { headFont } from "@/app/layout";
import google from "../../../public/google.svg";
import Image from "next/image";
import login from "@/Components/auth/LoginModal";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Alert/Toast";
import {useRouter} from "next/navigation";
// import Dashboard from "../../app/Dashboard/page"

export default function SignupModal({ onClose,openLogin }) {
  const router=useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    // lastName: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  

    // userType: "",
    // check:false,
  });

  const validations = Yup.object({
    fullName: Yup.string()
      .max(20, "maximum 20 characters allowed")
      .min(5, "required")
      .matches(
        /^[a-zA-Z]+(?: [A-Za-z]+){0,2}$/,
        "only alphabets and two space are allowed ",)
      .required("Name Required"),
    email: Yup.string().email("Enter valid email").required("Email Required"),
    mobileNumber: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter valid mobile number")
      .matches(/^[0-9]/, "only digits are allowed 0-9")
      .required("Mobile number required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters")
      .required("Password required")
      .matches(/[0-9]/, "Must contain at least 1 number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain 1 special character"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password does not match")
      .required("Confirm password required"),
    // agree: Yup.boolean().oneOf([true], "You must accept Terms & Conditions"),
  });

  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState({});

  const handleChange = async (e) => {
    // const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
    seterror((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validations.validate(formData, { abortEarly: false });
      seterror({});

      // const { confirmPassword, ...dataToSend } = formData;

      // const result = await handleApi(() =>
      //   axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, formData),
      // );
     const result = await postApi("/users/signup", formData);


      //Toast message
       if(!result.success){
        console.log(result);
      toast.error(result.message,{
        style:{  
          color:"white",
        }
      });
    }
      if (result.success){

        toast.success(result.message);
         console.log(result);
        const user = result.data?.user;
        // const token = result.data?.token;
      dispatch(loginSuccess({user:result?.data?.data?.fullName,id:result?.data?.data?.id,userMail:result?.data?.data?.email,}))

       router.push("/dashboard");
     

        if (!user) {
          console.log("User and token does not recieved by backend");
          seterror("Signup failed: missing user data from server.");
          return;
        }

        // Save token
        // localStorage.setItem("token", token);

        // Save in Redux
       
        // Redirect
        // if (user.role === "FARMER") {
        //   // router.push("/farmer/dashboard");
        //   console.log("redirected to farmer dashboard");
        // } else {
        //   // router.push("/buyer/dashboard");
        // }
      }
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      seterror(newErrors);
    }
  };
  return (
    <>
      <Toast times={2000} />
      <div className="fixed inset-0 z-50 flex items-center justify-center ">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Card */}
        <div className="relative bg-[#F3EFE4] w-full max-w-lg rounded-2xl shadow-2xl p-10 z-50 h-155 overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-6 text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

          {/* Heading */}
          <div className={`${headFont.className}`}>
            <h2 className="text-3xl  text-center text-gray-800">
              Join <span className="text-lime-500">KisanSetu</span>
            </h2>
          </div>

          <p className="text-center text-gray-700 mt-2 text-sm">
            Create your account and start your journey
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mt-2 space-y-2">
              {/* Row 1 */}
              <div className="flex md:flex-cols gap-2 ">
                <div>
                  <label className="text-sm font-medium text-black ">
                    Full Name
                  </label>
                  <input
                    value={formData.fullName}
                    onChange={handleChange}
                    name="fullName"
                    type="text"
                    placeholder="Enter full name"
                    className="w-full mt-2 px-3 py-2 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black "
                  />
                  {error.fullName && (
                    <p className="text-red-500 text-sm">{error.fullName}*</p>
                  )}
                </div>

                {/* <div>
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
            </div> */}
                <div>
                  <label className="text-sm font-medium text-black">
                    Phone Number
                  </label>
                  <input
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    name="mobileNumber"
                    type="text"
                    placeholder="+91 98765 43210"
                    className="w-full mt-2 px-3 py-2 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                  />
                  {error.mobileNumber && (
                    <p className="text-red-500 text-sm">
                      {error.mobileNumber}*
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex md:flex-col gap-6">
                {/* <div>
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
            </div> */}

                <div className="w-full">
                  <label className="text-sm font-medium text-black">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="text"
                    placeholder="your.email@example.com"
                    className="w-full mt-2  px-3 py-2 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                  />
                  {error.email && (
                    <p className="text-red-500 text-sm">{error.email}*</p>
                  )}
                </div>
              </div>

              {/* Role */}
              {/* <div>
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
          </div> */}

              {/* Password Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-black">
                    Password
                  </label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Create password"
                    className="w-full mt-2  px-3 py-2 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                  />
                  {error.password && (
                    <p className="text-red-500 text-sm">{error.password}*</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-black">
                    Confirm Password
                  </label>
                  <input
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    className="w-full mt-2  px-3 py-2 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-500 text-black"
                  />
                  {error.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {error.confirmPassword}*
                    </p>
                  )}
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center gap-3 mt-3 text-sm text-gray-600 ">
                {/* <input
                  type="checkbox"
                  className="accen-lime-500"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                /> */}
                <span>
                  I agree to the{" "}
                  <span className="text-lime-500 font-medium">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-lime-500 font-medium">
                    Privacy Policy
                  </span>
                  {error.agree && (
                    <p className="text-red-500 ">{error.agree}*</p>
                  )}
                </span>
              </div>

              {/* Create Button */}
              <button
                type="submit"
                className="w-full bg-lime-500 text-white py-2 mt-1 rounded-xl hover:bg-lime-600 cursor-pointer transition font-medium"
              >
                Create Account
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-2">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Google Button */}
              <button className="w-full border bg-white py-2 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-3">
                <span>
                  <Image src={google} alt=""></Image>
                </span>
                <span className="text-black"> Continue with Google</span>
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <span className="text-lime-500 font-medium hover:underline cursor-pointer" onClick={()=>{onClose();openLogin()}}>
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
