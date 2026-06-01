"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import SlidePanel from "@/components/ui/SlidePanel";
import { cn } from "@/lib/utils";
import { fetchBroadcasts, type BroadcastRecord } from "@/lib/api/ntda";
import { validateRequired } from "@/lib/validation";

const recipientOptions = [
  { value: "all", label: "All Hotels" },
  { value: "5star", label: "5-Star Hotels" },
  { value: "4star", label: "4-Star Hotels" },
  { value: "lagos", label: "Lagos Hotels" },
  { value: "abuja", label: "Abuja Hotels" },
];

export default function NtdaBroadcastPage() {
  const [sent, setSent] = useState<BroadcastRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [preview, setPreview] = useState<BroadcastRecord | null>(null);

  useEffect(() => {
    fetchBroadcasts()
      .then(setSent)
      .finally(() => setLoading(false));
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const recipientCheck = validateRequired(recipient, "Recipient");
    const subjectCheck = validateRequired(subject, "Subject");
    const messageCheck = validateRequired(message, "Message");
    if (!recipientCheck.ok) {
      setFormError(recipientCheck.message);
      return;
    }
    if (!subjectCheck.ok) {
      setFormError(subjectCheck.message);
      return;
    }
    if (!messageCheck.ok) {
      setFormError(messageCheck.message);
      return;
    }
    setFormError(null);
    const label = recipientOptions.find((r) => r.value === recipient)?.label ?? recipient;
    setSent((prev) => [
      {
        id: String(Date.now()),
        subject: subject.trim(),
        recipient: label,
        date: new Date().toISOString().slice(0, 10),
        status: "Pending",
        message: message.trim(),
      },
      ...prev,
    ]);
    setSubject("");
    setMessage("");
    setRecipient("");
    setSuccessOpen(true);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-brand-ink">Broadcast Message</h1>

      <div className="rounded-[12px] border border-border bg-white p-6">
        <h2 className="mb-4 text-base font-semibold text-brand-ink">Compose</h2>
        <form onSubmit={handleSend} className="flex flex-col gap-5">
          {formError && (
            <p className="text-sm text-red-600" role="alert">
              {formError}
            </p>
          )}
          <Field label="Recipient" htmlFor="bc-recipient">
            <Select
              id="bc-recipient"
              options={recipientOptions}
              placeholder="Select recipient group"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </Field>
          <Field label="Subject" htmlFor="bc-subject">
            <Input
              id="bc-subject"
              placeholder="Enter message subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Field>
          <Field label="Message" htmlFor="bc-message">
            <textarea
              id="bc-message"
              rows={4}
              placeholder="Type your message here…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-[6px] border border-border bg-white px-[14px] py-3 text-sm text-brand-ink outline-none placeholder:text-border focus:border-[#188b5c]"
            />
          </Field>
          <div className="flex justify-end">
            <Button type="submit" className="bg-[#188b5c] hover:bg-[#14704a]">
              Send Broadcast
            </Button>
          </div>
        </form>
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-border bg-white">
        <div className="px-5 py-4">
          <h2 className="text-base font-semibold text-brand-ink">Sent Messages</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-[#f4f8f6]">
              <th className="px-5 py-3 font-semibold text-muted">Subject</th>
              <th className="px-5 py-3 font-semibold text-muted">Recipient</th>
              <th className="px-5 py-3 font-semibold text-muted">Date</th>
              <th className="px-5 py-3 font-semibold text-muted">Status</th>
              <th className="px-5 py-3 font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  Loading messages…
                </td>
              </tr>
            ) : sent.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  No broadcasts sent yet.
                </td>
              </tr>
            ) : (
              sent.map((msg) => (
                <tr key={msg.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-medium text-brand-ink">{msg.subject}</td>
                  <td className="px-5 py-4 text-muted">{msg.recipient}</td>
                  <td className="px-5 py-4 text-muted">{msg.date}</td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                        msg.status === "Delivered"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700",
                      )}
                    >
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      className="text-sm font-medium text-[#188b5c] hover:underline"
                      onClick={() => setPreview(msg)}
                    >
                      Preview
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <SlidePanel open={!!preview} onClose={() => setPreview(null)} title="Broadcast Preview">
        {preview && (
          <div className="flex flex-col gap-4 text-sm">
            <div>
              <p className="text-muted">To</p>
              <p className="font-medium text-brand-ink">{preview.recipient}</p>
            </div>
            <div>
              <p className="text-muted">Subject</p>
              <p className="font-medium text-brand-ink">{preview.subject}</p>
            </div>
            <div>
              <p className="text-muted">Date</p>
              <p>{preview.date}</p>
            </div>
            <div>
              <p className="text-muted">Status</p>
              <p>{preview.status}</p>
            </div>
            <div className="rounded-lg border border-border bg-[#f4f8f6] p-4">
              <p className="whitespace-pre-wrap text-brand-ink">
                {preview.message ?? "Message content unavailable."}
              </p>
            </div>
          </div>
        )}
      </SlidePanel>

      <SlidePanel open={successOpen} onClose={() => setSuccessOpen(false)} title="Broadcast Sent">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-2xl text-[#188b5c]">
            ✓
          </div>
          <p className="text-sm text-muted">Your broadcast message has been queued for delivery.</p>
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
