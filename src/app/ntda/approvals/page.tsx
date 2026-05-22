"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import SlidePanel from "@/components/ui/SlidePanel";

type Approval = {
  id: string;
  hotelName: string;
  owner: string;
  category: string;
  location: string;
  submittedDate: string;
};

const APPROVALS: Approval[] = [
  { id: "1", hotelName: "Royal Heritage Hotel", owner: "Adebayo Ogundimu", category: "5-Star", location: "Victoria Island, Lagos", submittedDate: "2024-03-10" },
  { id: "2", hotelName: "Emerald Suites", owner: "Chinedu Eze", category: "4-Star", location: "Wuse, Abuja", submittedDate: "2024-03-11" },
  { id: "3", hotelName: "Tropical Paradise Inn", owner: "Fatima Bello", category: "3-Star", location: "GRA, Benin City", submittedDate: "2024-03-12" },
  { id: "4", hotelName: "Harmony Gardens Resort", owner: "Oluwaseun Akinwale", category: "Boutique", location: "Lekki, Lagos", submittedDate: "2024-03-13" },
];

type ConfirmAction = "approve" | "reject" | null;

export default function NtdaApprovalsPage() {
  const [items, setItems] = useState(APPROVALS);
  const [selected, setSelected] = useState<Approval | null>(null);
  const [action, setAction] = useState<ConfirmAction>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-[12px] border border-border bg-white p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-brand-ink">{item.hotelName}</h3>
                <p className="text-sm text-muted">
                  {item.owner} &middot; {item.category} &middot; {item.location}
                </p>
                <p className="text-xs text-muted">Submitted: {item.submittedDate}</p>
              </div>
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
                className={action === "approve" ? "bg-[#188b5c] hover:bg-[#14704a]" : "bg-red-500 hover:bg-red-600"}
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
          <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-2xl text-[#188b5c]">✓</div>
          <p className="text-sm text-muted">{successMessage}</p>
          <Button type="button" fullWidth className="bg-[#188b5c] hover:bg-[#14704a]" onClick={() => setSuccessOpen(false)}>
            Done
          </Button>
        </div>
      </SlidePanel>
    </div>
  );
}
