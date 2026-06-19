import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
  size?: "sm" | "md";
}

export default function Badge({
  variant = "default",
  size = "sm",
  children,
  className = "",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-[#F5F4F2] text-[#6B7280]",
    success: "bg-[#DCEDE2] text-[#3D5A45]",
    warning: "bg-[#FEF3C7] text-[#92400E]",
    danger: "bg-[#FEE2E2] text-[#991B1B]",
    info: "bg-[#DBEAFE] text-[#1E40AF]",
    outline: "border border-[#E5E3DF] text-[#6B7280]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-[12px]",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
