"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import schoolConfig from "../../../school.config";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const roles = [
  { id: "parent", label: "Parent" },
  { id: "student", label: "Student" },
  { id: "teacher", label: "Teacher" },
  { id: "admin", label: "Admin" },
];

const roleRedirects: Record<string, string> = {
  parent: "/portal/parent",
  student: "/portal/student",
  teacher: "/portal/teacher",
  admin: "/portal/admin",
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError("");
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    const callbackUrl = searchParams.get("callbackUrl");
    router.push(callbackUrl || roleRedirects[selectedRole] || "/portal/student");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8">
        <h1 className="font-heading text-[24px] font-bold text-[#1A2B49] text-center">{schoolConfig.name}</h1>
        <p className="text-[13px] text-[#6B7280] text-center mt-0.5">Student &amp; Staff Portal</p>
      </Link>

      <div className="w-full max-w-[420px] bg-white border border-[#E5E3DF] shadow-subtle">
        <div className="p-8">
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49] mb-1">Sign In</h2>
          <p className="text-[14px] text-[#6B7280] mb-6">Access your portal dashboard</p>

          <div className="flex border border-[#E5E3DF] rounded mb-6">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`flex-1 py-2 text-[13px] font-medium transition-colors first:rounded-l last:rounded-r ${
                  selectedRole === role.id
                    ? "bg-[#1A2B49] text-white"
                    : "text-[#6B7280] hover:text-[#1A2B49] hover:bg-[#F5F4F2]"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label={`${roles.find((r) => r.id === selectedRole)?.label} Email`}
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-[#6B7280] hover:text-[#1A2B49]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-[13px] text-[#6B7280] hover:text-terracotta transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-[13px] px-3 py-2.5 rounded">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isSubmitting}
              className="w-full"
            >
              Sign In to Portal
            </Button>
          </form>
        </div>

        <div className="px-8 py-4 bg-[#F9F8F7] border-t border-[#E5E3DF] text-center">
          <p className="text-[13px] text-[#6B7280]">
            Having trouble?{" "}
            <Link href="/contact" className="text-terracotta hover:underline">
              Contact the school office
            </Link>
          </p>
        </div>
      </div>

      <Link href="/" className="mt-6 text-[13px] text-[#6B7280] hover:text-[#1A2B49] transition-colors">
        ← Back to school website
      </Link>
    </div>
  );
}
