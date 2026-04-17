"use client";

import { useState } from "react";
import { User, CreditCard, ShieldCheck, MapPin, Pencil } from "lucide-react";
import useSWR from "swr";
import { fetcher, putSwr } from "@/lib/fetcher";
// import { setformData, resetProfile } from "@/app/Store/slices/profileSlice";
import {
  postApi,
  putMultipartApi,
  postMultipartApi,
  blobGetApi,
  getApi,
} from "@/services/apiService";
import { useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Toast from "@/Components/Alert/Toast";

/*  MAIN  */
export default function ProfileSections() {
  const [editBasic, setEditBasic] = useState(false);
  const [editFinancial, setEditFinancial] = useState(false);
  const [editFarm, setEditFarm] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [recievedImage, setrecievedImage] = useState();
  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    mobileNumber: "",
    email: "",
    dateOfBirth: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    farmSize: "",
    primaryCrops: "",
    farmLocation: "",
    yearsOfExperience: "",
  });
  const [imageErrors, setImageErrors] = useState("");

  const [imagePreview, setImagePreview] = useState(null);

  let userId = localStorage.getItem("persist:auth")
    ? JSON.parse(localStorage.getItem("persist:auth")).id
    : null;

  console.log(typeof userId);

  const IMAGE_ALLOWED_TYPE = ["image/jpeg", "image/png"];
  const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

  //get api call from here

  const {
    data: gotData,
    isLoadings,
    errors,
  } = useSWR(`users/${userId}`, fetcher);
  const {
    data: gotImageData,
    isImageLoadings,
    imageErrorss,
  } = useSWR(`/users/profile-photo`, fetcher);

  useEffect(() => {
    async function recieveImage() {
      const recieveImage = await getApi("/users/profile-photo");
      console.log("This is image api", recieveImage);
      if(recieveImage.success){
      const recievedImage = `${process.env.NEXT_PUBLIC_API_URL}/uploads/${recieveImage?.data?.filePath}`;
      console.log("this is recieved image", recievedImage);
      setrecievedImage(recievedImage);
      }
    }
    console.log("this is image", recievedImage);
    recieveImage();
  }, []);
  console.log("this is profile data", recievedImage);

  useEffect(() => {
    if (gotData) {
      setFormData(gotData);
    }
  }, [gotData]);

  console.log("This is form data", recievedImage);

  const handleChange = ({ name, value }) => {
    if (
      name === "mobileNumber" ||
      name === "accountNumber" ||
      name === "farmSize" ||
      name === "yearsOfExperience"
    ) {
      if (value == "" || /^\d+$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (file) => {
    if (file) {
      const preview = URL.createObjectURL(file);
      setImageErrors("");
      setImagePreview(preview);
      console.log("this is preview", preview);
      console.log("Image file:", file);
      const isAllowedType = IMAGE_ALLOWED_TYPE.includes(file.type);
      const isAllowedSize = file.size <= MAX_IMAGE_SIZE_BYTES;
      if (isAllowedType && isAllowedSize) {
        setImageFile(file);
      } else {
        setImageErrors("Only JPG/PNG images up to 5 MB are allowed.");
      }
    }
  };
  console.log("this is form data:", formData);

  async function handleSubmit() {
    // Create FormData for file upload

    const formDatas = new FormData();
    const image = new FormData();

    // Append profile data as JSON string
    formDatas.append("formData", JSON.stringify(formData));

    // Append image file if exists
    if (imageFile) {
      image.append("file", imageFile);
    }
    // Send the FormData to the API
    const dataResponse = await putMultipartApi("/users/profile/complete", formData);
  

    const imageUpload = await postMultipartApi("/users/profile-photo", image);
    if(dataResponse.success || imageUpload.success ){
       toast.success(dataResponse.message || imageUpload.message);
       setEditFarm(!editFarm);
    }else{
       toast.error(dataResponse.message || imageUpload.message);
    }
  }

  return (
    <>
    <Toast times={2000} />
    <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/*  PROFILE HEADER  */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border flex flex-col md:flex-row items-center md:items-start gap-4">
        {/* IMAGE */}
        <div className="relative z-0">
          <div className="w-24 h-24  rounded-full overflow-hidden bg-lime-100 flex items-center justify-center">
            {imagePreview || recievedImage ? (
              <img
                src={imagePreview || recievedImage}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="text_lime" size={40} />
            )}
          </div>

          <label className="absolute bottom-0  right-0 bg-lime-500 text-white p-2 rounded-full cursor-pointer text-xs">
            📷
            <input
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </label>
        </div>

        {/* INFO */}
        <div className="text-center md:text-left">
          {/* <h2 className="text-xl  text-black">{formData?.fullName}</h2> */}
          <p className="text-gray-500">Farmer</p>

          <button className="mt-2 border border-lime-500 text_lime px-4 py-1 rounded-lg text-sm hover:bg-lime-50">
            Upload Photo
          </button>
          {imageErrors && (
            <p className="mt-2 text-sm text-red-600">{imageErrors}</p>
          )}
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
          <Input
            label="Full Name"
            name="fullName"
            value={formData?.fullName}
            edit={editBasic}
            onChange={handleChange}
          />

          <Input
            label="Mobile Number"
            name="mobileNumber"
            maxlength="10"
            value={formData?.mobileNumber}
            edit={editBasic}
            onChange={handleChange}
          />

          <Input
            label="Email Address"
            name="email"
            value={formData?.email}
            edit={editBasic}
            onChange={handleChange}
          />

          <Input
            label="Date of Birth"
            name="dateOfBirth"
            value={formData?.dateOfBirth}
            edit={editBasic}
            onChange={handleChange}
            type="date"
          />
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
          <Input
            label="Bank Name"
            name="bankName"
            value={formData?.bankName}
            edit={editFinancial}
            onChange={handleChange}
          />

          <Input
            label="Account Number"
            name="accountNumber"
            value={formData?.accountNumber}
            edit={editFinancial}
            onChange={handleChange}
          />

          <Input
            label="IFSC Code"
            name="ifscCode"
            value={formData?.ifscCode}
            edit={editFinancial}
            onChange={handleChange}
          />

          <Input
            label="UPI ID"
            name="upiId"
            value={formData?.upiId}
            edit={editFinancial}
            onChange={handleChange}
          />
        </Grid>
      </SectionCard>

      {/* ================= VERIFICATION ================= */}
      {/* <SectionCard
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
      </SectionCard> */}

      {/* ================= FARM ================= */}
      <SectionCard
        title="Farm Details"
        subtitle="Information about your farm"
        icon={<MapPin />}
        isEdit={editFarm}
        onEdit={() => setEditFarm(!editFarm)}
      >
        <Grid>
          <Input
            label="Farm Size (in acres)"
            name="farmSize"
            value={formData?.farmSize}
            edit={editFarm}
            onChange={handleChange}
          />

          <Input
            label="Primary Crops"
            name="primaryCrops"
            value={formData?.primaryCrops}
            edit={editFarm}
            onChange={handleChange}
          />

          <Input
            label="Farm Location"
            name="farmLocation"
            value={formData?.farmLocation}
            edit={editFarm}
            onChange={handleChange}
          />

          <Input
            label="Years of Experience"
            name="yearsOfExperience"
            value={formData?.yearsOfExperience}
            edit={editFarm}
            onChange={handleChange}
          />
        </Grid>
      </SectionCard>

      {/* ================= BUTTONS ================= */}
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        {/* <button className="px-6 py-2 border rounded-lg w-full sm:w-auto text-black">
          Cancel
        </button> */}

        <button
          className="px-6 py-2 back_lime text-white rounded-lg w-full sm:w-auto "
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </div>
    </>
  );
}

/* ================= SECTION CARD ================= */
function SectionCard({ title, subtitle, icon, children, isEdit, onEdit }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-lime-100 text_lime p-3 rounded-lg">{icon}</div>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  );
}

/*  INPUT  */
function Input({ label, value, onChange, edit, name, maxlength, type }) {
  console.log("this is name", name, value);
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>

      {edit ? (
        <input
          maxLength={maxlength}
          value={value ?? ""}
          onChange={(e) =>
            onChange({
              name: e.target.name,
              value: e.target.value,
            })
          }
          type={type}
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
    <div
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 rounded-xl border ${
        status === "verified"
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-200"
      }`}
    >
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

// const formData = useSelector((state) => state.profile.data.informations);
// const image = useSelector((state) => state.profile.data.images);
// const dispatch = useDispatch();
// console.log("this is profile formData?", formData);
// console.log("this is redux data ", image);

//  const { formData?s , isLoading, error } = useSWR(
//   "/users/updateProfile",
//   fetcher,
//   {
//   refreshInterval:5000,
//   }
// );
// console.log("formDatass", formDatass);

// async function handleSubmit(){
//   const payLoad={
//     formData
//   }
//       console.log("this is payload",payLoad);
//   console.log("this is form daata",formData);

//   const sendProfileData=await putMultipartApi("/users/updateProfile",formData);
//   console.log("this is sendProfiledata",sendProfileData);
// }
