"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import OtpInput from "@/components/ui/OtpInput";
import OtpResend from "@/components/ui/OtpResend";

/**
 * Login OTP step — Figma node 84:518. Verifies the 4-digit code
 * sent to the user's phone, then routes to the dashboard.
 */
export default function LoginVerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isComplete = code.replace(/\s/g, "").length === 4;

  const handleVerify = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isComplete) return;
    setSubmitting(true);
    setTimeout(() => router.push("/user/dashboard"), 250);
  };

  return (
    <AppShell subHeader={{ title: "Login", backHref: "/login" }}>
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-4 py-12 md:py-20">
        <Card className="w-full max-w-[602px] px-6 py-12 md:px-12">
          <form
            onSubmit={handleVerify}
            className="mx-auto flex w-full max-w-[384px] flex-col items-center gap-8"
          >
            <header className="flex w-full max-w-[294px] flex-col items-center gap-4 text-center">
              <h2 className="text-base font-medium text-brand-ink">
                Please verify your phone number
              </h2>
            </header>

            <div className="flex w-full max-w-[294px] flex-col items-center gap-[18px]">
              <div className="flex w-full flex-col items-center gap-[42px]">
                <p className="text-center text-sm font-medium text-brand-ink">
                  Enter OTP sent to +1555123456
                </p>
                <OtpInput
                  length={4}
                  value={code}
                  onChange={setCode}
                  autoFocus
                />
              </div>
              <OtpResend seconds={30} />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={!isComplete || submitting}
            >
              {submitting ? "Verifying…" : "Verify"}
            </Button>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
