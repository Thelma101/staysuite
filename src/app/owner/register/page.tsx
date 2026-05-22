"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Field from "@/components/ui/Field";
import FigIcon from "@/components/ui/FigIcon";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import UploadField from "@/components/ui/UploadField";

const BANK_OPTIONS = [
  { value: "first_bank", label: "First Bank of Nigeria" },
  { value: "gtbank", label: "Guaranty Trust Bank" },
  { value: "access", label: "Access Bank" },
  { value: "zenith", label: "Zenith Bank" },
  { value: "uba", label: "United Bank for Africa" },
];

export default function OwnerRegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    hotelName: "",
    address: "",
    phone: "",
    email: "",
    directorNin: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const update =
    (key: keyof typeof form) => (value: string) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => router.push("/owner/dashboard"), 250);
  };

  return (
    <AppShell
      subHeader={{
        title: "Hotel Registration",
        backHref: "/owner",
      }}
      hideOwnerCta
    >
      <div className="mx-auto flex w-full max-w-[1440px] justify-center px-4 py-8 md:py-12">
        <Card className="w-full max-w-[720px] px-5 py-8 md:px-10 md:py-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-semibold text-brand-ink">Register Your Hotel</h2>
              <p className="mt-1 text-sm text-muted">
                Complete the form below to submit your hotel for NTDA approval.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <Field label="Hotel Name" htmlFor="hotel-name">
                <Input
                  id="hotel-name"
                  value={form.hotelName}
                  onChange={(e) => update("hotelName")(e.target.value)}
                  placeholder="Grand Lekki Hotel"
                  required
                />
              </Field>

              <Field label="Address" htmlFor="address">
                <div className="relative flex h-12 w-full items-center rounded-[6px] border border-border bg-white">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <FigIcon src="/figma/icons/location.svg" size={20} alt="" />
                  </span>
                  <input
                    id="address"
                    value={form.address}
                    onChange={(e) => update("address")(e.target.value)}
                    placeholder="15 Admiralty Way, Lekki Phase 1, Lagos"
                    required
                    className="h-full w-full rounded-[6px] bg-transparent pl-10 pr-[14px] text-sm text-brand-ink outline-none placeholder:text-border"
                  />
                </div>
              </Field>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Phone" htmlFor="phone">
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => update("phone")(e.target.value)}
                    placeholder="+234 812 345 6789"
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
                    placeholder="info@hotel.ng"
                    required
                  />
                </Field>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="text-base font-semibold text-brand-ink">Required Documents</h3>

              <Field label="Regulatory Approval">
                <UploadField
                  label="Upload Regulatory Approval"
                  iconSrc="/figma/icons/passport.svg"
                  accept="application/pdf,image/*"
                />
              </Field>

              <Field label="Address Proof">
                <UploadField
                  label="Upload Address Proof"
                  iconSrc="/figma/icons/passport-download.svg"
                  accept="application/pdf,image/*"
                />
              </Field>
            </div>

            <Field label="Director NIN" htmlFor="director-nin">
              <Input
                id="director-nin"
                inputMode="numeric"
                pattern="\d*"
                maxLength={11}
                value={form.directorNin}
                onChange={(e) =>
                  update("directorNin")(e.target.value.replace(/\D/g, "").slice(0, 11))
                }
                placeholder="12345678901"
                required
              />
            </Field>

            <div className="flex flex-col gap-5">
              <h3 className="text-base font-semibold text-brand-ink">Bank Details</h3>

              <Field label="Bank Name" htmlFor="bank-name">
                <Select
                  id="bank-name"
                  options={BANK_OPTIONS}
                  placeholder="Select bank"
                  value={form.bankName}
                  onChange={(e) => update("bankName")(e.target.value)}
                  required
                />
              </Field>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Account Number" htmlFor="account-number">
                  <Input
                    id="account-number"
                    inputMode="numeric"
                    value={form.accountNumber}
                    onChange={(e) =>
                      update("accountNumber")(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="3012345678"
                    required
                  />
                </Field>

                <Field label="Account Name" htmlFor="account-name">
                  <Input
                    id="account-name"
                    value={form.accountName}
                    onChange={(e) => update("accountName")(e.target.value)}
                    placeholder="Grand Lekki Hotel Ltd"
                    required
                  />
                </Field>
              </div>
            </div>

            <Button type="submit" fullWidth disabled={submitting}>
              {submitting ? "Submitting…" : "Submit Registration"}
            </Button>

            <p className="text-center text-sm text-muted">
              Already sign up?{" "}
              <Link href="/owner/login" className="font-medium text-brand-green hover:underline">
                Login
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
