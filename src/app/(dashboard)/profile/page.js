

"use client";

import { useState } from "react";
import {
  User,
  CreditCard,
  ShieldCheck,
  MapPin,
  Pencil,
} from "lucide-react";
import useSWR from "swr";
import { fetcher,putSwr } from "@/lib/fetcher";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProfileData,resetProfile } from "@/app/Store/slices/profileSlice";
import { putApi } from "@/services/apiService";
import { useRef } from "react";



/* ================= MAIN ================= */
export default function ProfileSections() {
  const [editBasic, setEditBasic] = useState(false);
  const [editFinancial, setEditFinancial] = useState(false);
  const [editFarm, setEditFarm] = useState(false);
  const [imageFile,setImageFile]=useState();
  const imageInputRef=useRef(null);
  


  



  const [imagePreview, setImagePreview] = useState(null);

  const profileData = useSelector((state)=>state.profile.data.informations);
  const image= useSelector((state)=>state.profile.data.images);
  const dispatch=useDispatch();

  console.log("this is profile profileData?",profileData);

  
  //  const { profileData?s , isLoading, error } = useSWR(
  //   "/users/updateProfile",
  //   fetcher,
  //   {
  //   refreshInterval:5000,
  //   }

  // );
  let userId=localStorage.getItem("persist:auth") ? JSON.parse(localStorage.getItem("persist:auth")).id : null;

  const { profileDatass , isLoadings, errors } = useSWR(
    `users/${userId}`,
    fetcher,
    {
    refreshInterval:5000,
    }
    
  );
  

  const handleChange = ({ name, value }) => {
    dispatch(setProfileData({ [name]: value }));
  };

  const handleImageUpload = (file) => {
    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      console.log("this is preview",preview);
      dispatch(setProfileData({profilePhotoUrl: preview }));
      // backend upload later
      console.log("Image file:", file);
      setImageFile(file);
    }
  };
   
  
  

 async  function handleSubmit(){
    // Create FormData for file upload


    const formData = new FormData();
    
    // Append profile data as JSON string
    formData.append("profileData", JSON.stringify(profileData));
    
    // Append image file if exists
    if (imageFile) {
      formData.append("profilePhoto", imageFile);
    }

    // Send the FormData to the API
   const dataResponse= await putApi("/users/updateProfile", formData)
  }

  return (
    <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">

      {/*  PROFILE HEADER  */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border flex flex-col md:flex-row items-center md:items-start gap-4">

        {/* IMAGE */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-lime-100 flex items-center justify-center">
            {imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-cover" />
            ) : (
              <User className="text_lime" size={40} />
            )}
          </div>

          <label className="absolute bottom-0 right-0 bg-lime-500 text-white p-2 rounded-full cursor-pointer text-xs">
            📷
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </label>
        </div>

        {/* INFO */}
        <div className="text-center md:text-left">
          {/* <h2 className="text-xl  text-black">{profileData?.fullName}</h2> */}
          <p className="text-gray-500">Farmer</p>

          <button className="mt-2 border border-lime-500 text_lime px-4 py-1 rounded-lg text-sm hover:bg-lime-50">
            Upload Photo
          </button>
        </div>
      </div>

      {/*  BASIC  */}
      <SectionCard
        title="Basic Information"
        className="text-black"
        subtitle="Personal details and contact info"
        icon={<User />}
        isEdit={editBasic}
        onEdit={() => setEditBasic(!editBasic)}

      >
        <Grid>
          <Input label="Full Name" name="fullName" value={profileData?.fullName}  edit={editBasic}
            onChange={handleChange} />

          <Input label="Mobile Number" name="mobileNumber" value={profileData?.mobileNumber}  edit={editBasic}
            onChange={handleChange} />

          <Input label="Email Address" name="email" value={profileData?.email} edit={editBasic}
            onChange={handleChange} />

          <Input label="Date of Birth" name="dateOfBirth" value={profileData?.dateOfBirth}  edit={editBasic}
            onChange={handleChange} />
        </Grid>
      </SectionCard>

      {/*  FINANCIAL  */}
      <SectionCard
        title="Financial Information"
        subtitle="Bank and payment details"
        icon={<CreditCard />}
        isEdit={editFinancial}
        onEdit={() => setEditFinancial(!editFinancial)}
      >
        <Grid>
          <Input label="Bank Name" name="bankName" value={profileData?.bankName} edit={editFinancial}
            onChange={handleChange}   />

          <Input label="Account Number" name="accountNumber" value={profileData?.accountNumber} edit={editFinancial}
            onChange={handleChange} />

          <Input label="IFSC Code" name="ifscCode" value={profileData?.ifscCode} edit={editFinancial}
            onChange={handleChange}  />

          <Input label="UPI ID" name="upiId" value={profileData?.upiId} edit={editFinancial}
            onChange={handleChange}  />
        </Grid>
      </SectionCard>

      {/* ================= VERIFICATION ================= */}
      <SectionCard
        title="Verification Status"
        subtitle="Document verification and KYC"
        icon={<ShieldCheck />}
      >
        <div className="space-y-3">
          <VerifyCard
            title="Mobile Number Verified"
            desc="Verified on Feb 20, 2026"
            status="verified"
          />

          <VerifyCard
            title="Aadhaar Verification"
            desc="Complete Aadhaar verification for higher limits"
            status="pending"
          />

          <VerifyCard
            title="Bank Account Verification"
            desc="Required for receiving payments"
            status="pending"
          />
        </div>
      </SectionCard>

      {/* ================= FARM ================= */}
      <SectionCard
        title="Farm Details"
        subtitle="Information about your farm"
        icon={<MapPin />}
        isEdit={editFarm}
        onEdit={() => setEditFarm(!editFarm)}
      >
        <Grid>
          <Input label="Farm Size (in acres)" name="farmSize" value={profileData?.farmSize} edit={editFarm}
            onChange={handleChange} />

          <Input label="Primary Crops" name="primaryCrops" value={profileData?.primaryCrops} edit={editFarm}
            onChange={handleChange} />

          <Input label="Farm Location" name="farmLocation" value={profileData?.farmLocation} edit={editFarm}
            onChange={handleChange} />

          <Input label="Years of Experience" name="yearsOfExperience" value={profileData?.yearsOfExperience} edit={editFarm}
            onChange={handleChange} />
        </Grid>
      </SectionCard>

      {/* ================= BUTTONS ================= */}
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button className="px-6 py-2 border rounded-lg w-full sm:w-auto text-black">
          Cancel
        </button>

        <button className="px-6 py-2 back_lime text-white rounded-lg w-full sm:w-auto " onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ================= SECTION CARD ================= */
function SectionCard({ title, subtitle, icon, children, isEdit, onEdit }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-lime-100 text_lime p-3 rounded-lg">
            {icon}
          </div>
          <div>
            <h2 className="text-lg text-black">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>

        {onEdit && (
          <button onClick={onEdit}>
            <Pencil className="text_lime" size={18} />
          </button>
        )}
      </div>

      {children}
    </div>
  );
}

/* ================= GRID ================= */
function Grid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children}
    </div>
  );
}

