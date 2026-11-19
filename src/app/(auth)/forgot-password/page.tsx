"use client";

import { Suspense, useEffect, useState, type SubmitEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  Clock,
  RefreshCw,
  CheckCircle2,
  MapPin,
  Loader2,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useSession } from "@/context/Session/SessionContext";
import { rules, validateForm, getPasswordStrength } from "@/lib/validation";
import type { AuthResult } from "@/lib/Session";
import { FORGOT_PASSWORD_DATA as DATA } from "@/data/pages/RecoveryData";
import { useFormTracking } from "@/hooks/useFormTrack";
import { FormField } from "@/components/ui/formField";

const { header, step1, step2, step3, errors: msg, footer: foot, toasts } = DATA;

const RESEND_SECONDS = 45;

// Shared classes, so the three steps stay identical.
const primaryBtn =
  "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-root shadow-sm transition hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60";
const linkBtn =
  "inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-text transition hover:text-text-link";
const iconBadge =
  "mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-text-brand";
const titleCls = "text-center text-2xl font-bold tracking-tight text-text";
const subtitleCls =
  "mx-auto mt-2.5 max-w-sm text-center text-xs leading-relaxed text-text-muted sm:text-sm";
const divider = "my-5 border-t border-root/30";

// FIX: useSearchParams needs a Suspense boundary, otherwise the build fails
// (and with Cache Components it is required). The page is only the wrapper.
export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordFlow />
    </Suspense>
  );
}

