import { headFont } from "@/app/layout";
import { signupSchema } from "./Validations";
import { useState } from "react";
import { putApi } from "@/services/apiService";
import { toast } from "react-toastify";
import Toast from "@/Components/Alert/Toast";

export default function SecurityPage() {
  const [errors, setErrors] = useState();
  const [updatePasswordData, setUpdatePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleOnchange = (e) => {
    const errorsKey = Object.keys(updatePasswordData);
    const currentTarget = e.target.name;

    console.log("this is errors key", errorsKey);

    const isNamePresent = errorsKey.some((e) => e === currentTarget);

    console.log("this is present name", isNamePresent);

    if (isNamePresent && errors) {
      errors[currentTarget] = "";
    }

    setUpdatePasswordData({
      ...updatePasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePassword = async () => {
    try {
      signupSchema.parse(updatePasswordData);
      setErrors("");
    
      const updatePassword = await putApi("/users/change-password", updatePasswordData);
      if (updatePassword.success) {
          toast.success(updatePassword.message);
          setUpdatePasswordData( {currentPassword:"",
      newPassword:"",
      confirmNewPassword:"",});
      } else {
        toast.error(updatePassword.message);
      }
    } catch (err) {
      console.log(err.issues);
      if (err?.issues && Array.isArray(err?.issues)) {
        const nextErrors = {};
        err?.issues.forEach((e) => {
          const field = e.path[0];
          nextErrors[field] = e?.message;
        });
        setErrors(nextErrors);
      }
    }
    //    console.log("this is validate signup form",validateInputs);
  };

  return (
    <>
    <Toast times={3000} />
      <div>
        <h2
          className={` ${headFont.className} text-xl md:text-2xl text-black mb-2`}
        >
          Security
        </h2>

        <p className="text-gray-500  mb-6">
          Manage your password and security preferences
        </p>

        <div className="flex flex-col gap-2">
          <div>
            <Input
              label="Current Password"
              placeholder="Enter current password"
              handleOnchange={handleOnchange}
              value={updatePasswordData?.currentPassword}
              name="currentPassword"
            />
            {errors?.currentPassword && (
              <p className="text-red-500 mt-1 text-xs">
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div>
            <Input
              label="New Password"
              placeholder="Enter new password"
              handleOnchange={handleOnchange}
              value={updatePasswordData?.newPassword}
              name="newPassword"
            />
            {errors?.newPassword && (
              <p className="text-red-500 mt-1 text-xs">{errors.newPassword}</p>
            )}
          </div>
          <div>
            <Input
              label="Confirm New Password"
              handleOnchange={handleOnchange}
              placeholder="Confirm new password"
              value={updatePasswordData?.confirmNewPassword}
              name="confirmNewPassword"
            />
            {errors?.confirmNewPassword && (
              <p className="text-red-500 mt-1 text-xs">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6 text-blue-800 text-xs md:text-sm">
          <p className="font-medium mb-2">Password Requirements:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>At least 6 characters long</li>
            <li>Include at least one number</li>
            <li>Include at least one special character</li>
          </ul>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="w-full md:w-auto back_lime text-white px-5 py-2 rounded-lg hover:bg-lime-600"
            onClick={handleUpdatePassword}
          >
            Update Password
          </button>
        </div>
      </div>
    </>
  );
}

function Input({ label, placeholder, name, value, handleOnchange }) {
  return (
    <div>
      <label className="text-xs md:text-sm text-gray-600">{label}</label>
      <input
        type="password"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleOnchange}
        className="w-full mt-1 border rounded-lg px-3 py-2 text-sm text-gray-600 bg-gray-400/12"
      />
    </div>
  );
}
