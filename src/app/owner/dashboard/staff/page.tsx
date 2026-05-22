import Button from "@/components/ui/Button";
import type { HotelStaffRole } from "@/types";

interface MockStaff {
  id: string;
  name: string;
  role: HotelStaffRole;
  email: string;
  isActive: boolean;
}

const staffMembers: MockStaff[] = [
  { id: "s1", name: "Tunde Bakare", role: "management", email: "tunde@staysuite.ng", isActive: true },
  { id: "s2", name: "Amina Yusuf", role: "receptionist", email: "amina@staysuite.ng", isActive: true },
  { id: "s3", name: "Obinna Chukwu", role: "accountant", email: "obinna@staysuite.ng", isActive: true },
  { id: "s4", name: "Blessing Ojo", role: "bar_kitchen_laundry", email: "blessing@staysuite.ng", isActive: false },
  { id: "s5", name: "Ibrahim Musa", role: "security", email: "ibrahim@staysuite.ng", isActive: true },
];

const roleLabels: Record<HotelStaffRole, string> = {
  management: "Management",
  receptionist: "Receptionist",
  accountant: "Accountant",
  bar_kitchen_laundry: "Bar / Kitchen / Laundry",
  security: "Security",
};

const roleBadgeColors: Record<HotelStaffRole, string> = {
  management: "bg-brand-navy/10 text-brand-navy",
  receptionist: "bg-brand-green/10 text-brand-green",
  accountant: "bg-brand-blue/10 text-brand-blue",
  bar_kitchen_laundry: "bg-amber-500/10 text-amber-600",
  security: "bg-gray-500/10 text-gray-600",
};

export default function OwnerStaffPage() {
  const rows = staffMembers.slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-brand-ink">Staff Management</h2>
          <p className="mt-1 text-sm text-muted">
            Manage staff members, roles, and permissions.
          </p>
        </div>
        <Button size="sm">Add Staff</Button>
      </div>

      <div className="rounded-lg border border-border bg-white p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Name</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Role</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Email</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Status</th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((s) => (
                <tr key={s.id}>
                  <td className="whitespace-nowrap py-3 font-medium text-brand-ink">{s.name}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${roleBadgeColors[s.role]}`}>
                      {roleLabels[s.role]}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-3 text-muted">{s.email}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        s.isActive
                          ? "bg-brand-green/10 text-brand-green"
                          : "bg-muted/10 text-muted"
                      }`}
                    >
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-8 px-3 text-xs">
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 px-3 text-xs text-red-600">
                        Remove
                      </Button>
                    </div>
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
