"use client";

import Button from "@/components/ui/Button";

interface CurrentVisitor {
  id: string;
  name: string;
  room: string;
  checkedInAt: string;
}

interface HistoricalVisitor {
  id: string;
  name: string;
  room: string;
  checkIn: string;
  checkOut: string;
}

const currentVisitors: CurrentVisitor[] = [
  { id: "v1", name: "Adebayo Ogunlesi", room: "Room 204", checkedInAt: "10:30 AM, May 20" },
  { id: "v2", name: "Fatima Bello", room: "Room 101", checkedInAt: "2:15 PM, May 19" },
  { id: "v3", name: "Chukwuma Ibe", room: "Room 305", checkedInAt: "9:00 AM, May 21" },
];

const visitorHistory: HistoricalVisitor[] = [
  { id: "h1", name: "Ngozi Okonkwo", room: "Room 112", checkIn: "May 15, 2026", checkOut: "May 18, 2026" },
  { id: "h2", name: "Emeka Eze", room: "Room 210", checkIn: "May 12, 2026", checkOut: "May 16, 2026" },
  { id: "h3", name: "Aisha Mohammed", room: "Room 402", checkIn: "May 10, 2026", checkOut: "May 14, 2026" },
  { id: "h4", name: "Oluwaseun Adeyemi", room: "Room 101", checkIn: "May 8, 2026", checkOut: "May 11, 2026" },
  { id: "h5", name: "Chinwe Okoro", room: "Room 305", checkIn: "May 5, 2026", checkOut: "May 9, 2026" },
];

export default function VisitorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Visitors</h2>
        <p className="mt-1 text-sm text-muted">
          Sign visitors in and out, view visitor details and history.
        </p>
      </div>

      {/* Current Visitors */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">Current Visitors</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Name</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Room</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Checked In</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentVisitors.map((v) => (
                <tr key={v.id}>
                  <td className="py-3 font-medium text-brand-ink whitespace-nowrap">{v.name}</td>
                  <td className="py-3 text-muted">{v.room}</td>
                  <td className="py-3 text-muted whitespace-nowrap">{v.checkedInAt}</td>
                  <td className="py-3">
                    <Button size="sm" variant="ghost" className="h-8 px-3 text-xs text-red-600">
                      Sign Out
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visitor History */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <h3 className="text-lg font-semibold text-brand-ink">Visitor History</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Name</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Room</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Check-in</th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3">Check-out</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visitorHistory.map((v) => (
                <tr key={v.id}>
                  <td className="py-3 font-medium text-brand-ink whitespace-nowrap">{v.name}</td>
                  <td className="py-3 text-muted">{v.room}</td>
                  <td className="py-3 text-muted whitespace-nowrap">{v.checkIn}</td>
                  <td className="py-3 text-muted whitespace-nowrap">{v.checkOut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
