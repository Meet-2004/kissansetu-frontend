"use client";
import { useState } from "react";
import AccountPage from "./AccountPage";
import SecurityPage from "./SecurityPage";
import { User, Shield } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6 min-h-screen">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white rounded-2xl shadow p-3 md:p-4">
        <div className="flex md:flex-col gap-2">
          
          <button
            onClick={() => setActiveTab("account")}
            className={`flex-1 md:w-full flex cursor-pointer items-center justify-center md:justify-start gap-2 px-4 py-2 md:py-3 rounded-xl text-sm md:text-base ${
              activeTab === "account"
                ? "back_lime text-white"
                : "hover:bg-gray-100 text-black"
            }`}
          >
            <User size={18} />
            Account
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex-1 md:w-full  flex items-center text-black justify-center md:justify-start gap-2 px-4 py-2 md:py-3 rounded-xl text-sm md:text-base ${
              activeTab === "security"
                ? "back_lime text-white"
                : "hover:bg-gray-100 text-black"
            }`}
          >
            <Shield size={18} />
            Security
          </button>

        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white rounded-2xl shadow p-4 md:p-6">
        {activeTab === "account" ? <AccountPage /> : <SecurityPage />}
      </div>
    </div>
  );
}