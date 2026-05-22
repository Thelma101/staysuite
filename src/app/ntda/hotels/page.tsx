"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";

type HotelStatus = "Approved" | "Pending" | "Blocked";

type Hotel = {
  id: string;
  name: string;
  category: string;
  location: string;
  status: HotelStatus;
};

const HOTELS: Hotel[] = [
  { id: "1", name: "Grand Palace Hotel", category: "5-Star", location: "Lagos, Nigeria", status: "Approved" },
  { id: "2", name: "Sunset Resort & Spa", category: "4-Star", location: "Abuja, Nigeria", status: "Pending" },
  { id: "3", name: "Ocean View Suites", category: "3-Star", location: "Port Harcourt, Nigeria", status: "Approved" },
  { id: "4", name: "Safari Lodge", category: "Boutique", location: "Calabar, Nigeria", status: "Blocked" },
];

const statusBadge: Record<HotelStatus, string> = {
  Approved: "bg-green-50 text-green-700",
  Pending: "bg-amber-50 text-amber-700",
  Blocked: "bg-red-50 text-red-700",
};

export default function NtdaHotelsPage() {
  const [search, setSearch] = useState("");

  const filtered = HOTELS.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-brand-ink">Hotels</h1>
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search hotels…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-[#f4f8f6]">
              <th className="px-5 py-3 font-semibold text-muted">Hotel Name</th>
              <th className="px-5 py-3 font-semibold text-muted">Category</th>
              <th className="px-5 py-3 font-semibold text-muted">Location</th>
              <th className="px-5 py-3 font-semibold text-muted">Status</th>
              <th className="px-5 py-3 font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((hotel) => (
              <tr key={hotel.id} className="border-b border-border last:border-0">
                <td className="px-5 py-4 font-medium text-brand-ink">{hotel.name}</td>
                <td className="px-5 py-4 text-muted">{hotel.category}</td>
                <td className="px-5 py-4 text-muted">{hotel.location}</td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusBadge[hotel.status],
                    )}
                  >
                    {hotel.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    className="text-sm font-medium text-[#188b5c] hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
