import Button from "@/components/ui/Button";

interface BlacklistEntry {
  id: string;
  name: string;
  tourismId: string;
  reason: string;
  dateBlacklisted: string;
}

const mockBlacklist: BlacklistEntry[] = [
  { id: "BL-001", name: "Emeka Okafor", tourismId: "NTD-2025-08122", reason: "Repeated fraudulent bookings and chargebacks", dateBlacklisted: "2026-03-15" },
  { id: "BL-002", name: "Grace Adebayo", tourismId: "NTD-2025-07654", reason: "Property damage at multiple hotels; unresolved claims", dateBlacklisted: "2026-02-28" },
  { id: "BL-003", name: "Michael Ibe", tourismId: "NTD-2025-09410", reason: "Identity fraud — used forged documentation", dateBlacklisted: "2026-04-10" },
  { id: "BL-004", name: "Blessing Nnamdi", tourismId: "NTD-2026-00045", reason: "Violent conduct towards hotel staff; police report filed", dateBlacklisted: "2026-05-01" },
];

export default function BlacklistPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-brand-ink">Blacklist</h2>
          <p className="mt-1 text-sm text-muted">
            View and manage blacklisted individuals.
          </p>
        </div>
        <Button size="sm">Add to Blacklist</Button>
      </div>

      {/* Warning Banner */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Important:</strong> Blacklisted individuals are permanently
        barred from booking any hotel on the platform. This action is logged,
        audited, and shared with all registered hotels. Ensure all due process
        has been followed before adding or removing entries.
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4">
                Name
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4 hidden md:table-cell">
                Tourism ID
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4 hidden md:table-cell">
                Reason
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4 hidden lg:table-cell">
                Date Blacklisted
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockBlacklist.map((entry) => (
              <tr key={entry.id}>
                <td className="px-4 py-3 font-medium text-brand-ink">
                  {entry.name}
                  <span className="block text-xs text-muted md:hidden">
                    {entry.tourismId}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">{entry.tourismId}</td>
                <td className="px-4 py-3 hidden md:table-cell max-w-xs">
                  <span className="line-clamp-2">{entry.reason}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">{entry.dateBlacklisted}</td>
                <td className="px-4 py-3">
                  <Button size="sm" variant="ghost" className="text-xs !h-7 !px-2.5 text-red-600 hover:bg-red-50">
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
