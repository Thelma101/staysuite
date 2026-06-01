import Button from "@/components/ui/Button";

export default function NtdaEmailTemplatePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f8f6] px-4 py-10">
      <div className="w-full max-w-[560px]">
        <div
          className="rounded-[8px] bg-white px-8 py-10 sm:px-12"
          style={{ boxShadow: "0px 8px 8px rgba(217,217,217,0.27)" }}
        >
          <div className="flex justify-center">
            <div className="flex size-[80px] items-center justify-center rounded-full border-2 border-[#188b5c] bg-[#f4f8f6]">
              <span className="text-center text-xs font-bold leading-tight text-[#188b5c]">NTDA</span>
            </div>
          </div>

          <hr className="my-6 border-border" />

          <h1 className="text-center text-xl font-bold text-brand-ink sm:text-2xl">
            Reset Your Password
          </h1>

          <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-brand-ink/80">
            <p>Hi [Name],</p>
            <p>
              We received a request to reset the password for your NTDA admin account.
              Click the button below to set a new password:
            </p>
            <div className="flex justify-center py-2">
              <Button as="link" href="#" className="h-12 bg-[#188b5c] px-10 hover:bg-[#14704a]">
                Reset Password
              </Button>
            </div>
            <p className="text-xs text-muted">
              This link expires in <strong>30 minutes</strong>. If you did not request this,
              ignore this email.
            </p>
            <p className="break-all text-xs text-[#188b5c]">
              https://ntda.gov.ng/reset-password?token=xxxxxxxx
            </p>
          </div>

          <hr className="my-6 border-border" />
          <p className="text-center text-xs text-muted">
            &copy; {new Date().getFullYear()} Nigerian Tourism Development Authority.
          </p>
        </div>
      </div>
    </div>
  );
}
