"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

type ProductStatus = "active" | "draft";

interface MockProduct {
  id: string;
  name: string;
  price: string;
  category: string;
  status: ProductStatus;
}

const mockProducts: MockProduct[] = [
  { id: "P-001", name: "Airport Shuttle Service", price: "₦15,000", category: "Hotel Services", status: "active" },
  { id: "P-002", name: "Premium Spa Package", price: "₦45,000", category: "Experiences", status: "active" },
  { id: "P-003", name: "Branded Travel Mug", price: "₦3,500", category: "Merchandise", status: "active" },
  { id: "P-004", name: "City Tour (Half-Day)", price: "₦25,000", category: "Experiences", status: "draft" },
  { id: "P-005", name: "Laundry Express Add-On", price: "₦8,000", category: "Hotel Services", status: "active" },
  { id: "P-006", name: "StaySuite Welcome Kit", price: "₦5,000", category: "Merchandise", status: "draft" },
];

const statusStyles: Record<ProductStatus, string> = {
  active: "bg-green-50 text-green-700",
  draft: "bg-amber-50 text-amber-700",
};

export default function ProductsPage() {
  const [products] = useState(mockProducts);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-brand-ink">Products</h2>
          <p className="mt-1 text-sm text-muted">
            Create and manage products that users can purchase on the platform.
          </p>
        </div>
        <Button size="sm">Create Product</Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col rounded-lg border border-border bg-white overflow-hidden"
          >
            {/* Image Placeholder */}
            <div className="flex h-40 items-center justify-center bg-surface-subtle">
              <svg
                className="h-12 w-12 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-brand-ink">{product.name}</h3>
                <span
                  className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[product.status]}`}
                >
                  {product.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">{product.category}</p>
              <p className="mt-2 text-lg font-semibold text-brand-ink">
                {product.price}
              </p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="ghost" className="text-xs !h-7 !px-2.5">
                  Edit
                </Button>
                <Button size="sm" variant="ghost" className="text-xs !h-7 !px-2.5 text-red-600 hover:bg-red-50">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
