import React, { forwardRef } from "react";

const Input = forwardRef(function Myinput(
  { type = "text", className = "", placeholder = "", label, id, icon, ...props },
  ref
) {
  return (
    <div className="relative">
      {label && <label htmlFor={id} className="block text-sm font-medium">{label}</label>}
      
      <div className="flex items-center border-b-2 border-gray-300">
        {icon && (
          <span className="absolute left-3 text-yellow-400">{icon}</span> // Icon container
        )}
        <input
          type={type}
          className={`w-full pl-10 text-black font-bold ${className}`} // Padding on left to create space for the icon
          placeholder={placeholder}
          id={id}
          aria-label={label}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});

export default Input;
