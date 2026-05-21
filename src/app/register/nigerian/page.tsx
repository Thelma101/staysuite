"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Field from "@/components/ui/Field";
import FigIcon from "@/components/ui/FigIcon";
import Input from "@/components/ui/Input";
import OtpInput from "@/components/ui/OtpInput";

/**
 * Nigerian registration via NIN — Figma nodes 49:477 (desktop) and
 * 49:672 (mobile). Combines NIN entry, an OTP step with an inline
 * countdown timer, an email field, and the "Create / Register Now"
 * primary action.
 */
export default function NigerianRegistrationPage() {
  const router = useRouter();
  const [nin, setNin] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Treat 11 digits as a "validated" NIN per Nigerian standard.
  const ninValid = useMemo(() => /^\d{11}$/.test(nin), [nin]);
  const otpComplete = code.replace(/\s/g, "").length === 4;
  const formValid = ninValid && otpComplete && /.+@.+\..+/.test(email);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formValid) return;
    setSubmitting(true);
    setTimeout(() => router.push("/register/nigerian/success"), 250);
  };

  return (
    <AppShell
      subHeader={{
        title: "Register Account",
        floatingBack: true,
        backHref: "/",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-4 pb-16 pt-6 md:pt-8">
        <Card
          bordered={false}
          className="w-full max-w-[602px] px-5 py-8 md:px-12 md:py-12"
        >
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-[498px] flex-col gap-10"
          >
            <h2 className="text-center text-xl font-medium text-brand-ink">
              Sign up with NIN
            </h2>

            <div className="flex flex-col gap-10">
              <Field
                label="NIN (National Identification Number)"
                htmlFor="nin"
              >
                <Input
                  id="nin"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={11}
                  placeholder="12345678901"
                  value={nin}
                  onChange={(e) =>
                    setNin(e.target.value.replace(/\D/g, "").slice(0, 11))
                  }
                  endAdornment={
                    ninValid ? (
                      <FigIcon
                        src="/figma/icons/checkmark-circle.svg"
                        size={24}
                        alt="Verified"
                      />
                    ) : null
                  }
                  required
                />
              </Field>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                  <p className="text-sm font-medium text-brand-ink">
                    OTP Verification
                  </p>
                  <p className="text-sm font-semibold text-brand-ink">
                    <span className="font-normal">Enter the OTP sent to</span>{" "}
                    *******6789
                  </p>
                </div>
                <OtpInput
                  length={4}
                  value={code}
                  onChange={setCode}
                  gapClassName="gap-3 sm:gap-[14px] md:gap-[34px]"
                  trailing={
                    <span className="ml-auto inline-flex h-12 min-w-[72px] items-center justify-center rounded-[6px] border border-border bg-white px-3 text-xs font-semibold tabular-nums text-muted">
                      00:54
                    </span>
                  }
                />
              </div>

              <Field label="Email" htmlFor="email">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Adeyemi@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={!formValid || submitting}
            >
              {submitting ? "Creating account…" : "Create Account"}
            </Button>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
