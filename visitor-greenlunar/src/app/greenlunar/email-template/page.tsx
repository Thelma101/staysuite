import Button from "@/components/ui/Button";

export default function GreenLunarEmailTemplatePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f8f6] px-4 py-10">
      <div className="w-full max-w-[560px]">
        {/* Email Card */}
        <div
          className="rounded-[8px] bg-white px-8 py-10 sm:px-12"
          style={{ boxShadow: "0px 8px 8px rgba(217,217,217,0.27)" }}
        >
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex size-[80px] items-center justify-center rounded-full bg-brand-green">
              <span className="text-center font-montserrat text-xs font-bold leading-tight text-white">
                Green
                <br />
                Lunar
              </span>
            </div>
          </div>

          <hr className="my-6 border-border" />

          {/* Heading */}
          <h1 className="text-center text-xl font-bold text-brand-ink sm:text-2xl">
            Reset Your Password
          </h1>

          {/* Body */}
          <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-brand-ink/80">
            <p>Hi [Name],</p>

            <p>
              We received a request to reset the password associated with your
              Green Lunar account. If you made this request, please click the
              button below to set a new password:
            </p>

            <div className="flex justify-center py-2">
              <Button as="link" href="#" className="h-12 px-10">
                Reset Password
              </Button>
            </div>

            <p className="text-xs text-muted">
              This link will expire in <strong>30 minutes</strong>. If you did
              not request a password reset, you can safely ignore this email —
              your account will remain secure.
            </p>

            <p className="text-xs text-muted">
              If the button above doesn&apos;t work, copy and paste the
              following URL into your browser:
            </p>

            <p className="break-all text-xs text-brand-green">
              https://greenlunar.ng/reset-password?token=xxxxxxxx
            </p>
          </div>

          <hr className="my-6 border-border" />

          {/* Footer */}
          <p className="text-center text-xs text-muted">
            &copy; {new Date().getFullYear()} Green Lunar Nigeria Limited. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
