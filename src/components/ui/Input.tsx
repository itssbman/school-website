"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[13px] font-medium text-[#1A2B49] mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-3 py-2.5 text-[14px] text-[#1A2B49] bg-white
            border border-[#E5E3DF] rounded
            placeholder:text-[#9CA3AF]
            focus:outline-none focus:border-[#1A2B49] focus:ring-1 focus:ring-[#1A2B49]
            transition-colors duration-150
            disabled:bg-[#F5F4F2] disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-[12px] text-red-600">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1 text-[12px] text-[#6B7280]">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
