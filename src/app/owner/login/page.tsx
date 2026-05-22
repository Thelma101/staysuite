"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Tabs from "@/components/ui/Tabs";

type LoginTab = "admin" | "staff";

export default function OwnerLoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<LoginTab>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => router.push("/owner/dashboard"), 250);
  };

  return (
    <AppShell
      subHeader={{
        title: "Login",
        backHref: "/owner",
      }}
      hideOwnerCta
    >
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-4 py-12 md:py-20">
        <Card className="w-full max-w-[602px] px-6 py-10 md:px-12 md:py-12">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-[380px] flex-col items-stretch gap-8"
          >
            <header className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-xl font-medium text-brand-ink">Welcome Back</h2>
              <p className="text-sm text-muted">Hotel Owner Portal</p>
            </header>

            <Tabs<LoginTab>
              value={tab}
              onChange={setTab}
              options={[
                { value: "admin", label: "Hotel Admin" },
                { value: "staff", label: "Staff Member" },
              ]}
            />

            <div className="flex flex-col gap-6">
              <Field label="Email Address" htmlFor="owner-email">
                <Input
                  id="owner-email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@hotel.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Field label="Password" htmlFor="owner-password">
                <Input
                  id="owner-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <Button type="submit" fullWidth disabled={submitting}>
                {submitting ? "Signing in…" : "Next"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
