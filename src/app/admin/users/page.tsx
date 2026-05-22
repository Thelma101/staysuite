"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

type UserStatus = "active" | "pending" | "blocked";

interface MockUser {
  id: string;
  name: string;
  tourismId: string;
  email: string;
  country: string;
  gender: string;
  registrationDate: string;
  status: UserStatus;
}

const mockUsers: MockUser[] = [
  { id: "U-001", name: "Amina Bello", tourismId: "NTD-2026-00412", email: "amina.bello@gmail.com", country: "Nigeria", gender: "Female", registrationDate: "2026-05-18", status: "active" },
  { id: "U-002", name: "John Carter", tourismId: "NTD-2026-00387", email: "john.carter@outlook.com", country: "United States", gender: "Male", registrationDate: "2026-05-15", status: "active" },
  { id: "U-003", name: "Chioma Eze", tourismId: "NTD-2026-00401", email: "chioma.eze@yahoo.com", country: "Nigeria", gender: "Female", registrationDate: "2026-05-12", status: "pending" },
  { id: "U-004", name: "Hans Mueller", tourismId: "NTD-2026-00355", email: "hans.mueller@web.de", country: "Germany", gender: "Male", registrationDate: "2026-05-10", status: "active" },
  { id: "U-005", name: "Fatima Yusuf", tourismId: "NTD-2026-00290", email: "fatima.yusuf@gmail.com", country: "Nigeria", gender: "Female", registrationDate: "2026-04-28", status: "blocked" },
  { id: "U-006", name: "Sophie Laurent", tourismId: "NTD-2026-00312", email: "sophie.l@orange.fr", country: "France", gender: "Female", registrationDate: "2026-05-02", status: "active" },
];

const statusStyles: Record<UserStatus, string> = {
  active: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-700",
  blocked: "bg-red-50 text-red-700",
};

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const countryOptions = [
  { value: "Nigeria", label: "Nigeria" },
  { value: "United States", label: "United States" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "United Kingdom", label: "United Kingdom" },
];

export default function ManageUsersPage() {
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  const filtered = mockUsers.filter((u) => {
    const matchesQuery =
      !query ||
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.tourismId.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase());
    const matchesDate = !date || u.registrationDate === date;
    const matchesGender =
      !gender || u.gender.toLowerCase() === gender;
    const matchesCountry = !country || u.country === country;
    return matchesQuery && matchesDate && matchesGender && matchesCountry;
  });

  function handleReset() {
    setQuery("");
    setDate("");
    setGender("");
    setCountry("");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Users</h2>
        <p className="mt-1 text-sm text-muted">
          Search and manage users by date, gender, country, and other parameters.
        </p>
      </div>

      {/* Search Filters */}
      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Registration date"
          />
          <Select
            options={genderOptions}
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <Select
            options={countryOptions}
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            placeholder="Name, Tourism ID, or Email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="mt-4 flex gap-3">
          <Button size="sm">Search</Button>
          <Button size="sm" variant="ghost" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4">
                Name
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4 hidden md:table-cell">
                Tourism ID
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4 hidden lg:table-cell">
                Email
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4 hidden md:table-cell">
                Country
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4 hidden lg:table-cell">
                Registered
              </th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider pb-3 pt-4 px-4">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 font-medium text-brand-ink">
                  {user.name}
                  <span className="block text-xs text-muted md:hidden">
                    {user.tourismId}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">{user.tourismId}</td>
                <td className="px-4 py-3 hidden lg:table-cell">{user.email}</td>
                <td className="px-4 py-3 hidden md:table-cell">{user.country}</td>
                <td className="px-4 py-3 hidden lg:table-cell">{user.registrationDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[user.status]}`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No users found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
