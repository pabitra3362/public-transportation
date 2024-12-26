import React from "react";
import { motion } from "framer-motion";

const Button = ({ children, className = "", type="button", ref, ...props }) => {
  return (
    <motion.button
    whileTap={{
      scale:0.8,
      transition:{
        duration:0.1
      }
    }}
      ref={ref}
      type={type}
      className={`group relative border z-0 bg-transparent overflow-hidden font-bold hover:text-white ${className}`}
      {...props}
    >
      <span className="absolute -z-10 top-0 left-0 w-full h-full inset-0 block -translate-x-full transition duration-500 bg-yellow-400 group-hover:translate-x-0"></span>
      {children}
    </motion.button>
  );
};

export default Button;
