"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import SlidePanel from "@/components/ui/SlidePanel";
import { cn } from "@/lib/utils";

type SentMessage = {
  id: string;
  subject: string;
  recipient: string;
  date: string;
  status: "Delivered" | "Pending";
};

const SENT_MESSAGES: SentMessage[] = [
  { id: "1", subject: "Annual Compliance Reminder", recipient: "All Hotels", date: "2024-03-10", status: "Delivered" },
  { id: "2", subject: "New Tourism Tax Policy Update", recipient: "5-Star Hotels", date: "2024-03-08", status: "Delivered" },
  { id: "3", subject: "Safety Inspection Schedule Q2", recipient: "Lagos Hotels", date: "2024-03-05", status: "Delivered" },
  { id: "4", subject: "Tourism Summit 2024 Invitation", recipient: "All Hotels", date: "2024-03-01", status: "Pending" },
];

const recipientOptions = [
  { value: "all", label: "All Hotels" },
  { value: "5star", label: "5-Star Hotels" },
  { value: "4star", label: "4-Star Hotels" },
  { value: "lagos", label: "Lagos Hotels" },
  { value: "abuja", label: "Abuja Hotels" },
];

export default function NtdaBroadcastPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(SENT_MESSAGES);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !subject.trim() || !message.trim()) return;
    const label = recipientOptions.find((r) => r.value === recipient)?.label ?? recipient;
    setSent((prev) => [
      { id: String(Date.now()), subject, recipient: label, date: new Date().toISOString().slice(0, 10), status: "Pending" },
      ...prev.slice(0, 3),
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
            <Input id="bc-subject" placeholder="Enter message subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
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
            </tr>
          </thead>
          <tbody>
            {sent.slice(0, 4).map((msg) => (
              <tr key={msg.id} className="border-b border-border last:border-0">
                <td className="px-5 py-4 font-medium text-brand-ink">{msg.subject}</td>
                <td className="px-5 py-4 text-muted">{msg.recipient}</td>
                <td className="px-5 py-4 text-muted">{msg.date}</td>
                <td className="px-5 py-4">
                  <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", msg.status === "Delivered" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700")}>
                    {msg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SlidePanel open={successOpen} onClose={() => setSuccessOpen(false)} title="Broadcast Sent">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-2xl text-[#188b5c]">✓</div>
          <p className="text-sm text-muted">Your broadcast message has been queued for delivery.</p>
          <Button type="button" fullWidth className="bg-[#188b5c] hover:bg-[#14704a]" onClick={() => setSuccessOpen(false)}>
            Done
          </Button>
        </div>
      </SlidePanel>
    </div>
  );
}
