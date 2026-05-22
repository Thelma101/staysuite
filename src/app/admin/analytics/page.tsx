const stats = [
  { label: "Total Tourists", value: "48,219" },
  { label: "Nigerian Registrations", value: "31,042" },
  { label: "Foreign Registrations", value: "17,177" },
  { label: "Hotel Compliance Rate", value: "94.2%" },
];

const breakdownData = [
  { country: "Nigeria", visitors: "31,042", percentage: "64.4%" },
  { country: "United States", visitors: "4,118", percentage: "8.5%" },
  { country: "United Kingdom", visitors: "3,206", percentage: "6.6%" },
  { country: "Germany", visitors: "2,411", percentage: "5.0%" },
  { country: "France", visitors: "1,929", percentage: "4.0%" },
  { country: "South Africa", visitors: "1,687", percentage: "3.5%" },
  { country: "China", visitors: "1,446", percentage: "3.0%" },
  { country: "Others", visitors: "2,380", percentage: "5.0%" },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Analytics</h2>
        <p className="mt-1 text-sm text-muted">
          Detailed analytics and reports as required by NTDA.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-white p-4 md:p-6"
          >
            <p className="text-xs text-muted uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-brand-ink">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-white">
          <div className="text-center">
            <svg
              className="mx-auto h-10 w-10 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path d="M3 3v18h18" />
              <path d="m7 16 4-8 4 4 5-6" />
            </svg>
            <p className="mt-2 text-sm font-medium text-muted">
              Tourist Arrivals (Monthly)
            </p>
          </div>
        </div>
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-white">
          <div className="text-center">
            <svg
              className="mx-auto h-10 w-10 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <rect x="3" y="12" width="4" height="9" rx="1" />
              <rect x="10" y="7" width="4" height="14" rx="1" />
              <rect x="17" y="3" width="4" height="18" rx="1" />
            </svg>
            <p className="mt-2 text-sm font-medium text-muted">
              Revenue by Category
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">
          Visitor Breakdown by Country of Origin
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">
                  Country
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">
                  Visitor Count
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {breakdownData.map((row) => (
                <tr key={row.country}>
                  <td className="py-3 font-medium text-brand-ink">
                    {row.country}
                  </td>
                  <td className="py-3">{row.visitors}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-surface-subtle overflow-hidden">
                        <div
                          className="h-full rounded-full bg-brand-green"
                          style={{ width: row.percentage }}
                        />
                      </div>
                      <span className="text-xs text-muted">
                        {row.percentage}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
