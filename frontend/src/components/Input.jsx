/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";

const Input = forwardRef(function Myinput(
  { type = "text", className = "", placeholder = "", label, id, icon, ...props },
  ref
) {
  return (
    <div className="relative">
      {label && <label htmlFor={id} className="block text-sm font-medium">{label}</label>}
      
      <div className="flex items-center border-b-2 border-gray-50">
        {icon && (
          <span className="absolute left-3 text-yellow-300">{icon}</span> // Icon container
        )}
        <input
          type={type}
          className={`w-80 md:w-80 lg:w-full pl-10 text-black rounded font-bold my-2 hover:placeholder:text-yellow-300 duration-300 ${className}`} // Padding on left to create space for the icon
          placeholder={placeholder}
          id={id}
          aria-label={label}
          ref={ref}
          {...props} // Spread all the props, including value, onChange, etc.
        />
      </div>
    </div>
  );
});

export default Input;
