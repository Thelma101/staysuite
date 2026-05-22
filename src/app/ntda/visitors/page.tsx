"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";

type VisitorStatus = "Active" | "Checked Out" | "Pending";

type Visitor = {
  id: string;
  name: string;
  country: string;
  tourismId: string;
  checkIn: string;
  status: VisitorStatus;
};

const VISITORS: Visitor[] = [
  { id: "1", name: "James Williams", country: "United Kingdom", tourismId: "NTD-2024-0891", checkIn: "2024-03-15", status: "Active" },
  { id: "2", name: "Marie Dupont", country: "France", tourismId: "NTD-2024-0892", checkIn: "2024-03-14", status: "Checked Out" },
  { id: "3", name: "Chen Wei", country: "China", tourismId: "NTD-2024-0893", checkIn: "2024-03-13", status: "Active" },
  { id: "4", name: "Sarah Johnson", country: "United States", tourismId: "NTD-2024-0894", checkIn: "2024-03-12", status: "Pending" },
];

const statusBadge: Record<VisitorStatus, string> = {
  Active: "bg-green-50 text-green-700",
  "Checked Out": "bg-gray-100 text-gray-700",
  Pending: "bg-amber-50 text-amber-700",
};

export default function NtdaVisitorsPage() {
  const [search, setSearch] = useState("");

  const filtered = VISITORS.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-brand-ink">Visitors</h1>
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search visitors…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-[#f4f8f6]">
              <th className="px-5 py-3 font-semibold text-muted">Name</th>
              <th className="px-5 py-3 font-semibold text-muted">Country</th>
              <th className="px-5 py-3 font-semibold text-muted">Tourism ID</th>
              <th className="px-5 py-3 font-semibold text-muted">Check-in Date</th>
              <th className="px-5 py-3 font-semibold text-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((visitor) => (
              <tr key={visitor.id} className="border-b border-border last:border-0">
                <td className="px-5 py-4 font-medium text-brand-ink">{visitor.name}</td>
                <td className="px-5 py-4 text-muted">{visitor.country}</td>
                <td className="px-5 py-4 font-mono text-xs text-muted">{visitor.tourismId}</td>
                <td className="px-5 py-4 text-muted">{visitor.checkIn}</td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusBadge[visitor.status],
                    )}
                  >
                    {visitor.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
