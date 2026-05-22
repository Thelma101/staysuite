interface MockGuest {
  id: string;
  name: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: "checked_in" | "checked_out" | "upcoming";
}

const guests: MockGuest[] = [
  { id: "g1", name: "Adebayo Ogunlesi", room: "Room 204", checkIn: "May 20, 2026", checkOut: "May 23, 2026", status: "checked_in" },
  { id: "g2", name: "Ngozi Okonkwo", room: "Room 112", checkIn: "May 21, 2026", checkOut: "May 25, 2026", status: "upcoming" },
  { id: "g3", name: "Emeka Eze", room: "Room 305", checkIn: "May 22, 2026", checkOut: "May 24, 2026", status: "upcoming" },
  { id: "g4", name: "Fatima Bello", room: "Room 101", checkIn: "May 18, 2026", checkOut: "May 21, 2026", status: "checked_out" },
  { id: "g5", name: "Chinedu Nwankwo", room: "Room 210", checkIn: "May 15, 2026", checkOut: "May 19, 2026", status: "checked_out" },
];

const statusColors: Record<MockGuest["status"], string> = {
  checked_in: "bg-brand-green/10 text-brand-green",
  checked_out: "bg-muted/10 text-muted",
  upcoming: "bg-brand-blue/10 text-brand-blue",
};

const statusLabels: Record<MockGuest["status"], string> = {
  checked_in: "Checked In",
  checked_out: "Checked Out",
  upcoming: "Upcoming",
};

export default function OwnerGuestsPage() {
  const rows = guests.slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Guests</h2>
        <p className="mt-1 text-sm text-muted">
          View current and upcoming guests at your hotel.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Name</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Room</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Check-in</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Check-out</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((g) => (
                <tr key={g.id}>
                  <td className="whitespace-nowrap py-3 font-medium text-brand-ink">{g.name}</td>
                  <td className="py-3 text-muted">{g.room}</td>
                  <td className="whitespace-nowrap py-3 text-muted">{g.checkIn}</td>
                  <td className="whitespace-nowrap py-3 text-muted">{g.checkOut}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[g.status]}`}>
                      {statusLabels[g.status]}
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
