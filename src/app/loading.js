"use client";
import React from "react";
import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-200">
      {/* Logo / Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-green-800 mb-6"
      >
        KissanSetu 🌱
      </motion.h1>

      {/* Animated Tractor Circle */}
      <motion.div
        className="relative w-28 h-28 rounded-full border-4 border-green-500 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        <span className="text-3xl">🚜</span>
      </motion.div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-6 text-lg text-green-700"
      >
        Connecting Farmers...
      </motion.p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-green-100 rounded-full mt-6 overflow-hidden">
        <motion.div
          className="h-full bg-green-500"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>
    </div>
  );
}
