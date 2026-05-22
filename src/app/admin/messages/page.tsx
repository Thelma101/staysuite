"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";

type MessageStatus = "delivered" | "pending" | "failed";

interface SentMessage {
  id: string;
  recipient: string;
  preview: string;
  dateSent: string;
  status: MessageStatus;
}

const recipientOptions = [
  { value: "all_hotels", label: "All Hotels" },
  { value: "all_users", label: "All Users" },
  { value: "specific_hotel", label: "Specific Hotel" },
  { value: "specific_user", label: "Specific User" },
];

const mockMessages: SentMessage[] = [
  { id: "M-001", recipient: "All Hotels", preview: "New compliance requirements effective June 1, 2026 — please review updated documentation.", dateSent: "2026-05-20", status: "delivered" },
  { id: "M-002", recipient: "All Users", preview: "Exciting new partner hotels added in Lagos and Abuja. Book now for introductory rates!", dateSent: "2026-05-18", status: "delivered" },
  { id: "M-003", recipient: "Eko Hotels & Suites", preview: "Your annual audit is scheduled for June 15. Please ensure all records are up to date.", dateSent: "2026-05-16", status: "pending" },
  { id: "M-004", recipient: "Amina Bello", preview: "Your account verification has been completed. Welcome to StaySuite!", dateSent: "2026-05-15", status: "failed" },
];

const statusStyles: Record<MessageStatus, string> = {
  delivered: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  failed: "bg-red-50 text-red-700",
};

export default function AdminMessagesPage() {
  const [recipientType, setRecipientType] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Messages</h2>
        <p className="mt-1 text-sm text-muted">
          Send messages to hotels and users across the platform.
        </p>
      </div>

      {/* Compose Section */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">
          Compose Message
        </h3>
        <div className="mt-4 flex flex-col gap-4">
          <div className="w-full md:w-64">
            <label className="mb-1.5 block text-sm font-medium text-brand-ink">
              Recipient
            </label>
            <Select
              options={recipientOptions}
              placeholder="Select recipient type"
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-ink">
              Message
            </label>
            <textarea
              className="w-full rounded-[6px] border border-border bg-white px-[14px] py-3 text-sm text-brand-ink outline-none placeholder:text-border focus:border-brand-green"
              rows={4}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <Button size="sm" disabled={!recipientType || !message.trim()}>
              Send Message
            </Button>
          </div>
        </div>
      </div>

      {/* Sent Messages */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">Sent Messages</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 px-4">
                  Recipient
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 px-4 hidden md:table-cell">
                  Preview
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 px-4 hidden md:table-cell">
                  Date Sent
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 px-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockMessages.map((msg) => (
                <tr key={msg.id}>
                  <td className="px-4 py-3 font-medium text-brand-ink">
                    {msg.recipient}
                    <span className="block text-xs text-muted md:hidden line-clamp-1">
                      {msg.preview}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell max-w-sm">
                    <span className="line-clamp-1">{msg.preview}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell whitespace-nowrap">
                    {msg.dateSent}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[msg.status]}`}
                    >
                      {msg.status}
                    </span>
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
