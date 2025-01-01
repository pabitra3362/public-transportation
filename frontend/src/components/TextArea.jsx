import React, { forwardRef } from "react";

const TextArea = forwardRef(function Mytextarea(
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
        <textarea
          type={type}
          className={`w-80 md:w-80 lg:w-[35vw] text-black font-bold ${className}`} // Padding on left to create space for the icon
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

export default TextArea;
