import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FigIcon from "@/components/ui/FigIcon";

interface NearbyHotel {
  id: string;
  name: string;
  distance: string;
  rating: number;
  pricePerNight: number;
}

const MOCK_NEARBY: NearbyHotel[] = [
  {
    id: "nh-001",
    name: "Grand Luxe Hotel & Suites",
    distance: "0.8 km",
    rating: 4.8,
    pricePerNight: 75000,
  },
  {
    id: "nh-002",
    name: "Seaside Inn Lagos",
    distance: "1.2 km",
    rating: 4.2,
    pricePerNight: 25000,
  },
  {
    id: "nh-003",
    name: "City View Hotel",
    distance: "2.5 km",
    rating: 4.0,
    pricePerNight: 32000,
  },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i < full ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-muted">{rating}</span>
    </div>
  );
}

export default function NearbyPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">
          Nearby Hotels
        </h2>
        <p className="mt-1 text-sm text-muted">
          Discover hotels close to your current location.
        </p>
      </div>

      <div className="flex h-[220px] flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-white">
        <FigIcon src="/figma/icons/location.svg" size={32} />
        <p className="text-sm text-muted">Map loading...</p>
        <p className="text-xs text-muted">
          GPS permission is required to show nearby hotels
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_NEARBY.map((hotel) => (
          <Card
            key={hotel.id}
            className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between md:p-5"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold text-brand-ink">
                {hotel.name}
              </h3>
              <StarRating rating={hotel.rating} />
              <p className="text-xs text-muted">
                {hotel.distance} away &middot;{" "}
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 0,
                }).format(hotel.pricePerNight)}
                /night
              </p>
            </div>
            <Button as="link" href={`/user/search?hotel=${hotel.id}`} variant="primary" size="sm">
              View
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
