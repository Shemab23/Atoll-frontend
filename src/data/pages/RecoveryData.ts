import { KeyRound, Mail, Lock, Copyright } from "lucide-react";

export const FORGOT_PASSWORD_DATA = {
  header: {
    tagline: "Less Pressure. More Connection.",
    locationBadge: "Kigali, Rwanda",
    loginLinkText: "Log in",
    loginHref: "/login",
  },
  steps: [
    { id: 1, label: "1. Request link" },
    { id: 2, label: "2. Link sent" },
    { id: 3, label: "3. New password" },
  ],
  step1: {
    icon: KeyRound,
    title: "Forgot your password?",
    subtitle:
      "Enter the email linked to your Atoll account. We'll send a reset link so you can rejoin your neighbourhood without any hassle.",
    emailLabel: "Email address",
    emailPlaceholder: "keza.aline@atoll.rw",
    securityNote: "Secure link delivered within a few seconds.",
    submitBtn: "Send recovery link",
    loadingBtn: "Sending link…",
    backToLoginText: "Back to log in",
    hostPromptPrefix: "Part of Kimihurura, Kacyiru, or Nyarutarama exchange?",
    hostPromptLink: "Contact neighborhood host",
  },
  step2: {
    icon: Mail,
    badge: "Recovery email sent",
    title: "Check your inbox",
    subtitlePrefix: "We've sent a one-time reset link to",
    subtitleSuffix: "Click the link in the message to set a new password.",
    infoBoxTitle: "Take your time",
    infoBoxBody:
      "The link stays valid for 24 hours. If it doesn't arrive, check your spam folder or request a new one below.",
    resendWaitPrefix: "Resend link in",
    resendReadyText: "Resend recovery link",
    previewLinkText: "Dev only: skip to set new password",
    differentEmailText: "Use a different email address",
  },
  step3: {
    icon: Lock,
    title: "Create new password",
    subtitle:
      "Choose a secure password to protect your neighbourhood exchanges and messages.",
    newPasswordLabel: "New password",
    newPasswordPlaceholder: "Create a password",
    newPasswordHint:
      "At least 8 characters, with letters and a number or symbol.",
    confirmPasswordLabel: "Confirm new password",
    confirmPasswordPlaceholder: "Re-enter your new password",
    submitBtn: "Update password & enter Atoll",
    loadingBtn: "Updating password…",
    backToRequestText: "Back to recovery request",
  },
  trustBadge: "Rwanda's verified neighbourhood exchange network",
  errors: {
    required: "This field is required.",
    email: "Please enter a valid email address.",
    passwordMin: "Password must be at least 8 characters.",
    passwordCombo: "Use letters plus at least one number or symbol.",
    passwordMismatch: "Passwords do not match.",
  },
  footer: {
    copyRight: Copyright,
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
    linkResent: "A fresh recovery link has been sent.",
    resetSuccess: "Password updated! Welcome back to Atoll.",
    error: "Something went wrong. Please try again.",
  },
};
