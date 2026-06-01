"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import SlidePanel from "@/components/ui/SlidePanel";
import { fetchApprovals, type ApprovalRecord } from "@/lib/api/ntda";

type ConfirmAction = "approve" | "reject" | null;

export default function NtdaApprovalsPage() {
  const [items, setItems] = useState<ApprovalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<ApprovalRecord | null>(null);
  const [selected, setSelected] = useState<ApprovalRecord | null>(null);
  const [action, setAction] = useState<ConfirmAction>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchApprovals()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const handleConfirm = () => {
    if (!selected || !action) return;
    setItems((prev) => prev.filter((item) => item.id !== selected.id));
    setSuccessMessage(
      action === "approve"
        ? `${selected.hotelName} has been approved.`
        : `${selected.hotelName} has been rejected.`,
    );
    setSelected(null);
    setAction(null);
    setDetail(null);
    setSuccessOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-brand-ink">Pending Hotel Approvals</h1>
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {items.length}
        </span>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading approvals…</p>
      ) : items.length === 0 ? (
        <p className="rounded-[12px] border border-border bg-white px-5 py-8 text-center text-sm text-muted">
          No pending hotel approvals.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-[12px] border border-border bg-white p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  className="space-y-1 text-left"
                  onClick={() => setDetail(item)}
                >
                  <h3 className="text-base font-semibold text-brand-ink hover:text-[#188b5c]">
                    {item.hotelName}
                  </h3>
                  <p className="text-sm text-muted">
                    {item.owner} · {item.category} · {item.location}
                  </p>
                  <p className="text-xs text-muted">Submitted: {item.submittedDate}</p>
                </button>
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="bg-[#188b5c] hover:bg-[#14704a]"
                    onClick={() => {
                      setSelected(item);
                      setAction("approve");
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="border border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setSelected(item);
                      setAction("reject");
                    }}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <SlidePanel open={!!detail} onClose={() => setDetail(null)} title="Application Details">
        {detail && (
          <dl className="flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-muted">Hotel</dt>
              <dd className="font-medium text-brand-ink">{detail.hotelName}</dd>
            </div>
            <div>
              <dt className="text-muted">Owner</dt>
              <dd>{detail.owner}</dd>
            </div>
            <div>
              <dt className="text-muted">Category</dt>
              <dd>{detail.category}</dd>
            </div>
            <div>
              <dt className="text-muted">Location</dt>
              <dd>{detail.location}</dd>
            </div>
            <div>
              <dt className="text-muted">Submitted</dt>
              <dd>{detail.submittedDate}</dd>
            </div>
          </dl>
        )}
      </SlidePanel>

      <SlidePanel
        open={!!selected && !!action}
        onClose={() => {
          setSelected(null);
          setAction(null);
        }}
        title={action === "approve" ? "Confirm Approval" : "Confirm Rejection"}
      >
        {selected && (
          <div className="flex flex-col gap-6">
            <p className="text-sm text-muted">
              {action === "approve"
                ? `Approve ${selected.hotelName} for registration on the platform?`
                : `Reject the registration request from ${selected.hotelName}?`}
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                fullWidth
                className={
                  action === "approve" ? "bg-[#188b5c] hover:bg-[#14704a]" : "bg-red-500 hover:bg-red-600"
                }
                onClick={handleConfirm}
              >
                Confirm
              </Button>
              <Button
                type="button"
                fullWidth
                variant="ghost"
                onClick={() => {
                  setSelected(null);
                  setAction(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </SlidePanel>

      <SlidePanel open={successOpen} onClose={() => setSuccessOpen(false)} title="Action Complete">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-2xl text-[#188b5c]">
            ✓
          </div>
          <p className="text-sm text-muted">{successMessage}</p>
          <Button
            type="button"
            fullWidth
            className="bg-[#188b5c] hover:bg-[#14704a]"
            onClick={() => setSuccessOpen(false)}
          >
            Done
          </Button>
        </div>
      </SlidePanel>
    </div>
  );
}
