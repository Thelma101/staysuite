"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import SlidePanel from "@/components/ui/SlidePanel";
import { cn } from "@/lib/utils";
import { fetchHotels, type HotelRecord } from "@/lib/api/ntda";

const statusBadge: Record<HotelRecord["status"], string> = {
  Approved: "bg-green-50 text-green-700",
  Pending: "bg-amber-50 text-amber-700",
  Blocked: "bg-red-50 text-red-700",
};

export default function NtdaHotelsPage() {
  const [hotels, setHotels] = useState<HotelRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<HotelRecord | null>(null);

  useEffect(() => {
    fetchHotels()
      .then(setHotels)
      .finally(() => setLoading(false));
  }, []);

  const filtered = hotels.filter((h) =>
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
            {loading ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  Loading hotels…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  No hotels found.
                </td>
              </tr>
            ) : (
              filtered.map((hotel) => (
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
                      onClick={() => setSelected(hotel)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <SlidePanel open={!!selected} onClose={() => setSelected(null)} title="Hotel Details">
        {selected && (
          <dl className="flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-muted">Hotel Name</dt>
              <dd className="font-medium text-brand-ink">{selected.name}</dd>
            </div>
            <div>
              <dt className="text-muted">Category</dt>
              <dd>{selected.category}</dd>
            </div>
            <div>
              <dt className="text-muted">Location</dt>
              <dd>{selected.location}</dd>
            </div>
            <div>
              <dt className="text-muted">Status</dt>
              <dd>{selected.status}</dd>
            </div>
            {selected.email && (
              <div>
                <dt className="text-muted">Email</dt>
                <dd>{selected.email}</dd>
              </div>
            )}
            {selected.phone && (
              <div>
                <dt className="text-muted">Phone</dt>
                <dd>{selected.phone}</dd>
              </div>
            )}
            {selected.directors && (
              <div>
                <dt className="text-muted">Directors</dt>
                <dd>{selected.directors}</dd>
              </div>
            )}
          </dl>
        )}
      </SlidePanel>
    </div>
  );
}
