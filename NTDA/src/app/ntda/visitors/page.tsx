"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import SlidePanel from "@/components/ui/SlidePanel";
import { cn } from "@/lib/utils";
import { fetchVisitors, type VisitorRecord } from "@/lib/api/ntda";
import { validateRequired } from "@/lib/validation";

const statusBadge: Record<VisitorRecord["status"], string> = {
  Active: "bg-green-50 text-green-700",
  "Checked Out": "bg-gray-100 text-gray-700",
  Pending: "bg-amber-50 text-amber-700",
};

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Checked Out", label: "Checked Out" },
  { value: "Pending", label: "Pending" },
];

export default function NtdaVisitorsPage() {
  const [visitors, setVisitors] = useState<VisitorRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<VisitorRecord | null>(null);
  const [editTarget, setEditTarget] = useState<VisitorRecord | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    country: "",
    status: "Active" as VisitorRecord["status"],
  });

  useEffect(() => {
    fetchVisitors()
      .then(setVisitors)
      .finally(() => setLoading(false));
  }, []);

  const filtered = visitors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()),
  );

  const openEdit = (visitor: VisitorRecord) => {
    setEditTarget(visitor);
    setEditForm({ name: visitor.name, country: visitor.country, status: visitor.status });
    setFormError(null);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    const nameCheck = validateRequired(editForm.name, "Name");
    const countryCheck = validateRequired(editForm.country, "Country");
    if (!nameCheck.ok) {
      setFormError(nameCheck.message);
      return;
    }
    if (!countryCheck.ok) {
      setFormError(countryCheck.message);
      return;
    }
    setVisitors((prev) =>
      prev.map((v) =>
        v.id === editTarget.id
          ? { ...v, name: editForm.name.trim(), country: editForm.country.trim(), status: editForm.status }
          : v,
      ),
    );
    setEditTarget(null);
  };

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
              <th className="px-5 py-3 font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-muted">
                  Loading visitors…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-muted">
                  No visitors found.
                </td>
              </tr>
            ) : (
              filtered.map((visitor) => (
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
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="text-sm font-medium text-[#188b5c] hover:underline"
                        onClick={() => setDetail(visitor)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="text-sm font-medium text-muted hover:underline"
                        onClick={() => openEdit(visitor)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <SlidePanel open={!!detail} onClose={() => setDetail(null)} title="Visitor Profile">
        {detail && (
          <dl className="flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-muted">Name</dt>
              <dd className="font-medium text-brand-ink">{detail.name}</dd>
            </div>
            <div>
              <dt className="text-muted">Country</dt>
              <dd>{detail.country}</dd>
            </div>
            <div>
              <dt className="text-muted">Tourism ID</dt>
              <dd className="font-mono">{detail.tourismId}</dd>
            </div>
            <div>
              <dt className="text-muted">Check-in</dt>
              <dd>{detail.checkIn}</dd>
            </div>
            <div>
              <dt className="text-muted">Status</dt>
              <dd>{detail.status}</dd>
            </div>
            {detail.email && (
              <div>
                <dt className="text-muted">Email</dt>
                <dd>{detail.email}</dd>
              </div>
            )}
            {detail.passport && (
              <div>
                <dt className="text-muted">Passport</dt>
                <dd>{detail.passport}</dd>
              </div>
            )}
          </dl>
        )}
      </SlidePanel>

      <SlidePanel open={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Visitor">
        <form onSubmit={saveEdit} className="flex flex-col gap-4">
          {formError && (
            <p className="text-sm text-red-600" role="alert">
              {formError}
            </p>
          )}
          <Field label="Name" htmlFor="v-name" required>
            <Input
              id="v-name"
              value={editForm.name}
              onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
            />
          </Field>
          <Field label="Country" htmlFor="v-country" required>
            <Input
              id="v-country"
              value={editForm.country}
              onChange={(e) => setEditForm((f) => ({ ...f, country: e.target.value }))}
            />
          </Field>
          <Field label="Status" htmlFor="v-status">
            <Select
              id="v-status"
              options={statusOptions}
              value={editForm.status}
              onChange={(e) =>
                setEditForm((f) => ({
                  ...f,
                  status: e.target.value as VisitorRecord["status"],
                }))
              }
            />
          </Field>
          <Button type="submit" fullWidth className="bg-[#188b5c] hover:bg-[#14704a]">
            Save Changes
          </Button>
        </form>
      </SlidePanel>
    </div>
  );
}
