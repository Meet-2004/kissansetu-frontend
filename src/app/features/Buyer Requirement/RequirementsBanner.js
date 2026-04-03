import { Plus } from "lucide-react";
import { headFont } from "@/app/layout";

export default function RequirementBanner({ onClick }) {
  return (
    <div className="bg-linear-to-r from-[#64B9001A] to-[#64B9000D] border-2 shadow-lg border-[#64B90033]  rounded-xl p-5 text-center mb-6">
      <h2 className={`text-2xl  mb-2 text-black ${headFont.className}`}>
        Still can't find what you need?
      </h2>

      <p className="text-gray-700 mb-6 max-w-xl mx-auto">
        Post a buying requirement and let verified farmers reach out to you with
        their best offers.
      </p>

      <button
        onClick={onClick}
        className="back_lime text-white px-5 py-2 rounded-xl flex items-center gap-2 mx-auto hover:bg-lime-600 transition cursor-pointer"
      >
        <Plus size={18} />
        Post Buying Requirement
      </button>
    </div>
  );
}