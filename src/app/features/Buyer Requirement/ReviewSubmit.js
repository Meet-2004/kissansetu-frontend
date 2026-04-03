import { headFont } from "@/app/layout";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerRequirements } from "../../Store/slices/buyerRequirementSlice";
import { postApi } from "@/services/apiService";
import Toast from "@/Components/Alert/Toast";
import { ToastContainer, toast } from "react-toastify";



export default function ReviewSubmit({publishedClicked,closeRequirement,setpublishedClicked}) {
     const requirements = useSelector((state) => state.requirements.form);
      const dispatch = useDispatch();

      
    const handlePublish=async ()=>{
    const publishRequirements=await postApi("/buyers/buyer-requirement",requirements);
    if(publishRequirements.success){
      console.log("sucess");
      setpublishedClicked(false);
      toast.success("sucess");
      localStorage.removeItem("persist:requirements");
      setTimeout(()=>{
        closeRequirement();
      },2000);
    }
    else{
      toast.error("Something error");
    }
        
    }
if(publishedClicked){
    handlePublish();
    setpublishedClicked(false);

}

  return (
    <>
    <Toast times={2000} />
      <div>
        <div className="">
          <textarea
            type="text"
            className="border rounded-lg w-full p-2 h-24 text-black"
            placeholder="Add any specific requirements, quality standards, or special instruction..."
            onChange={(e) => {
              dispatch(setBuyerRequirements({ additionalNotes: e.target.value }));
            }}
            value={requirements.additionalNotes}
          />
        </div>
        <div className="p-5 border-2 border-gray-300 bg-gray-100 mt-5 rounded-lg">
          <p className={` ${headFont.className} text-black text-lg`}>
            Requirement Summary
          </p>
          <div>
            <div className="justify-between flex w-full mt-1">
              <p className="text-gray-700">crop:</p>
              <p className="text-black">Rice-mm</p>
            </div>
            <div className="justify-between flex w-full mt-1">
              <p className="text-gray-700">crop:</p>
              <p className="text-black">Rice-mm</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
