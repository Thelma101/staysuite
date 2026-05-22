"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Tabs from "@/components/ui/Tabs";

type Method = "email" | "phone";

/**
 * Login page — Figma node 84:371. Renders the "Welcome Back / Quest
 * Portal" auth card with an Email/Phone tab switch and a single
 * text input; submitting the form sends the user to the OTP step.
 */
export default function LoginPage() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("email");
  const [identifier, setIdentifier] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!identifier.trim()) return;
    setSubmitting(true);
    // Simulated network roundtrip — replace with real auth service later.
    setTimeout(() => router.push("/login/verify"), 250);
  };

  return (
    <AppShell subHeader={{ title: "Login", backHref: "/" }}>
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-4 py-12 md:py-20">
        <Card className="w-full max-w-[602px] px-6 py-10 md:px-12 md:py-12">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-[314px] flex-col items-stretch gap-11"
          >
            <header className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-xl font-medium text-brand-ink">
                Welcome Back
              </h2>
              <p className="text-sm text-muted">Quest Portal</p>
            </header>

            <Tabs<Method>
              value={method}
              onChange={setMethod}
              options={[
                { value: "email", label: "Email" },
                { value: "phone", label: "Phone number" },
              ]}
            />

            <div className="flex flex-col gap-8">
              <Field
                label={
                  method === "email" ? "Enter email address" : "Enter phone number"
                }
                htmlFor="identifier"
              >
                <Input
                  id="identifier"
                  type={method === "email" ? "email" : "tel"}
                  inputMode={method === "email" ? "email" : "tel"}
                  autoComplete={method === "email" ? "email" : "tel"}
                  placeholder={
                    method === "email" ? "Email address" : "+234 800 000 0000"
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </Field>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={!identifier.trim() || submitting}
              >
                {submitting ? "Sending…" : "Next"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
