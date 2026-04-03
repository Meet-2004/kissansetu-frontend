import { useEffect, useRef, useState } from "react";
import { Lock, X } from "lucide-react";
import "@/app/globals.css";
import { postApi } from "@/services/apiService";
import Toast from "@/Components/Alert/Toast";
import { ToastContainer, toast } from "react-toastify";



export default function OTPModal({
  open,
  onClose,
  orderId,
  buyer,
  amount,
  onVerify,
  setrefreshKey,
  amountAtOtp
}) {
  const [otps, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
   const [verifyTrue,setverifyTrue]=useState(false);

  const inputsRef = useRef([]);

  useEffect(() => {
    if (open) {
      setOtp(Array(6).fill(""));
      setError("");
      setAttempts(0);
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    }
  }, [open]);



  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otps];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otps[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {

    const enteredOtp = otps.join("");
    if (enteredOtp.length !== 6) return;
    const otp=Object.values(otps).join("");
    
  
      const otpVerified=await postApi(`/orders/verify-delivery-otp/${orderId}`,{otp});

    // const success = await onVerify(enteredOtp);

    if(otpVerified.success){
      toast.success(otpVerified?.message);
      setrefreshKey();
      setTimeout(()=>{

        onClose();

      },2000)
    }

    else{
      setError("Invalid OTP. Please try again.");
      toast.error(otpVerified?.message)
      setAttempts((prev) => prev + 1);
      setOtp(Array(6).fill(""));
      inputsRef.current[0]?.focus();
    }
  };

  if (!open) return null;

  return (
    <>
    <Toast times={2000} />
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-7 shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="back_lime text-white p-3 rounded-lg">
              <Lock size={18} />
            </div>
            <div>
              <h2 className="text-lg text-black">
                Enter Delivery OTP
              </h2>
              <p className="text-sm text-gray-400">
                Order #{orderId}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-black cursor-pointer">
            <X />
          </button>
        </div>

        {/* BUYER INFO */}
        <div className="bg-gray-100 p-4 rounded-xl mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Buyer</span>
            <span className="font-medium">{buyer}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-700">Amount in Escrow</span>
            <span className="text_lime font-semibold">
              ₹{amountAtOtp}
            </span>
          </div>
        </div>

        <p className="text-center text-gray-700 text-sm mb-4">
          Enter the OTP provided by the buyer after delivery
        </p>

        {/* OTP INPUT */}
        <div className="flex justify-center gap-2 mb-4">
          {otps.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-12 h-12 text-center text-lg rounded-lg border outline-none  text-black ${
                error
                  ? "border-red-400"
                  : "border-gray-300 focus:border-lime-500"
              }`}
            />
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 text-sm p-2 rounded mb-2">
            ⚠ {error}
          </div>
        )}

        {/* ATTEMPTS */}
        {error && (
          <p className="text-center text-xs text-gray-400 mb-4">
            Attempts: {attempts} / 3
          </p>
        )}

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border h-10 text-black rounded-lg text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={otps.join("").length !== 6}
            className={`flex-1 h-10 rounded-lg text-sm ${
              otps.join("").length === 6
                ? "back_lime text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Verify & Release Payment
          </button>
        </div>
      </div>
    </div>
    </>
  );
}