function ForgotPasswordFlow() {
  const router = useRouter();
  const { createSession, isAuthenticated, isCheckingSession } = useSession();

  // The emailed link looks like /forgot-password?token=abc. No token = no step 3.
  const resetToken = useSearchParams().get("token");

  const [step, setStep] = useState<1 | 2 | 3>(resetToken ? 3 : 1);
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // One tracker per form, so submitting step 1 doesn't flag errors in step 3.
  const requestForm = useFormTracking();
  const resetForm = useFormTracking();

  useEffect(() => {
    if (!isCheckingSession && isAuthenticated) router.replace("/home");
  }, [isCheckingSession, isAuthenticated, router]);

  // Resend countdown (a timeout per second is simpler than re-creating an interval)
  useEffect(() => {
    if (step !== 2 || resendTimer <= 0) return;
    const id = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [step, resendTimer]);

  const requestSchema = {
    email: [rules.required(msg.required), rules.email(msg.email)],
  };
  const resetSchema = {
    newPassword: [
      rules.required(msg.required),
      rules.minLength(8, msg.passwordMin),
      rules.pattern(/[a-zA-Z]/, msg.passwordCombo),
      rules.pattern(/[0-9]|[^a-zA-Z0-9]/, msg.passwordCombo),
    ],
    confirmPassword: [
      rules.required(msg.required),
      rules.matches(() => newPassword, msg.passwordMismatch),
    ],
  };

  const requestCheck = validateForm({ email }, requestSchema);
  const resetCheck = validateForm(
    { newPassword, confirmPassword },
    resetSchema,
  );

  // Hooks are all above this line, so an early return is safe.
  if (isCheckingSession || isAuthenticated) return null;

  const handleRequestLink = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestForm.markSubmitted();
    if (!requestCheck.isValid) return;

    setIsSending(true);
    try {
      // TODO(TanStack): replace with await requestResetMutation.mutateAsync({ email })
      await new Promise((resolve) => setTimeout(resolve, 900));

      toast.success(toasts.linkSent);
      setResendTimer(RESEND_SECONDS);
      setStep(2);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : toasts.error);
    } finally {
      setIsSending(false);
    }
  };

  const handleResendLink = async () => {
    if (resendTimer > 0 || isSending) return;
    setIsSending(true);
    try {
      // TODO(TanStack): same mutation as step 1
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success(toasts.linkResent);
      setResendTimer(RESEND_SECONDS);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : toasts.error);
    } finally {
      setIsSending(false);
    }
  };

  const handleUpdatePassword = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetForm.markSubmitted();
    if (!resetCheck.isValid) return;

    setIsUpdating(true);
    try {
      // TODO(TanStack): replace with
      //   const result = await resetPasswordMutation.mutateAsync({ token: resetToken, password: newPassword });
      // The server must check `resetToken`. Never trust the UI alone.
      const result = await new Promise<AuthResult>((resolve) =>
        setTimeout(
          () =>
            resolve({
              token: "tok_reset_777",
              expiresIn: 60 * 60,
              user: {
                id: "usr_123",
                username: "keza_rw",
                fullName: "Keza Aline",
              },
            }),
          1000,
        ),
      );

      createSession(result);
      toast.success(toasts.resetSuccess);
      router.replace("/home");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : toasts.error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex min-h-dvh w-full flex-col justify-between bg-bg text-text">
      <header className="flex w-full items-center justify-between px-6 py-4 sm:px-10">
        <div className="flex items-center gap-3">
          <Logo size={32} choice={true} />
          <span className="hidden text-xs text-text-muted sm:inline">
            {header.tagline}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 rounded-full bg-bg-card px-3 py-1 text-xs font-medium text-text-muted sm:inline-flex">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            {header.locationBadge}
          </span>
          <Link href={header.loginHref} className={linkBtn}>
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{header.loginLinkText}</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-6">
        {/* Stepper (display only) */}
        <ol className="mb-6 grid w-full max-w-md grid-cols-3 gap-1 rounded-2xl bg-bg-card p-1">
          {DATA.steps.map((s) => (
            <li
              key={s.id}
              aria-current={step === s.id ? "step" : undefined}
              className={`rounded-xl py-2 text-center text-xs font-semibold transition ${
                step === s.id ? "bg-bg text-text shadow-xs" : "text-text-muted"
              }`}
            >
              {s.label}
            </li>
          ))}
        </ol>

        <div className="w-full rounded-3xl border-2 border-root/60 bg-bg-card/60 p-7 shadow-xl backdrop-blur-md sm:p-9">
          {/* ---------- STEP 1: REQUEST LINK ---------- */}
          {step === 1 && (
            <div>
              <div className={iconBadge}>
                <step1.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h1 className={titleCls}>{step1.title}</h1>
              <p className={subtitleCls}>{step1.subtitle}</p>

              <form onSubmit={handleRequestLink} noValidate className="mt-6">
                <fieldset
                  disabled={isSending}
                  className="m-0 min-w-0 space-y-4 border-0 p-0"
                >
                  <FormField
                    id="recovery-email"
                    type="email"
                    label={step1.emailLabel}
                    placeholder={step1.emailPlaceholder}
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    icon={Mail}
                    value={email}
                    onChange={setEmail}
                    onBlur={() => requestForm.touch("email")}
                    error={requestForm.errorFor(
                      "email",
                      requestCheck.errors.email,
                    )}
                  />

                  <p className="flex items-center gap-1.5 text-[11px] text-text-muted">
                    <ShieldCheck
                      className="h-3.5 w-3.5 shrink-0 text-text-brand"
                      aria-hidden="true"
                    />
                    <span>{step1.securityNote}</span>
                  </p>

                  <button
                    type="submit"
                    aria-busy={isSending}
                    className={primaryBtn}
                  >
                    {isSending && (
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    <span>
                      {isSending ? step1.loadingBtn : step1.submitBtn}
                    </span>
                    {!isSending && (
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </fieldset>
              </form>

              <div className={divider} />

              <div className="text-center">
                <Link href={header.loginHref} className={linkBtn}>
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{step1.backToLoginText}</span>
                </Link>
              </div>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-text-muted">
                {step1.hostPromptPrefix}{" "}
                <Link
                  href="#"
                  className="font-semibold text-text-link hover:underline"
                >
                  {step1.hostPromptLink}
                </Link>
              </p>
            </div>
          )}

          {/* ---------- STEP 2: LINK SENT ---------- */}
          {step === 2 && (
            <div>
              <div className={iconBadge}>
                <step2.icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <div className="mb-3 flex justify-center">
                <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-text-brand">
                  {step2.badge}
                </span>
              </div>

              <h1 className={titleCls}>{step2.title}</h1>
              <p className={subtitleCls}>
                {step2.subtitlePrefix}{" "}
                <strong className="font-semibold text-text">{email}</strong>.{" "}
                {step2.subtitleSuffix}
              </p>

              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-bg/60 p-4 text-left">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-text-brand"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-xs font-bold text-text">
                    {step2.infoBoxTitle}
                  </h2>
                  <p className="mt-1 text-[11px] leading-relaxed text-text-muted">
                    {step2.infoBoxBody}
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={resendTimer > 0 || isSending}
                onClick={handleResendLink}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-root bg-transparent py-3 text-xs font-semibold text-text transition hover:bg-brand/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${isSending ? "animate-spin" : ""}`}
                  aria-hidden="true"
                />
                <span>
                  {resendTimer > 0
                    ? `${step2.resendWaitPrefix} ${resendTimer}s`
                    : step2.resendReadyText}
                </span>
              </button>

              {/* FIX: this skipped the email check entirely. Now development only;
                  in production step 3 opens only from the emailed ?token= link. */}
              {process.env.NODE_ENV === "development" && (
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="cursor-pointer text-xs font-semibold text-text-link hover:underline"
                  >
                    {step2.previewLinkText}
                  </button>
                </div>
              )}

              <div className={divider} />

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={linkBtn}
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{step2.differentEmailText}</span>
                </button>
              </div>
            </div>
          )}

          {/* ---------- STEP 3: SET NEW PASSWORD ---------- */}
          {step === 3 && (
            <div>
              <div className={iconBadge}>
                <step3.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h1 className={titleCls}>{step3.title}</h1>
              <p className={subtitleCls}>{step3.subtitle}</p>

              <form onSubmit={handleUpdatePassword} noValidate className="mt-6">
                <fieldset
                  disabled={isUpdating}
                  className="m-0 min-w-0 space-y-4 border-0 p-0"
                >
                  <FormField
                    id="new-password"
                    type="password"
                    label={step3.newPasswordLabel}
                    placeholder={step3.newPasswordPlaceholder}
                    hint={step3.newPasswordHint}
                    autoComplete="new-password"
                    icon={Lock}
                    value={newPassword}
                    onChange={setNewPassword}
                    onBlur={() => resetForm.touch("newPassword")}
                    error={resetForm.errorFor(
                      "newPassword",
                      resetCheck.errors.newPassword,
                    )}
                    strength={getPasswordStrength(newPassword)}
                    revealed={showPassword}
                    onToggleReveal={() => setShowPassword((p) => !p)}
                  />

                  {/* One eye button controls both fields, same as register */}
                  <FormField
                    id="confirm-password"
                    type="password"
                    label={step3.confirmPasswordLabel}
                    placeholder={step3.confirmPasswordPlaceholder}
                    autoComplete="new-password"
                    icon={ShieldCheck}
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    onBlur={() => resetForm.touch("confirmPassword")}
                    error={resetForm.errorFor(
                      "confirmPassword",
                      resetCheck.errors.confirmPassword,
                    )}
                    revealed={showPassword}
                  />

                  <button
                    type="submit"
                    aria-busy={isUpdating}
                    className={`${primaryBtn} mt-1`}
                  >
                    {isUpdating && (
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    <span>
                      {isUpdating ? step3.loadingBtn : step3.submitBtn}
                    </span>
                    {!isUpdating && (
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </fieldset>
              </form>

              <div className={divider} />

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={linkBtn}
                >
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{step3.backToRequestText}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-1.5 rounded-full bg-bg-card px-4 py-1.5 text-[11px] font-medium text-text-muted">
          <MapPin className="h-3.5 w-3.5 text-text-brand" aria-hidden="true" />
          <span>{DATA.trustBadge}</span>
        </div>
      </main>

      <footer className="border-t border-root/30 bg-bg-card/60 px-6 py-5 text-xs text-text-muted sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2 text-center md:justify-start md:text-left">
            <Logo size={24} choice={true} />
            <span className="flex items-center gap-1">
              <foot.copyRight
                className="h-3.5 w-3.5 shrink-0"
                aria-hidden="true"
              />
              <span>
                {foot.date()} {foot.statement}
              </span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {foot.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition hover:text-text hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
