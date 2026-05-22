import Button from "@/components/ui/Button";

interface MockRoom {
  id: string;
  number: string;
  type: string;
  price: number;
  isAvailable: boolean;
}

const rooms: MockRoom[] = [
  { id: "r1", number: "101", type: "Standard Single", price: 15000, isAvailable: true },
  { id: "r2", number: "102", type: "Standard Double", price: 22000, isAvailable: true },
  { id: "r3", number: "112", type: "Deluxe Double", price: 35000, isAvailable: false },
  { id: "r4", number: "204", type: "Standard Single", price: 15000, isAvailable: false },
  { id: "r5", number: "210", type: "Suite", price: 60000, isAvailable: true },
];

function formatNaira(amount: number) {
  return "\u20A6 " + amount.toLocaleString();
}

export default function OwnerRoomsPage() {
  const rows = rooms.slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-brand-ink">Rooms</h2>
          <p className="mt-1 text-sm text-muted">
            Manage room inventory, pricing, and availability.
          </p>
        </div>
        <Button size="sm">Add Room</Button>
      </div>

      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Room</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Type</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Price / Night</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((room) => (
                <tr key={room.id}>
                  <td className="py-3 font-medium text-brand-ink">Room {room.number}</td>
                  <td className="py-3 text-muted">{room.type}</td>
                  <td className="py-3 font-medium text-brand-ink">{formatNaira(room.price)}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        room.isAvailable
                          ? "bg-brand-green/10 text-brand-green"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      {room.isAvailable ? "Available" : "Occupied"}
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
