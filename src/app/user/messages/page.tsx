"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface MockConversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

const MOCK_CONVERSATIONS: MockConversation[] = [
  {
    id: "conv-001",
    name: "Grand Luxe Hotel",
    lastMessage: "Your booking has been confirmed for April 15th.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "conv-002",
    name: "StaySuite Support",
    lastMessage: "How can we help you today?",
    time: "1h ago",
    unread: true,
  },
  {
    id: "conv-003",
    name: "Seaside Inn Lagos",
    lastMessage: "Thank you for your stay! We hope to see you again.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "conv-004",
    name: "Abuja Continental",
    lastMessage: "Your checkout has been processed successfully.",
    time: "3 days ago",
    unread: false,
  },
];

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Messages</h2>
        <p className="mt-1 text-sm text-muted">
          Chat with hotels and StaySuite support.
        </p>
      </div>

      <div className="flex h-[480px] overflow-hidden rounded-lg border border-border bg-white">
        {/* Conversation list */}
        <div
          className={cn(
            "flex w-full flex-col border-r border-border md:w-[320px]",
            selectedId ? "hidden md:flex" : "flex"
          )}
        >
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-medium text-brand-ink">Conversations</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {MOCK_CONVERSATIONS.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => setSelectedId(conv.id)}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition hover:bg-surface-subtle",
                  selectedId === conv.id && "bg-surface-subtle"
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-sm font-semibold text-brand-green">
                  {conv.name.charAt(0)}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-ink truncate">
                      {conv.name}
                    </span>
                    <span className="shrink-0 text-[11px] text-muted">
                      {conv.time}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message area */}
        <div
          className={cn(
            "flex flex-1 flex-col items-center justify-center",
            selectedId ? "flex" : "hidden md:flex"
          )}
        >
          {selectedId ? (
            <div className="flex w-full flex-1 flex-col">
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="text-sm text-brand-green md:hidden"
                >
                  &larr; Back
                </button>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green/10 text-xs font-semibold text-brand-green">
                  {MOCK_CONVERSATIONS.find((c) => c.id === selectedId)?.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-brand-ink">
                  {MOCK_CONVERSATIONS.find((c) => c.id === selectedId)?.name}
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted">
                  Messages will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-subtle">
                <svg
                  className="h-6 w-6 text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted">Select a conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
