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
  { id: "r6", number: "305", type: "Deluxe Single", price: 25000, isAvailable: true },
  { id: "r7", number: "402", type: "Presidential Suite", price: 120000, isAvailable: true },
  { id: "r8", number: "410", type: "Standard Double", price: 22000, isAvailable: false },
];

function formatNaira(amount: number) {
  return "\u20A6 " + amount.toLocaleString();
}

export default function RoomsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-brand-ink">Rooms</h2>
          <p className="mt-1 text-sm text-muted">
            Manage rooms, pricing, and availability.
          </p>
        </div>
        <Button size="sm">Add Room</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex flex-col rounded-lg border border-border bg-white p-4 md:p-5"
          >
            <div className="flex items-start justify-between">
              <p className="text-lg font-semibold text-brand-ink">Room {room.number}</p>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  room.isAvailable
                    ? "bg-brand-green/10 text-brand-green"
                    : "bg-red-500/10 text-red-600"
                }`}
              >
                {room.isAvailable ? "Available" : "Occupied"}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{room.type}</p>
            <p className="mt-3 text-xl font-bold text-brand-ink">
              {formatNaira(room.price)}
              <span className="text-sm font-normal text-muted"> / night</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
