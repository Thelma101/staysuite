"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import SlidePanel from "@/components/ui/SlidePanel";
import { cn } from "@/lib/utils";

type AdminStatus = "Active" | "Inactive";

type Admin = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: AdminStatus;
};

const ADMINS: Admin[] = [
  { id: "1", name: "Dr. Adaeze Okafor", email: "a.okafor@ntda.gov.ng", role: "Super Admin", status: "Active" },
  { id: "2", name: "Musa Ibrahim", email: "m.ibrahim@ntda.gov.ng", role: "Compliance Officer", status: "Active" },
  { id: "3", name: "Blessing Nwosu", email: "b.nwosu@ntda.gov.ng", role: "Reviewer", status: "Active" },
  { id: "4", name: "Tunde Bakare", email: "t.bakare@ntda.gov.ng", role: "Auditor", status: "Inactive" },
];

const statusBadge: Record<AdminStatus, string> = {
  Active: "bg-green-50 text-green-700",
  Inactive: "bg-gray-100 text-gray-700",
};

const roleOptions = [
  { value: "super", label: "Super Admin" },
  { value: "compliance", label: "Compliance Officer" },
  { value: "reviewer", label: "Reviewer" },
  { value: "auditor", label: "Auditor" },
];

export default function NtdaAdminsPage() {
  const [admins, setAdmins] = useState(ADMINS);
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !role) return;
    const label = roleOptions.find((r) => r.value === role)?.label ?? role;
    setAdmins((prev) => [
      { id: String(Date.now()), name, email, role: label, status: "Active" },
      ...prev.slice(0, 3),
    ]);
    setName("");
    setEmail("");
    setRole("");
    setAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-brand-ink">Admins</h1>
        <Button className="bg-[#188b5c] hover:bg-[#14704a]" onClick={() => setAddOpen(true)}>
          Add Admin
        </Button>
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-[#f4f8f6]">
              <th className="px-5 py-3 font-semibold text-muted">Name</th>
              <th className="px-5 py-3 font-semibold text-muted">Email</th>
              <th className="px-5 py-3 font-semibold text-muted">Role</th>
              <th className="px-5 py-3 font-semibold text-muted">Status</th>
              <th className="px-5 py-3 font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.slice(0, 4).map((admin) => (
              <tr key={admin.id} className="border-b border-border last:border-0">
                <td className="px-5 py-4 font-medium text-brand-ink">{admin.name}</td>
                <td className="px-5 py-4 text-muted">{admin.email}</td>
                <td className="px-5 py-4 text-muted">{admin.role}</td>
                <td className="px-5 py-4">
                  <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", statusBadge[admin.status])}>
                    {admin.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-3">
                    <button type="button" className="text-sm font-medium text-[#188b5c] hover:underline">Edit</button>
                    <button type="button" className="text-sm font-medium text-red-500 hover:underline">Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SlidePanel open={addOpen} onClose={() => setAddOpen(false)} title="Add Admin">
        <form onSubmit={handleAddAdmin} className="flex flex-col gap-5">
          <Field label="Full Name" htmlFor="admin-name" required>
            <Input id="admin-name" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Email Address" htmlFor="admin-email" required>
            <Input id="admin-email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Role" htmlFor="admin-role" required>
            <Select id="admin-role" options={roleOptions} placeholder="Select role" value={role} onChange={(e) => setRole(e.target.value)} />
          </Field>
          <Button type="submit" fullWidth className="bg-[#188b5c] hover:bg-[#14704a]">
            Save Admin
          </Button>
        </form>
      </SlidePanel>
    </div>
  );
}
