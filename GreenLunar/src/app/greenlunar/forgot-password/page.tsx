"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Field from "@/components/ui/Field";
import { validateEmail, validatePassword } from "@/lib/validation";

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

type Step = "email" | "sent" | "reset" | "done";

export default function GreenLunarForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateEmail(email);
    if (!check.ok) {
      setError(check.message);
      return;
    }
    setError(null);
    setStep("sent");
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pwCheck = validatePassword(newPassword);
    if (!pwCheck.ok) {
      setError(pwCheck.message);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    setStep("done");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f8f6] px-4 py-10">
      <div className="w-full max-w-[440px]">
        <div className="mb-8 flex justify-center">
          <div className="flex size-[131px] items-center justify-center rounded-full bg-brand-green">
            <span className="text-center font-montserrat text-lg font-bold leading-tight text-white">
              Green
              <br />
              Lunar
            </span>
          </div>
        </div>

        <div
          className="rounded-[8px] bg-white px-8 py-10"
          style={{ boxShadow: "0px 8px 8px rgba(217,217,217,0.27)" }}
        >
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-5">
              <h1 className="text-center text-2xl font-bold uppercase tracking-brand text-brand-ink">
                Forgot Password
              </h1>
              <p className="text-center text-sm text-muted">
                Enter your email address to receive a secure recovery link
              </p>
              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
              <Field label="Email Address" htmlFor="fp-email">
                <Input
                  id="fp-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[#d9d9d9] bg-[#f2f4f6]"
                />
              </Field>
              <Button type="submit" fullWidth className="h-12">
                Request Recovery Link
              </Button>
              <Link
                href="/greenlunar/login"
                className="mt-1 flex items-center gap-1 text-sm font-medium text-brand-green hover:underline"
              >
                Back to login
              </Link>
            </form>
          )}

          {step === "sent" && (
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
                <svg className="size-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-brand-ink">Check your email</h1>
              <p className="text-sm text-muted">
                We sent a password reset link to{" "}
                <span className="font-semibold text-brand-ink">{email}</span>. Open the link to
                continue, or proceed below if you are testing the flow.
              </p>
              <Button type="button" fullWidth className="h-12" onClick={() => setStep("reset")}>
                Reset Password
              </Button>
              <Link href="/greenlunar/login" className="text-sm font-medium text-brand-green hover:underline">
                Back to login
              </Link>
            </div>
          )}

          {step === "reset" && (
            <form onSubmit={handleResetSubmit} className="flex flex-col gap-5">
              <h1 className="text-center text-2xl font-bold uppercase tracking-brand text-brand-ink">
                Reset Password
              </h1>
              <p className="text-center text-sm text-muted">Create a new password for your account</p>
              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
              <Field label="New Password" htmlFor="fp-new-pw">
                <Input
                  id="fp-new-pw"
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border-[#d9d9d9] bg-[#f2f4f6]"
                  endAdornment={
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="text-muted hover:text-brand-ink"
                      aria-label={showNew ? "Hide password" : "Show password"}
                    >
                      <EyeIcon open={showNew} />
                    </button>
                  }
                />
              </Field>
              <Field label="Confirm Password" htmlFor="fp-confirm-pw">
                <Input
                  id="fp-confirm-pw"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-[#d9d9d9] bg-[#f2f4f6]"
                  endAdornment={
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="text-muted hover:text-brand-ink"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      <EyeIcon open={showConfirm} />
                    </button>
                  }
                />
              </Field>
              <Button type="submit" fullWidth className="h-12">
                Reset Password
              </Button>
            </form>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-2xl text-brand-green">
                ✓
              </div>
              <h1 className="text-xl font-bold text-brand-ink">Password reset!</h1>
              <p className="text-sm text-muted">Your password has been updated successfully.</p>
              <Button type="button" fullWidth className="h-12" onClick={() => router.push("/greenlunar/login")}>
                Back to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
