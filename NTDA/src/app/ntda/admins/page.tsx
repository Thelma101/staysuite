"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import SlidePanel from "@/components/ui/SlidePanel";
import { cn } from "@/lib/utils";
import { fetchAdmins, type AdminRecord } from "@/lib/api/ntda";
import { validateEmail, validateRequired } from "@/lib/validation";

const statusBadge: Record<AdminRecord["status"], string> = {
  Active: "bg-green-50 text-green-700",
  Inactive: "bg-gray-100 text-gray-700",
};

const roleOptions = [
  { value: "super", label: "Super Admin" },
  { value: "compliance", label: "Compliance Officer" },
  { value: "reviewer", label: "Reviewer" },
  { value: "auditor", label: "Auditor" },
];

const permissionOptions = [
  "Approve Hotels",
  "Manage Visitors",
  "Send Broadcasts",
  "View Transactions",
  "Manage Admins",
];

export default function NtdaAdminsPage() {
  const [admins, setAdmins] = useState<AdminRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [permissionsTarget, setPermissionsTarget] = useState<AdminRecord | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdmins()
      .then(setAdmins)
      .finally(() => setLoading(false));
  }, []);

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const nameCheck = validateRequired(name, "Full name");
    const emailCheck = validateEmail(email);
    const roleCheck = validateRequired(role, "Role");
    if (!nameCheck.ok) {
      setFormError(nameCheck.message);
      return;
    }
    if (!emailCheck.ok) {
      setFormError(emailCheck.message);
      return;
    }
    if (!roleCheck.ok) {
      setFormError(roleCheck.message);
      return;
    }
    setFormError(null);
    const label = roleOptions.find((r) => r.value === role)?.label ?? role;
    setAdmins((prev) => [
      {
        id: String(Date.now()),
        name: name.trim(),
        email: email.trim(),
        role: label,
        status: "Active",
        permissions: [],
      },
      ...prev,
    ]);
    setName("");
    setEmail("");
    setRole("");
    setAddOpen(false);
  };

  const openPermissions = (admin: AdminRecord) => {
    setPermissionsTarget(admin);
    setPermissions(admin.permissions ?? []);
  };

  const savePermissions = () => {
    if (!permissionsTarget) return;
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === permissionsTarget.id ? { ...a, permissions: [...permissions] } : a,
      ),
    );
    setPermissionsTarget(null);
  };

  const togglePermission = (perm: string) => {
    setPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm],
    );
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
            {loading ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  Loading admins…
                </td>
              </tr>
            ) : admins.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  No admin users configured.
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 font-medium text-brand-ink">{admin.name}</td>
                  <td className="px-5 py-4 text-muted">{admin.email}</td>
                  <td className="px-5 py-4 text-muted">{admin.role}</td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                        statusBadge[admin.status],
                      )}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      className="text-sm font-medium text-[#188b5c] hover:underline"
                      onClick={() => openPermissions(admin)}
                    >
                      Permissions
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <SlidePanel open={addOpen} onClose={() => setAddOpen(false)} title="Add Admin">
        <form onSubmit={handleAddAdmin} className="flex flex-col gap-5">
          {formError && (
            <p className="text-sm text-red-600" role="alert">
              {formError}
            </p>
          )}
          <Field label="Full Name" htmlFor="admin-name" required>
            <Input
              id="admin-name"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label="Email Address" htmlFor="admin-email" required>
            <Input
              id="admin-email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Role" htmlFor="admin-role" required>
            <Select
              id="admin-role"
              options={roleOptions}
              placeholder="Select role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Field>
          <Button type="submit" fullWidth className="bg-[#188b5c] hover:bg-[#14704a]">
            Save Admin
          </Button>
        </form>
      </SlidePanel>

      <SlidePanel
        open={!!permissionsTarget}
        onClose={() => setPermissionsTarget(null)}
        title="Admin Permissions"
      >
        {permissionsTarget && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted">
              Configure access for <strong>{permissionsTarget.name}</strong>
            </p>
            <ul className="flex flex-col gap-2">
              {permissionOptions.map((perm) => (
                <li key={perm}>
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={permissions.includes(perm)}
                      onChange={() => togglePermission(perm)}
                      className="size-4 accent-[#188b5c]"
                    />
                    {perm}
                  </label>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              fullWidth
              className="bg-[#188b5c] hover:bg-[#14704a]"
              onClick={savePermissions}
            >
              Save Permissions
            </Button>
          </div>
        )}
      </SlidePanel>
    </div>
  );
}
