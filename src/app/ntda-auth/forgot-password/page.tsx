"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";

type Step = "email" | "otp" | "reset" | "done";

export default function NtdaForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f8f6] px-4">
      <div className="w-full max-w-[420px] rounded-[12px] bg-white p-8 shadow-card">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex size-[86px] items-center justify-center rounded-full border-2 border-[#188b5c] bg-[#f4f8f6]">
            <span className="text-xs font-bold text-[#188b5c]">NTDA</span>
          </div>
        </div>

        {step === "email" && (
          <>
            <h1 className="mb-2 text-center text-xl font-bold text-brand-ink">
              Forgot Password
            </h1>
            <p className="mb-6 text-center text-sm text-muted">
              Enter your email to receive a verification code.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep("otp");
              }}
              className="flex flex-col gap-5"
            >
              <Field label="Email Address" htmlFor="fp-email" required>
                <Input
                  id="fp-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Button type="submit" fullWidth className="bg-[#188b5c] hover:bg-[#14704a]">
                Send Code
              </Button>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <h1 className="mb-2 text-center text-xl font-bold text-brand-ink">
              Enter Verification Code
            </h1>
            <p className="mb-6 text-center text-sm text-muted">
              We sent a 6-digit code to {email}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep("reset");
              }}
              className="flex flex-col gap-5"
            >
              <Field label="OTP Code" htmlFor="fp-otp" required>
                <Input
                  id="fp-otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Field>
              <Button type="submit" fullWidth className="bg-[#188b5c] hover:bg-[#14704a]">
                Verify
              </Button>
            </form>
          </>
        )}

        {step === "reset" && (
          <>
            <h1 className="mb-2 text-center text-xl font-bold text-brand-ink">
              Reset Password
            </h1>
            <p className="mb-6 text-center text-sm text-muted">
              Create a new password for your account.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep("done");
              }}
              className="flex flex-col gap-5"
            >
              <Field label="New Password" htmlFor="fp-pw" required>
                <Input
                  id="fp-pw"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field label="Confirm Password" htmlFor="fp-cpw" required>
                <Input
                  id="fp-cpw"
                  type="password"
                  placeholder="Confirm password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </Field>
              <Button type="submit" fullWidth className="bg-[#188b5c] hover:bg-[#14704a]">
                Reset Password
              </Button>
            </form>
          </>
        )}

        {step === "done" && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
              <svg className="size-8 text-[#188b5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-brand-ink">Password Reset!</h2>
            <p className="text-center text-sm text-muted">
              Your password has been successfully reset.
            </p>
            <Button as="link" href="/ntda-auth/login" fullWidth className="bg-[#188b5c] hover:bg-[#14704a]">
              Back to Login
            </Button>
          </div>
        )}

        {step !== "done" && (
          <p className="mt-6 text-center text-sm text-muted">
            Remember your password?{" "}
            <Link href="/ntda-auth/login" className="font-medium text-[#188b5c] hover:underline">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
