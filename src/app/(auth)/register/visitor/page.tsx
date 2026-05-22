"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import UploadField from "@/components/ui/UploadField";

const COUNTRY_OPTIONS = [
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "cn", label: "China" },
  { value: "jp", label: "Japan" },
  { value: "za", label: "South Africa" },
];

const STATE_OPTIONS = [
  { value: "ca", label: "California" },
  { value: "ny", label: "New York" },
  { value: "tx", label: "Texas" },
  { value: "fl", label: "Florida" },
  { value: "il", label: "Illinois" },
];

type FormState = {
  country: string;
  state: string;
  passport: string;
  phone: string;
  email: string;
  passportPhoto?: File;
  passportDoc?: File;
};

/**
 * Visitor / Foreigner registration form — Figma node 20:22725.
 * Fully responsive: collapses to a single-column 16px-padded layout
 * on mobile and renders the original 602px card on tablet up.
 */
export default function VisitorRegistrationPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    country: "us",
    state: "ca",
    passport: "",
    phone: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => router.push("/register/visitor/verify"), 250);
  };

  return (
    <AppShell
      subHeader={{ title: "Visitor Registration", backHref: "/" }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-4 py-8 md:py-12">
        <Card className="w-full max-w-[602px] px-5 py-6 md:px-[53px] md:py-[91px] md:pt-12">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-9"
          >
            <h2 className="text-center text-xl font-medium text-brand-ink">
              Register as a Foreign Visitor
            </h2>

            <div className="flex w-full flex-col gap-[26px]">
              <Field label="Country" htmlFor="country">
                <Select
                  id="country"
                  options={COUNTRY_OPTIONS}
                  value={form.country}
                  onChange={(e) => update("country")(e.target.value)}
                />
              </Field>

              <Field label="State" htmlFor="state">
                <Select
                  id="state"
                  options={STATE_OPTIONS}
                  value={form.state}
                  onChange={(e) => update("state")(e.target.value)}
                />
              </Field>

              <Field label="Passport Number" htmlFor="passport">
                <Input
                  id="passport"
                  value={form.passport}
                  onChange={(e) => update("passport")(e.target.value)}
                  placeholder="A12345667"
                  required
                />
              </Field>

              <Field label="Phone Number" htmlFor="phone">
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => update("phone")(e.target.value)}
                  required
                />
              </Field>

              <Field label="Email" htmlFor="email">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email")(e.target.value)}
                  required
                />
              </Field>

              <Field label="Upload Passport Photo">
                <UploadField
                  label="Upload Photo"
                  iconSrc="/figma/icons/camera.svg"
                  accept="image/*"
                  onFile={(file) => update("passportPhoto")(file)}
                />
              </Field>

              <Field label="Upload Passport Document">
                <UploadField
                  label="Upload Document"
                  iconSrc="/figma/icons/passport.svg"
                  accept="application/pdf,image/*"
                  onFile={(file) => update("passportDoc")(file)}
                />
              </Field>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={submitting}
            >
              {submitting ? "Registering…" : "Register Now"}
            </Button>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
