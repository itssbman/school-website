import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getColor(name: string) {
  const colors = [
    "bg-[#1A2B49] text-white",
    "bg-terracotta text-white",
    "bg-[#3D5A45] text-white",
    "bg-[#6B4226] text-white",
    "bg-[#4A5568] text-white",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

const sizes = {
  sm: "w-7 h-7 text-[11px]",
  md: "w-9 h-9 text-[13px]",
  lg: "w-12 h-12 text-[16px]",
  xl: "w-16 h-16 text-[20px]",
};

export default function Avatar({ src, name, size = "md", className = "" }: AvatarProps) {
  if (src) {
    return (
      <div className={`relative rounded-full overflow-hidden flex-shrink-0 ${sizes[size]} ${className}`}>
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`rounded-full flex-shrink-0 flex items-center justify-center font-semibold ${sizes[size]} ${getColor(name)} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
