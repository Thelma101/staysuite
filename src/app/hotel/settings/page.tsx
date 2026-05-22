"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { HOTEL_FACILITIES } from "@/lib/constants";
import type { HotelCategory, HotelFacility } from "@/types";

interface MockHotelInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  category: HotelCategory;
}

interface MockDirector {
  name: string;
  nin: string;
}

interface MockBankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const hotelInfo: MockHotelInfo = {
  name: "Grand Lekki Hotel",
  address: "15 Admiralty Way, Lekki Phase 1, Lagos",
  phone: "+234 812 345 6789",
  email: "info@grandlekkihotel.ng",
  category: "premium",
};

const directors: MockDirector[] = [
  { name: "Chief Olumide Bakare", nin: "12345678901" },
  { name: "Mrs. Folake Adeyemo", nin: "98765432101" },
];

const bankDetails: MockBankDetails = {
  bankName: "First Bank of Nigeria",
  accountNumber: "3012345678",
  accountName: "Grand Lekki Hotel Ltd",
};

const activeFacilities: HotelFacility[] = [
  "swimming_pool",
  "restaurant",
  "bar",
  "laundry",
  "parking",
  "wifi",
];

const categoryLabels: Record<HotelCategory, string> = {
  budget: "Budget",
  standard: "Standard",
  premium: "Premium",
  luxury: "Luxury",
};

export default function HotelSettingsPage() {
  const [facilities, setFacilities] = useState<HotelFacility[]>(activeFacilities);

  function toggleFacility(facility: HotelFacility) {
    setFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Hotel Settings</h2>
        <p className="mt-1 text-sm text-muted">
          Update hotel profile, images, facilities, and regulatory documents.
        </p>
      </div>

      {/* Hotel Info */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">Hotel Information</h3>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted uppercase">Name</dt>
            <dd className="mt-1 text-sm font-medium text-brand-ink">{hotelInfo.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted uppercase">Category</dt>
            <dd className="mt-1 text-sm font-medium text-brand-ink">{categoryLabels[hotelInfo.category]}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs text-muted uppercase">Address</dt>
            <dd className="mt-1 text-sm font-medium text-brand-ink">{hotelInfo.address}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted uppercase">Phone</dt>
            <dd className="mt-1 text-sm font-medium text-brand-ink">{hotelInfo.phone}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted uppercase">Email</dt>
            <dd className="mt-1 text-sm font-medium text-brand-ink">{hotelInfo.email}</dd>
          </div>
        </dl>
      </div>

      {/* Directors */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">Directors</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Name</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">NIN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {directors.map((d) => (
                <tr key={d.nin}>
                  <td className="py-3 font-medium text-brand-ink">{d.name}</td>
                  <td className="py-3 text-muted">{d.nin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Facilities */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">Facilities</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {HOTEL_FACILITIES.map((f) => (
            <label
              key={f.value}
              className="flex items-center gap-2 text-sm text-brand-ink cursor-pointer"
            >
              <input
                type="checkbox"
                checked={facilities.includes(f.value)}
                onChange={() => toggleFacility(f.value)}
                className="h-4 w-4 rounded border-border text-brand-green accent-brand-green"
              />
              {f.label}
            </label>
          ))}
        </div>
      </div>

      {/* Bank Details */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">Bank Details</h3>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted uppercase">Bank Name</dt>
            <dd className="mt-1 text-sm font-medium text-brand-ink">{bankDetails.bankName}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted uppercase">Account Number</dt>
            <dd className="mt-1 text-sm font-medium text-brand-ink">{bankDetails.accountNumber}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted uppercase">Account Name</dt>
            <dd className="mt-1 text-sm font-medium text-brand-ink">{bankDetails.accountName}</dd>
          </div>
        </dl>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
