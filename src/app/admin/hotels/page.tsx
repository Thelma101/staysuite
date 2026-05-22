"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { HOTEL_CATEGORIES } from "@/lib/constants";

type HotelStatus = "approved" | "pending" | "blocked";

interface MockHotel {
  id: string;
  name: string;
  category: string;
  location: string;
  directors: string;
  status: HotelStatus;
}

const mockHotels: MockHotel[] = [
  { id: "H-001", name: "Transcorp Hilton Abuja", category: "Luxury", location: "FCT - Abuja", directors: "Chief Obi Nwosu", status: "approved" },
  { id: "H-002", name: "Eko Hotels & Suites", category: "Premium", location: "Lagos", directors: "Mrs. Folake Adeyemi", status: "approved" },
  { id: "H-003", name: "Prestige Hotel Calabar", category: "Standard", location: "Cross River", directors: "Mr. Effiom Bassey", status: "pending" },
  { id: "H-004", name: "De-Loss Hotel Enugu", category: "Budget", location: "Enugu", directors: "Mr. Chidi Okonkwo", status: "approved" },
  { id: "H-005", name: "Grand Ibro Hotel Abuja", category: "Premium", location: "FCT - Abuja", directors: "Alhaji Ibrahim Musa", status: "pending" },
  { id: "H-006", name: "Sunset Beach Resort", category: "Luxury", location: "Lagos", directors: "Dr. Bola Tinubu-Smith", status: "blocked" },
];

const statusStyles: Record<HotelStatus, string> = {
  approved: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  blocked: "bg-red-50 text-red-700",
};

export default function ManageHotelsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = mockHotels.filter((h) => {
    const matchesSearch =
      !search || h.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || h.category.toLowerCase() === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Hotels</h2>
        <p className="mt-1 text-sm text-muted">
          Review, approve, or block hotels on the platform.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <Input
            placeholder="Search hotels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select
            options={HOTEL_CATEGORIES}
            placeholder="All Categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4">
                Hotel Name
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4 hidden md:table-cell">
                Category
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4 hidden md:table-cell">
                Location
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4 hidden lg:table-cell">
                Directors
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4">
                Status
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((hotel) => (
              <tr key={hotel.id}>
                <td className="px-4 py-3 font-medium text-brand-ink">
                  {hotel.name}
                  <span className="block text-xs text-muted md:hidden">
                    {hotel.category} · {hotel.location}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">{hotel.category}</td>
                <td className="px-4 py-3 hidden md:table-cell">{hotel.location}</td>
                <td className="px-4 py-3 hidden lg:table-cell">{hotel.directors}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[hotel.status]}`}
                  >
                    {hotel.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {hotel.status !== "approved" && (
                      <Button size="sm" variant="primary" className="text-xs !h-7 !px-2.5">
                        Approve
                      </Button>
                    )}
                    {hotel.status !== "blocked" && (
                      <Button size="sm" variant="ghost" className="text-xs !h-7 !px-2.5 text-red-600 hover:bg-red-50">
                        Block
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-xs !h-7 !px-2.5">
                      View
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No hotels found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
