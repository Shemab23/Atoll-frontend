"use client";

import { useState, useEffect, SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  KeyRound,
  Mail,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  Clock,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  Check,
  CheckCircle2,
  MapPin,
  CopyrightIcon,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useSession } from "@/context/Session/SessionContext";

// ==========================================
// 1. STRUCTURED PAGE DATA
// ==========================================
export const FORGOT_PASSWORD_DATA = {
  header: {
    tagline: "Less Pressure. More Connection.",
    locationBadge: "Kigali, Rwanda",
    loginLinkText: "Log In",
    loginHref: "/login",
  },
  steps: [
    { id: 1, label: "1. Request Link" },
    { id: 2, label: "2. Link Sent" },
    { id: 3, label: "3. Set New Password" },
  ],
  step1: {
    icon: KeyRound,
    title: "Forgot your password?",
    subtitle:
      "Enter the email linked to your Atoll account. We'll send a gentle reset link so you can rejoin your neighbourhood without any hassle.",
    emailLabel: "Email Address",
    emailPlaceholder: "keza.aline@atoll.rw",
    securityNote: "Secure password-free link delivered within a few seconds.",
    submitBtn: "Send Recovery Link",
    loadingBtn: "Sending link...",
    backToLoginText: "Back to log in",
    hostPromptPrefix: "Part of Kimihurura, Kacyiru, or Nyarutarama exchange?",
    hostPromptLink: "Contact neighborhood host",
  },
  step2: {
    icon: Mail,
    badge: "Recovery Email Dispatched",
    title: "Check your inbox",
    subtitlePrefix: "We've sent a gentle one-time login link to",
    subtitleSuffix: "Click the link in the message to set up a new password.",
    infoBoxTitle: "Take your time",
    infoBoxBody:
      "The link remains valid for 24 hours. If it doesn't arrive in your inbox, gently inspect your spam folder or request a new one below.",
    resendWaitPrefix: "Resend link in",
    resendReadyText: "Resend recovery link",
    previewLinkText: "Already have your link? (Preview: Set New Password)",
    differentEmailText: "Use a different email address",
  },
  step3: {
    icon: Lock,
    title: "Create new password",
    subtitle:
      "Choose a thoughtful, secure passphrase to protect your Kigali neighbourhood exchanges and messages.",
    newPasswordLabel: "New Password",
    newPasswordPlaceholder: "At least 8 characters",
    strengthLabel: "Passphrase strength",
    confirmPasswordLabel: "Confirm New Password",
    confirmPasswordPlaceholder: "Re-enter your new password",
    rules: {
      length: "8+ characters length",
      complexity: "Combination of letters, numbers, or symbols",
    },
    submitBtn: "Update Password & Enter Atoll",
    loadingBtn: "Updating password...",
    backToRequestText: "Back to recovery request",
  },
  trustBadge: "Rwanda's verified neighbourhood exchange network",
  footer: {
    copyRight: CopyrightIcon,
    date: () => new Date().getFullYear(),
    statement:
      "Atoll Community Exchange. Kigali, Rwanda. Less Pressure. More Connection.",
    links: [
      { label: "Neighborhoods", href: "#" },
      { label: "Safety & Trust", href: "#" },
      { label: "Community Values", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  toasts: {
    linkSent: "Recovery link sent! Please check your inbox.",
    linkResent: "A fresh recovery link has been dispatched.",
    passwordMismatch: "Passwords do not match. Please double-check.",
    passwordWeak: "Please meet the password requirements before continuing.",
    resetSuccess: "Password updated! Welcome back to Atoll.",
    error: "Something went wrong. Please try again.",
  },
};

// ==========================================
// 2. COMPONENT LOGIC (UP TO RETURN)
// ==========================================
export default function ForgotPasswordPage() {
  const router = useRouter();
  const { createSession, isAuthenticated, isCheckingSession } = useSession();

  // Wizard step state (1, 2, or 3)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 & 2 states
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [resendTimer, setResendTimer] = useState(45);

  // Step 3 states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Redirect to /home if already logged in
  useEffect(() => {
    if (!isCheckingSession && isAuthenticated) {
      router.replace("/home");
    }
  }, [isCheckingSession, isAuthenticated, router]);

  // Countdown timer when on Step 2 ("Resend link in 45s")
  useEffect(() => {
    if (step !== 2 || resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Prevent flashing while checking session
  if (isCheckingSession || isAuthenticated) {
    return null;
  }

  // Password validation & strength meter logic for Step 3
  const hasMinLength = newPassword.length >= 8;
  const hasCombo =
    /[a-zA-Z]/.test(newPassword) &&
    (/[0-9]/.test(newPassword) || /[^a-zA-Z0-9]/.test(newPassword));

  const getStrengthInfo = () => {
    if (!newPassword) return { label: "Weak", bars: 0, color: "bg-stone-300" };
    if (hasMinLength && hasCombo && newPassword.length >= 11) {
      return { label: "Strong", bars: 3, color: "bg-teal-700" };
    }
    if (hasMinLength && hasCombo) {
      return { label: "Good", bars: 2, color: "bg-teal-700" };
    }
    return { label: "Weak", bars: 1, color: "bg-amber-500" };
  };

  const strength = getStrengthInfo();

  // Step 1 Handler: Request Link
  const handleRequestLink = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSending(true);
    try {
      // Replace with your TanStack Query mutation for requesting reset email
      await new Promise((resolve) => setTimeout(resolve, 900));

      toast.success(FORGOT_PASSWORD_DATA.toasts.linkSent);
      setResendTimer(45);
      setStep(2);
    } catch (error) {
      toast.error(`${FORGOT_PASSWORD_DATA.toasts.error} ${error}`);
    } finally {
      setIsSending(false);
    }
  };

  // Step 2 Handler: Resend Link
  const handleResendLink = async () => {
    if (resendTimer > 0 || isSending) return;

    setIsSending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success(FORGOT_PASSWORD_DATA.toasts.linkResent);
      setResendTimer(45);
    } finally {
      setIsSending(false);
    }
  };

  // Step 3 Handler: Update Password & Enter Atoll
  const handleUpdatePassword = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasMinLength || !hasCombo) {
      toast.error(FORGOT_PASSWORD_DATA.toasts.passwordWeak);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(FORGOT_PASSWORD_DATA.toasts.passwordMismatch);
      return;
    }

    setIsUpdating(true);
    try {
      // Replace with your TanStack Query mutation for setting the new password
      const result = await new Promise<{ userId: string; token: string }>(
        (resolve) =>
          setTimeout(
            () => resolve({ userId: "usr_123", token: "tok_reset_777" }),
            1000,
          ),
      );

      const structuredSession = JSON.stringify({
        userId: result.userId,
        token: result.token,
        createdAt: Date.now(),
      });

      createSession(structuredSession);
      toast.success(FORGOT_PASSWORD_DATA.toasts.resetSuccess);
      router.replace("/home");
    } catch (error) {
      toast.error(`${FORGOT_PASSWORD_DATA.toasts.error} ${error}`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-[#FBF7F2] text-stone-800">
      {/* ========================================== */}
      {/* TOP HEADER BAR                             */}
      {/* ========================================== */}
      <header className="flex w-full items-center justify-between px-6 py-4 sm:px-10">
        <div className="flex items-center gap-3">
          <Logo size={32} choice={true} />
          <span className="hidden text-xs text-stone-500 sm:inline">
            {FORGOT_PASSWORD_DATA.header.tagline}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 rounded-full bg-[#F2E6D8] px-3 py-1 text-xs font-medium text-stone-600 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-700" />
            {FORGOT_PASSWORD_DATA.header.locationBadge}
          </span>

          <Link
            href={FORGOT_PASSWORD_DATA.header.loginHref}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 transition hover:text-teal-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{FORGOT_PASSWORD_DATA.header.loginLinkText}</span>
          </Link>
        </div>
      </header>

      {/* ========================================== */}
      {/* CENTER CONTENT: STEPPER & MAIN CARD        */}
      {/* ========================================== */}
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-6">
        {/* 3-Step Segmented Pill Bar */}
        <div className="mb-6 grid w-full max-w-md grid-cols-3 gap-1 rounded-2xl bg-[#F3E7D9] p-1">
          {FORGOT_PASSWORD_DATA.steps.map((s) => {
            const isActive = step === s.id;
            return (
              <div
                key={s.id}
                className={`rounded-xl py-2 text-center text-xs font-semibold transition ${
                  isActive
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-500"
                }`}
              >
                {s.label}
              </div>
            );
          })}
        </div>

        {/* White Elevated Card */}
        <div className="w-full rounded-3xl border border-stone-200/70 bg-white p-7 shadow-sm sm:p-9">
          {/* ======================================== */}
          {/* STEP 1: REQUEST LINK                     */}
          {/* ======================================== */}
          {step === 1 && (
            <div>
              {/* Top Icon Badge */}
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6ECE1] text-teal-800">
                <FORGOT_PASSWORD_DATA.step1.icon className="h-5 w-5" />
              </div>

              <h1 className="text-center text-2xl font-bold tracking-tight text-stone-900">
                {FORGOT_PASSWORD_DATA.step1.title}
              </h1>
              <p className="mx-auto mt-2.5 max-w-sm text-center text-xs leading-relaxed text-stone-500 sm:text-sm">
                {FORGOT_PASSWORD_DATA.step1.subtitle}
              </p>

              <form onSubmit={handleRequestLink} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="recovery-email"
                    className="mb-1.5 block text-xs font-semibold text-stone-700"
                  >
                    {FORGOT_PASSWORD_DATA.step1.emailLabel}
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input
                      id="recovery-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={FORGOT_PASSWORD_DATA.step1.emailPlaceholder}
                      className="w-full rounded-xl border border-stone-200 bg-[#FAF6F1] py-2.5 pr-4 pl-10 text-sm text-stone-800 placeholder-stone-400 transition focus:border-teal-700 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <p className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-teal-700" />
                  <span>{FORGOT_PASSWORD_DATA.step1.securityNote}</span>
                </p>

                <button
                  type="submit"
                  disabled={isSending}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#276B6B] py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#1F5757] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>
                    {isSending
                      ? FORGOT_PASSWORD_DATA.step1.loadingBtn
                      : FORGOT_PASSWORD_DATA.step1.submitBtn}
                  </span>
                  {!isSending && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              <div className="my-5 border-t border-stone-100" />

              <div className="text-center">
                <Link
                  href={FORGOT_PASSWORD_DATA.header.loginHref}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 transition hover:text-teal-800"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>{FORGOT_PASSWORD_DATA.step1.backToLoginText}</span>
                </Link>
              </div>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-stone-400">
                {FORGOT_PASSWORD_DATA.step1.hostPromptPrefix}{" "}
                <Link
                  href="#"
                  className="font-semibold text-teal-800 hover:underline"
                >
                  {FORGOT_PASSWORD_DATA.step1.hostPromptLink}
                </Link>
              </p>
            </div>
          )}

          {/* ======================================== */}
          {/* STEP 2: LINK SENT                        */}
          {/* ======================================== */}
          {step === 2 && (
            <div>
              {/* Top Icon Badge */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F3F1] text-teal-800">
                <FORGOT_PASSWORD_DATA.step2.icon className="h-5 w-5" />
              </div>

              {/* Status Pill */}
              <div className="mb-3 flex justify-center">
                <span className="rounded-full bg-[#F4E6D4] px-3 py-1 text-[11px] font-semibold text-amber-900">
                  {FORGOT_PASSWORD_DATA.step2.badge}
                </span>
              </div>

              <h1 className="text-center text-2xl font-bold tracking-tight text-stone-900">
                {FORGOT_PASSWORD_DATA.step2.title}
              </h1>
              <p className="mx-auto mt-2.5 max-w-sm text-center text-xs leading-relaxed text-stone-500 sm:text-sm">
                {FORGOT_PASSWORD_DATA.step2.subtitlePrefix}{" "}
                <strong className="font-semibold text-stone-800">
                  {email}
                </strong>
                . {FORGOT_PASSWORD_DATA.step2.subtitleSuffix}
              </p>

              {/* Warm Beige Info Box */}
              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#FAF1E6] p-4 text-left">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-800" />
                <div>
                  <h2 className="text-xs font-bold text-stone-800">
                    {FORGOT_PASSWORD_DATA.step2.infoBoxTitle}
                  </h2>
                  <p className="mt-1 text-[11px] leading-relaxed text-stone-600">
                    {FORGOT_PASSWORD_DATA.step2.infoBoxBody}
                  </p>
                </div>
              </div>

              {/* Resend Countdown Button */}
              <button
                type="button"
                disabled={resendTimer > 0 || isSending}
                onClick={handleResendLink}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#F4E6D4] py-3 text-xs font-semibold text-stone-700 transition hover:bg-[#EDD8BF] disabled:cursor-not-allowed disabled:opacity-75"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${isSending ? "animate-spin" : ""}`}
                />
                <span>
                  {resendTimer > 0
                    ? `${FORGOT_PASSWORD_DATA.step2.resendWaitPrefix} ${resendTimer}s`
                    : FORGOT_PASSWORD_DATA.step2.resendReadyText}
                </span>
              </button>

              {/* Preview Link to Step 3 */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="cursor-pointer text-xs font-semibold text-teal-800 hover:underline"
                >
                  {FORGOT_PASSWORD_DATA.step2.previewLinkText}
                </button>
              </div>

              <div className="my-5 border-t border-stone-100" />

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-stone-700 transition hover:text-teal-800"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>{FORGOT_PASSWORD_DATA.step2.differentEmailText}</span>
                </button>
              </div>
            </div>
          )}

          {/* ======================================== */}
          {/* STEP 3: SET NEW PASSWORD                 */}
          {/* ======================================== */}
          {step === 3 && (
            <div>
              {/* Top Icon Badge */}
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6ECE1] text-teal-800">
                <FORGOT_PASSWORD_DATA.step3.icon className="h-5 w-5" />
              </div>

              <h1 className="text-center text-2xl font-bold tracking-tight text-stone-900">
                {FORGOT_PASSWORD_DATA.step3.title}
              </h1>
              <p className="mx-auto mt-2.5 max-w-sm text-center text-xs leading-relaxed text-stone-500 sm:text-sm">
                {FORGOT_PASSWORD_DATA.step3.subtitle}
              </p>

              <form onSubmit={handleUpdatePassword} className="mt-6 space-y-4">
                {/* New Password Input */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-1.5 block text-xs font-semibold text-stone-700"
                  >
                    {FORGOT_PASSWORD_DATA.step3.newPasswordLabel}
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder={
                        FORGOT_PASSWORD_DATA.step3.newPasswordPlaceholder
                      }
                      className="w-full rounded-xl border border-stone-200 bg-[#FAF6F1] py-2.5 pr-11 pl-10 text-sm text-stone-800 placeholder-stone-400 transition focus:border-teal-700 focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      aria-label={
                        showNewPassword ? "Hide password" : "Show password"
                      }
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3.5 text-stone-400 transition hover:text-stone-700"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Passphrase Strength Meter */}
                  <div className="mt-2.5">
                    <div className="mb-1 flex items-center justify-between text-[11px]">
                      <span className="text-stone-500">
                        {FORGOT_PASSWORD_DATA.step3.strengthLabel}
                      </span>
                      <span className="font-semibold text-stone-700">
                        {strength.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[1, 2, 3].map((barIndex) => (
                        <div
                          key={barIndex}
                          className={`h-1.5 rounded-full transition-colors ${
                            strength.bars >= barIndex
                              ? strength.color
                              : "bg-stone-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Confirm New Password Input */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-1.5 block text-xs font-semibold text-stone-700"
                  >
                    {FORGOT_PASSWORD_DATA.step3.confirmPasswordLabel}
                  </label>
                  <div className="relative">
                    <ShieldCheck className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={
                        FORGOT_PASSWORD_DATA.step3.confirmPasswordPlaceholder
                      }
                      className="w-full rounded-xl border border-stone-200 bg-[#FAF6F1] py-2.5 pr-11 pl-10 text-sm text-stone-800 placeholder-stone-400 transition focus:border-teal-700 focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3.5 text-stone-400 transition hover:text-stone-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Validation Rules */}
                <ul className="space-y-1.5 pt-1 text-xs">
                  <li
                    className={`flex items-center gap-2 ${
                      hasMinLength ? "text-teal-800" : "text-stone-400"
                    }`}
                  >
                    <Check
                      className={`h-3.5 w-3.5 shrink-0 ${
                        hasMinLength ? "text-teal-700" : "text-stone-300"
                      }`}
                    />
                    <span>{FORGOT_PASSWORD_DATA.step3.rules.length}</span>
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      hasCombo ? "text-teal-800" : "text-stone-400"
                    }`}
                  >
                    <Check
                      className={`h-3.5 w-3.5 shrink-0 ${
                        hasCombo ? "text-teal-700" : "text-stone-300"
                      }`}
                    />
                    <span>{FORGOT_PASSWORD_DATA.step3.rules.complexity}</span>
                  </li>
                </ul>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#276B6B] py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#1F5757] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>
                    {isUpdating
                      ? FORGOT_PASSWORD_DATA.step3.loadingBtn
                      : FORGOT_PASSWORD_DATA.step3.submitBtn}
                  </span>
                  {!isUpdating && <CheckCircle2 className="h-4 w-4" />}
                </button>
              </form>

              <div className="my-5 border-t border-stone-100" />

              {/* Back to Step 1 */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-stone-700 transition hover:text-teal-800"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>{FORGOT_PASSWORD_DATA.step3.backToRequestText}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Trust Badge Pill */}
        <div className="mt-6 flex items-center gap-1.5 rounded-full bg-[#F3E7D9] px-4 py-1.5 text-[11px] font-medium text-stone-600">
          <MapPin className="h-3.5 w-3.5 text-teal-800" />
          <span>{FORGOT_PASSWORD_DATA.trustBadge}</span>
        </div>
      </main>

      {/* ========================================== */}
      {/* FOOTER                                     */}
      {/* ========================================== */}
      <footer className="border-t border-stone-200/60 bg-[#F7EFE6] px-6 py-5 text-xs text-stone-500 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2 text-center md:justify-start md:text-left">
            <Logo size={24} choice={true} />
            <span className="flex items-center gap-1">
              <FORGOT_PASSWORD_DATA.footer.copyRight className="h-3.5 w-3.5 shrink-0" />
              <span>
                {FORGOT_PASSWORD_DATA.footer.date()}{" "}
                {FORGOT_PASSWORD_DATA.footer.statement}
              </span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {FORGOT_PASSWORD_DATA.footer.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition hover:text-stone-800 hover:underline"
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