/* ================= INPUT ================= */
function Input({ label, value, onChange, edit,name }) {
  console.log("this is name",name,value);
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>

      {edit ? (
        <input
          value={value ?? ""}
          onChange={(e) =>
            onChange({
              name: e.target.name,
              value: e.target.value,
            })
          }
          name={name}
          className="w-full text-black border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-lime-200 focus:border-lime-500"
        />
      ) : (
        <div className="w-full border text-gray-600 border-gray-200 px-3 py-2 rounded-lg bg-gray-50">
          {value || "-"}
        </div>
      )}
    </div>
  );
}

/* ================= VERIFY CARD ================= */
function VerifyCard({ title, desc, status }) {
  return (
    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 rounded-xl border ${
      status === "verified"
        ? "bg-green-50 border-green-200"
        : "bg-white border-gray-200"
    }`}>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>

      {status === "verified" ? (
        <span className="bg-lime-100 text_lime px-4 py-1 rounded-full text-sm">
          Verified
        </span>
      ) : (
        <button className="back_lime text-white px-4 py-1 rounded-lg text-sm">
          Verify Now
        </button>
      )}
    </div>
  );
}









// package com.project.kisan_setu.dto.ResponseDto;

// import com.fasterxml.jackson.annotation.JsonInclude;
// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.profileData?;
// import lombok.NoArgsConstructor;

// import java.math.BigDecimal;
// import java.time.LocalDateTime;

// @profileData?
// @AllArgsConstructor
// @NoArgsConstructor
// @Builder
// @JsonInclude(JsonInclude.Include.NON_NULL)
// public class UserProfileResponseDto {
//         private Long userId;
//         private String fullName;
//         private String profilePhotoUrl;
//         private String email;
//         private String mobileNumber;
//         private String dateOfBirth;
//         private String bankName;
//         private String accountNumber;
//         private String ifscCode;
//         private String upiId;
//         private BigDecimal farmSize;
//         private String primaryCrops;
//         private String farmLocation;
//         private Integer yearsOfExperience;
//         private Boolean mobileVerified;
//         private Boolean aadhaarVerified;
//         private Boolean bankAccountVerified;
//         private Boolean panCardVerified;
//         private LocalDateTime mobileVerifiedAt;
//         private LocalDateTime aadhaarVerifiedAt;
//         private LocalDateTime bankAccountVerifiedAt;
//         private LocalDateTime panCardVerifiedAt;

// }

 

