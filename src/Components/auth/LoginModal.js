"use client";
import { postApi } from "@/services/apiService";

import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { handleApi } from "../../lib/apiHndler";
import { loginSuccess } from "../../app/Store/slices/authSlice";
import { headFont } from "@/app/layout";
import google from "../../../public/google.svg";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import Toast from "@/Components/Alert/Toast";
import { useRouter } from "next/navigation";

export default function LoginModal({ onClose, openSignup, openLogin,toggleLogin,openSignupCloseLogin, onCloseLogin }) {
  const router = useRouter();
  const validations = Yup.object({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
  });
  const dispatch = useDispatch();
  const [error, seterror] = useState({});
  const [Error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  let handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const dispatchData =(val)=>{
  //    dispatch(
  //         loginSuccess({
  //           user: val?.fullName,
  //           id: val?.id,
  //           userMail: val?.email,
  //         }),
  //       )

  // }
  let handlesubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
    
      await validations.validate(formData, { abortEarly: false });
      seterror({});
        setLoading(true);
      const result = await postApi("/users/login", formData);
      console.log(result);

      if (result.success) {
        toast.success(result.message);
        setLoading(false);
        const user = result.data?.user;
        console.log("This is result for auth ", result);
        const id = result.data?.id;
   

            
         dispatch(
          loginSuccess({
            user: result?.data?.data?.fullName,
            userMail: result?.data?.data?.email,
            id: result?.data?.data?.id,
          }),
        )
        router.push("/dashboard");

        // console.log("this is response data ",Response.data);
        // console.log(Response.data.user);

        // const token = result.data?.token;

        // if (!user ) {
        //   setError("Login failed: missing user data from server");
        //    router.push("/");
        //   return;
        // }

        // Save token
        // localStorage.setItem("token", token);

        // Save in Redux

        // Redirect
        if (user.role === "FARMER") {
          // router.push("/farmer/dashboard");
          console.log("redirected to farmer dashboard");
        } else {
          // router.push("/buyer/dashboard");
        }
      } else {
        setError(result.message);
         setLoading(false);
        toast.error(result.message, {
          style: {
            color: "white",
          },
        });
      }
    } catch (err) {
      const newErrors = {};
      //   console.log("inner is:",err.inner);
      err.inner.forEach((e) => {
        // console.log(e.path,e.message);
        return newErrors[e.path] = e.message;
      });
      seterror(newErrors);
      console.log(newErrors);
    }

   
  };

  return (
    <>
      <Toast times={2000} />
      <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          // onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-[#F5F0E6] md:w-full md:max-w-md rounded-2xl shadow-2xl p-8 z-50">
          {/* Close Button */}
          <button
            onClick={onCloseLogin}
            className="absolute top-5 cursor-pointer right-7 text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

          {/* Heading */}
          <div className={`${headFont.className}`}>
            <h2 className="text-3xl  text-center text-black">
              Welcome <span className="text-lime-500">Back</span>
            </h2>
          </div>
          <p className="text-center text-gray-500 mt-1 text-sm">
            Login to access your KisanSetu account
          </p>

          {/* Form */}
          <form onSubmit={handlesubmit}>
            <div className="mt-3 space-y-4">
              {/* Role Select */}
              {/* <div>
            <label className="text-sm font-medium text-black">I am a</label>
            <select className="w-full mt-2 px-4 py-3 rounded-xl text-black  bg-gray-100 focus:outline-none focus:ring-2 border-2 border-gray-400 focus:ring-green-500">
               <option disabled selected>Choose Role</option> 
              <option>Farmer</option>
              <option>Buyer</option>
            </select>
          </div> */}

              {/* Email */}
              <div>
                <label className="text-sm font-medium  text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  name="email"
                 
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full mt-2 px-4 py-3 rounded-xl text-black  bg-gray-100 border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium  text-black">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full mt-2 px-4 py-3 text-black rounded-xl border-2 border-gray-400 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {error.password && (
                  <p className="text-red-500 text-sm">{error.password}</p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2  text-black">
                  <input
                    type="checkbox"
                    className="accent-green-600  text-black border-2 border-gray-400 md:cursor-pointer"
                  />
                  Remember me
                </label>
                <button className="text-lime-500 hover:underline md:cursor-pointer">
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                className={
                  loading
                    ? "w-full rounded-xl justify-center items-center flex"
                    : `w-full bg-lime-500 text-white py-3  rounded-xl hover:bg-lime-500 transition md:cursor-pointer`
                }
                onClick={handlesubmit}
              >
                {loading ? <div className="loader h-50 w-60"></div> : "Login"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 ">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Google Button */}
              <button className="w-full border py-3 rounded-xl bg-white hover:bg-gray-100 transition flex items-center justify-center gap-3 md:cursor-pointer">
                <span>
                  <Image src={google} alt=""></Image>
                </span>
                <span className="text-black">Continue with Google</span>
              </button>

              {/* Signup */}
              <p className="text-center text-sm mt-4  text-black">
                Don’t have an account?{" "}
                <button
                  className="text-lime-500 font-medium hover:underline md:cursor-pointer"
                  // onClick={() => {
                  //   (onClose(), openSignup());
                  // }}
                  onClick={()=>openSignupCloseLogin()}
                >

                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
