"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import { validateEmail, validatePassword } from "@/lib/validation";

export default function NtdaLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f8f6] px-4">
      <div className="w-full max-w-[420px] rounded-[12px] bg-white p-8 shadow-card">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex size-[86px] items-center justify-center rounded-full border-2 border-[#188b5c] bg-[#f4f8f6]">
            <span className="text-xs font-bold text-[#188b5c]">NTDA</span>
          </div>
          <p className="mt-3 text-[11px] font-medium text-gray-500">
            Nigerian Tourism Development Authority
          </p>
        </div>

        <h1 className="mb-6 text-center text-xl font-bold text-brand-ink">
          LOGIN
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const emailCheck = validateEmail(email);
            const passwordCheck = validatePassword(password);
            if (!emailCheck.ok) {
              setError(emailCheck.message);
              return;
            }
            if (!passwordCheck.ok) {
              setError(passwordCheck.message);
              return;
            }
            setError(null);
            router.push("/ntda/dashboard");
          }}
          className="flex flex-col gap-5"
        >
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <Field label="Email Address" htmlFor="ntda-email" required>
            <Input
              id="ntda-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field label="Password" htmlFor="ntda-password" required>
            <Input
              id="ntda-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-4 rounded border-border accent-[#188b5c]"
              />
              Remember me
            </label>
            <Link
              href="/ntda-auth/forgot-password"
              className="text-sm font-medium text-red-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" fullWidth className="mt-2 bg-[#188b5c] hover:bg-[#14704a]">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
