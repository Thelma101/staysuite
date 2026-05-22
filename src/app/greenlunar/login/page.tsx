"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Field from "@/components/ui/Field";

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function GreenLunarLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/greenlunar/financials");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f8f6] px-4 py-10">
      <div className="w-full max-w-[440px]">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex size-[131px] items-center justify-center rounded-full bg-brand-green">
            <span className="text-center font-montserrat text-lg font-bold leading-tight text-white">
              Green
              <br />
              Lunar
            </span>
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-[8px] bg-white px-8 py-10"
          style={{ boxShadow: "0px 8px 8px rgba(217,217,217,0.27)" }}
        >
          <h1 className="mb-8 text-center text-2xl font-bold uppercase tracking-brand text-brand-ink">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Field label="Email Address" htmlFor="gl-email">
              <Input
                id="gl-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#d9d9d9] bg-[#f2f4f6]"
              />
            </Field>

            <Field label="Password" htmlFor="gl-password">
              <Input
                id="gl-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#d9d9d9] bg-[#f2f4f6]"
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted hover:text-brand-ink"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                }
              />
            </Field>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-brand-ink">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-4 rounded border-border accent-brand-green"
                />
                <span>Remember this workstation</span>
              </label>

              <Link
                href="/greenlunar/forgot-password"
                className="text-sm font-medium text-red-500 hover:underline"
              >
                Forgot Password
              </Link>
            </div>

            <Button type="submit" fullWidth className="mt-2 h-12">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
