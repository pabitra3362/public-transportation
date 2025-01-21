import React, { useEffect } from "react";
import gsap from "gsap";

const Loading = () => {
  useEffect(() => {
    // GSAP animation for loading spinner (can be customized)
    gsap.to(".spinner", {
      rotation: 360,
      repeat: -1,
      duration: 1.5,
      ease: "linear",
    });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="spinner w-16 h-16 border-8 border-t-8 border-yellow-500 border-solid rounded-full"></div>
    </div>
  );
};

export default Loading;
