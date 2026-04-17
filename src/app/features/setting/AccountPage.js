"use client";
import { Phone } from "lucide-react";
import { headFont } from "@/app/layout";
import { getApi } from "@/services/apiService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, CreditCard, ShieldCheck, MapPin, Pencil } from "lucide-react";
import { deleteApi } from "@/services/apiService";

export default function AccountPage() {
  const [profileData, setProfileData] = useState();
  const [recivedImage,setRecievedImage]=useState();

  const router = useRouter();

  useEffect(() => {
    async function fetchProfileData() {
      const fetchedProfile = await getApi("/users/profile-data");
      setProfileData(fetchedProfile?.data);
    }
    fetchProfileData();
  }, []);

  console.log("this is profile data", profileData);

  const handleDeleteAccount = async () => {
    const userId = profileData?.userId;

    const deleteAccount = await deleteApi(`/users/${userId}`);

    if (deleteAccount.success) {
      router.push("/");
    }
  };

  useEffect(()=>{
    //   const getImageUrl=(url)=>{`${process.env.NEXT_PUBLIC_API_URL}/IPLOADS/${url}`}
    //   `${process.env.NEXT_PUBLIC_API_URL}/uploads/${recieveImage?.data?.filePath}`
    const filePath=profileData?.profilePhoto?.filePath;

    console.log("this is pofile photo!!!!!!!!!!!!!!!!!!",profileData?.profilePhoto?.filePath);
    const profileImage=`${process.env.NEXT_PUBLIC_API_URL}/uploads/profile-photos/${filePath}`;
    setRecievedImage(profileImage);
  },[profileData])

  return (
    <div>
      <h2
        className={` ${headFont.className} text-xl md:text-2xl text-black mb-2`}
      >
        Account Settings
      </h2>

      {/* Profile */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-5">
        <div className="flex items-center gap-4">
          {/* <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-14 h-14 md:w-16 md:h-16 rounded-full"
          /> */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-lime-100 flex items-center justify-center">
            {recivedImage ? ( 
             <img
                src={recivedImage}
                className="w-full h-full object-cover"
              /> 
             ) : (
              <User className="text_lime" size={40} />
              )}
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-lg md:text-xl text-black">
              {profileData?.fullName || "-"}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm">
              {profileData?.email || "-"}
            </p>
            <p className="text_lime text-xs md:text-sm">✓ Verified</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Phone size={16} />
          +91 9876543210
        </div>
      </div>

      {/* Read-only fields */}
      <div className="space-y-4 md:space-y-5">
        <Field label="Full Name" value={profileData?.fullName || "-"} />
        <Field
          label="Email Address"
          value={profileData?.email || "-"}
          verified
        />
        <Field label="Phone Number" value={profileData?.mobileNumber || "-"} />
        <Field label="Location" value={profileData?.farmLocation || "--"} />
      </div>

      <div>
        <div>
          <button
            className="text-red-500 bg-white border border-red-600 px-2 py-2 rounded-lg  cursor-pointer mt-20"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

/* Reusable Field Component */
function Field({ label, value, verified }) {
  return (
    <div>
      <label className="text-xs md:text-sm text-gray-600">{label}</label>

      <div className="mt-1 relative">
        <div className="w-full border bg-gray-100 text-gray-700 rounded-lg px-3 py-2 text-sm">
          {value}
        </div>

        {verified && (
          <span className="absolute right-3 top-2 text_lime text-xs md:text-sm">
            ✓ Verified
          </span>
        )}
      </div>
    </div>
  );
}
