import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FigIcon from "@/components/ui/FigIcon";

const MOCK_USER = {
  fullName: "John Adebayo Doe",
  tourismId: "NG-4677544560",
  email: "john.doe@email.com",
  phone: "+234 801 234 5678",
  nin: "12345678901",
  country: "Nigeria",
  state: "Lagos",
  passportNumber: "A12345678",
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-ink">Profile</h2>
        <p className="mt-1 text-sm text-muted">
          View and manage your account information.
        </p>
      </div>

      {/* Profile Header */}
      <Card className="flex flex-col items-center gap-4 p-6 md:flex-row md:items-start md:gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-2xl font-bold text-brand-green">
          {MOCK_USER.fullName
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="flex flex-col items-center gap-2 md:items-start">
          <h3 className="text-xl font-semibold text-brand-ink">
            {MOCK_USER.fullName}
          </h3>
          <span className="rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-medium text-brand-navy">
            Tourism ID: {MOCK_USER.tourismId}
          </span>
          <div className="flex flex-col gap-1 text-sm text-muted">
            <p>{MOCK_USER.email}</p>
            <p>{MOCK_USER.phone}</p>
          </div>
        </div>
        <div className="md:ml-auto">
          <Button variant="ghost" size="sm">
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-4 md:p-6">
        <h3 className="mb-4 text-lg font-semibold text-brand-ink">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoRow label="NIN" value={MOCK_USER.nin} />
          <InfoRow label="Country" value={MOCK_USER.country} />
          <InfoRow label="State" value={MOCK_USER.state} />
          <InfoRow label="Passport Number" value={MOCK_USER.passportNumber} />
          <InfoRow label="Email" value={MOCK_USER.email} />
          <InfoRow label="Phone" value={MOCK_USER.phone} />
        </div>
      </Card>

      {/* Documents */}
      <Card className="p-4 md:p-6">
        <h3 className="mb-4 text-lg font-semibold text-brand-ink">
          Documents
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DocumentPlaceholder
            label="Passport Photo"
            icon="/figma/icons/identity-card-sm.svg"
          />
          <DocumentPlaceholder
            label="ID Card"
            icon="/figma/icons/identity-card-sm.svg"
          />
        </div>
      </Card>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-muted uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm text-brand-ink">{value}</span>
    </div>
  );
}

function DocumentPlaceholder({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-surface-subtle p-6">
      <FigIcon src={icon} size={32} />
      <p className="text-xs text-muted">{label}</p>
      <span className="text-[11px] text-muted">Uploaded</span>
    </div>
  );
}
