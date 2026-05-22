"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import FigIcon from "@/components/ui/FigIcon";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { HOTEL_CATEGORIES } from "@/lib/constants";
import type { HotelCategory } from "@/types";

const BANK_OPTIONS = [
  { value: "first_bank", label: "First Bank of Nigeria" },
  { value: "gtbank", label: "Guaranty Trust Bank" },
  { value: "access", label: "Access Bank" },
  { value: "zenith", label: "Zenith Bank" },
];

export default function OwnerHotelInfoPage() {
  const [form, setForm] = useState({
    hotelName: "Grand Lekki Hotel",
    address: "15 Admiralty Way, Lekki Phase 1, Lagos",
    phone: "+234 812 345 6789",
    email: "info@grandlekkihotel.ng",
    category: "premium" as HotelCategory,
    directorNin: "12345678901",
    bankName: "first_bank",
    accountNumber: "3012345678",
    accountName: "Grand Lekki Hotel Ltd",
  });

  const update =
    (key: keyof typeof form) => (value: string) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Hotel Information</h2>
        <p className="mt-1 text-sm text-muted">
          Update your hotel profile, contact details, and bank information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-border bg-white p-4 md:p-6"
      >
        <div className="flex flex-col gap-6">
          <Field label="Hotel Name" htmlFor="info-hotel-name">
            <Input
              id="info-hotel-name"
              value={form.hotelName}
              onChange={(e) => update("hotelName")(e.target.value)}
              required
            />
          </Field>

          <Field label="Address" htmlFor="info-address">
            <div className="relative flex h-12 w-full items-center rounded-[6px] border border-border bg-white">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <FigIcon src="/figma/icons/location.svg" size={20} alt="" />
              </span>
              <input
                id="info-address"
                value={form.address}
                onChange={(e) => update("address")(e.target.value)}
                required
                className="h-full w-full rounded-[6px] bg-transparent pl-10 pr-[14px] text-sm text-brand-ink outline-none placeholder:text-border"
              />
            </div>
          </Field>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Phone" htmlFor="info-phone">
              <Input
                id="info-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone")(e.target.value)}
                required
              />
            </Field>

            <Field label="Email" htmlFor="info-email">
              <Input
                id="info-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email")(e.target.value)}
                required
              />
            </Field>
          </div>

          <Field label="Category" htmlFor="info-category">
            <Select
              id="info-category"
              options={HOTEL_CATEGORIES}
              value={form.category}
              onChange={(e) => update("category")(e.target.value)}
            />
          </Field>

          <Field label="Director NIN" htmlFor="info-director-nin">
            <Input
              id="info-director-nin"
              inputMode="numeric"
              maxLength={11}
              value={form.directorNin}
              onChange={(e) =>
                update("directorNin")(e.target.value.replace(/\D/g, "").slice(0, 11))
              }
              required
            />
          </Field>

          <div className="border-t border-border pt-6">
            <h3 className="mb-4 text-base font-semibold text-brand-ink">Bank Details</h3>
            <div className="flex flex-col gap-6">
              <Field label="Bank Name" htmlFor="info-bank-name">
                <Select
                  id="info-bank-name"
                  options={BANK_OPTIONS}
                  value={form.bankName}
                  onChange={(e) => update("bankName")(e.target.value)}
                />
              </Field>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Account Number" htmlFor="info-account-number">
                  <Input
                    id="info-account-number"
                    inputMode="numeric"
                    value={form.accountNumber}
                    onChange={(e) =>
                      update("accountNumber")(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    required
                  />
                </Field>

                <Field label="Account Name" htmlFor="info-account-name">
                  <Input
                    id="info-account-name"
                    value={form.accountName}
                    onChange={(e) => update("accountName")(e.target.value)}
                    required
                  />
                </Field>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit">Save Changes</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
