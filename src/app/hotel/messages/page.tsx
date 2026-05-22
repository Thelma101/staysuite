"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface MockConversation {
  id: string;
  guestName: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const conversations: MockConversation[] = [
  { id: "c1", guestName: "Adebayo Ogunlesi", lastMessage: "Thank you, I'll check in by 3 PM.", time: "10:30 AM", unread: 2 },
  { id: "c2", guestName: "Ngozi Okonkwo", lastMessage: "Is there parking available?", time: "9:15 AM", unread: 1 },
  { id: "c3", guestName: "Emeka Eze", lastMessage: "Room service was excellent!", time: "Yesterday", unread: 0 },
  { id: "c4", guestName: "Fatima Bello", lastMessage: "Can I extend my stay by 2 nights?", time: "Yesterday", unread: 0 },
];

export default function HotelMessagesPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Messages</h2>
        <p className="mt-1 text-sm text-muted">
          Receive and respond to messages from guests and admin.
        </p>
      </div>

      <div className="grid min-h-[500px] grid-cols-1 overflow-hidden rounded-lg border border-border bg-white md:grid-cols-3">
        {/* Conversation List */}
        <div className="border-b border-border md:border-b-0 md:border-r md:col-span-1">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-brand-ink">Conversations</p>
          </div>
          <ul className="divide-y divide-border">
            {conversations.map((conv) => (
              <li key={conv.id}>
                <button
                  type="button"
                  onClick={() => setSelected(conv.id)}
                  className={cn(
                    "w-full px-4 py-3 text-left transition hover:bg-surface-subtle",
                    selected === conv.id && "bg-surface-subtle"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-brand-ink">{conv.guestName}</p>
                    <span className="text-xs text-muted">{conv.time}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="truncate text-xs text-muted">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-white">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Message Pane */}
        <div className="flex items-center justify-center md:col-span-2">
          {selected ? (
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <p className="text-sm font-medium text-brand-ink">
                {conversations.find((c) => c.id === selected)?.guestName}
              </p>
              <p className="text-sm text-muted">
                Message thread will appear here once backend integration is complete.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted">Select a conversation to view messages</p>
          )}
        </div>
      </div>
    </div>
  );
}
