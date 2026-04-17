"use client";
import { useState } from "react";

export default function PublishButton() {
  const [state, setState] = useState("idle");

  const handleClick = async () => {
    if (state !== "idle") return;

    setState("loading");

    // simulate API
    setTimeout(() => {
      setState("success");

      setTimeout(() => setState("idle"), 2500);
    }, 2500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={state !== "idle"}
      className={`
        btn-pro
        flex items-center justify-center
        h-12
        ${state === "loading" ? "w-[52px]" : "w-full px-6"}
        bg-green-500 text-white font-semibold
        rounded-xl
        shadow-[0_10px_25px_rgba(0,0,0,0.15)]
      `}
    >
      {/* TEXT */}
      <span className={`btn-text ${state !== "idle" && "opacity-0 scale-90"}`}>
        Publish
      </span>

      {/* LOADER */}
      {state === "loading" && <div className="absolute loader-box"></div>}

      {/* SUCCESS */}
      {state === "success" && (
        <span className="absolute success">✔ Published</span>
      )}
    </button>
  );
}
