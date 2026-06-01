export type ValidationResult = { ok: true } | { ok: false; message: string };

export function validateEmail(value: string): ValidationResult {
  const trimmed = value.trim();
  if (!trimmed) return { ok: false, message: "Email is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { ok: false, message: "Enter a valid email address." };
  }
  return { ok: true };
}

export function validatePassword(value: string, minLength = 8): ValidationResult {
  if (!value) return { ok: false, message: "Password is required." };
  if (value.length < minLength) {
    return { ok: false, message: `Password must be at least ${minLength} characters.` };
  }
  return { ok: true };
}

export function validateOtp(value: string, length = 6): ValidationResult {
  const trimmed = value.trim();
  if (!trimmed) return { ok: false, message: "Verification code is required." };
  if (!/^\d+$/.test(trimmed) || trimmed.length !== length) {
    return { ok: false, message: `Enter a ${length}-digit verification code.` };
  }
  return { ok: true };
}

export function validateRequired(value: string, label: string): ValidationResult {
  if (!value.trim()) return { ok: false, message: `${label} is required.` };
  return { ok: true };
}
