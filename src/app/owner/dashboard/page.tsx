import FigIcon from "@/components/ui/FigIcon";

const submittedDetails = [
  { field: "Hotel Name", status: "verified", note: "Verified" },
  { field: "Regulatory Approval", status: "review", note: "Under review" },
  { field: "Address Proof", status: "review", note: "Under review" },
  { field: "Director NIN", status: "review", note: "Under review" },
];

export default function OwnerDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Registration Status</h2>
        <p className="mt-1 text-sm text-muted">
          Track the approval status of your hotel registration submission.
        </p>
      </div>

      <div
        role="alert"
        className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
      >
        <span className="inline-flex size-2 shrink-0 rounded-full bg-amber-500" />
        <span className="font-semibold">Status: Pending Approval</span>
      </div>

      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">Submitted Details</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">
                  Field
                </th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {submittedDetails.map((row) => (
                <tr key={row.field}>
                  <td className="py-3 font-medium text-brand-ink">{row.field}</td>
                  <td className="py-3">
                    {row.status === "verified" ? (
                      <span className="inline-flex items-center gap-2 text-brand-green">
                        <FigIcon src="/figma/icons/checkmark-circle.svg" size={20} alt="Verified" />
                        {row.note}
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600">
                        {row.note}
                      </span>
                    )}
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
