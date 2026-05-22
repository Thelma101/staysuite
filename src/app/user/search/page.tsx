"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FigIcon from "@/components/ui/FigIcon";

const CATEGORY_OPTIONS = [
  { value: "budget", label: "Budget" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Luxury" },
];

const PRICE_OPTIONS = [
  { value: "0-20000", label: "Under ₦20,000" },
  { value: "20000-50000", label: "₦20,000 - ₦50,000" },
  { value: "50000-100000", label: "₦50,000 - ₦100,000" },
  { value: "100000+", label: "Above ₦100,000" },
];

const FACILITIES = [
  "WiFi",
  "Pool",
  "Gym",
  "Spa",
  "Restaurant",
  "Parking",
];

interface MockHotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  category: string;
}

const MOCK_HOTELS: MockHotel[] = [
  {
    id: "h-001",
    name: "Grand Luxe Hotel & Suites",
    location: "Victoria Island, Lagos",
    price: 75000,
    rating: 4.8,
    category: "luxury",
  },
  {
    id: "h-002",
    name: "Seaside Inn Lagos",
    location: "Lekki Phase 1, Lagos",
    price: 25000,
    rating: 4.2,
    category: "standard",
  },
  {
    id: "h-003",
    name: "Abuja Continental",
    location: "Wuse 2, Abuja",
    price: 55000,
    rating: 4.5,
    category: "premium",
  },
  {
    id: "h-004",
    name: "Palm Springs Resort",
    location: "Ibadan, Oyo State",
    price: 18000,
    rating: 3.9,
    category: "budget",
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < full
              ? "text-yellow-400"
              : i === full && hasHalf
                ? "text-yellow-400"
                : "text-gray-200"
          }`}
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

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  function toggleFacility(f: string) {
    setSelectedFacilities((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">
          Search Hotels
        </h2>
        <p className="mt-1 text-sm text-muted">
          Find and book the perfect hotel for your stay.
        </p>
      </div>

      <Card className="flex flex-col gap-4 p-4 md:p-6">
        <Input
          placeholder="Search by hotel name or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          endAdornment={
            <FigIcon src="/figma/icons/search.svg" size={20} />
          }
        />

        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-muted">
              Category
            </label>
            <Select
              options={CATEGORY_OPTIONS}
              placeholder="All categories"
              defaultValue=""
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-muted">
              Price Range
            </label>
            <Select
              options={PRICE_OPTIONS}
              placeholder="Any price"
              defaultValue=""
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted">Facilities</p>
          <div className="flex flex-wrap gap-2">
            {FACILITIES.map((f) => {
              const active = selectedFacilities.includes(f);
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFacility(f)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    active
                      ? "border-brand-green bg-brand-green/10 text-brand-green"
                      : "border-border bg-white text-brand-ink hover:border-brand-green/50"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {MOCK_HOTELS.map((hotel) => (
          <Card key={hotel.id} className="flex flex-col overflow-hidden">
            <div className="flex h-[140px] items-center justify-center bg-surface-subtle">
              <span className="text-xs text-muted">Hotel Image</span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="text-sm font-semibold text-brand-ink">
                {hotel.name}
              </h3>
              <p className="text-xs text-muted">{hotel.location}</p>
              <StarRating rating={hotel.rating} />
              <div className="mt-auto flex items-center justify-between pt-3">
                <p className="text-base font-bold text-brand-ink">
                  {formatCurrency(hotel.price)}
                  <span className="text-xs font-normal text-muted">
                    /night
                  </span>
                </p>
                <Button variant="primary" size="sm">
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
