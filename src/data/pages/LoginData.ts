import { Copyright } from "lucide-react";
import type { ImageCardProps } from "@/components/ui/imageCard1";

export type reportMotivesType = "issue" | "struggle" | "suggestion";

export const LOGIN_PAGE_CONTENT = {
  hero: {
    titlePrefix: "Welcome back to your",
    titleHighlight: "circle.",
    description:
      "Pick up right where you left off—catch up on neighborhood updates, local errands, and trusted recommendations.",
  },
  footerBar: {
    partnerAltPrefix: "Telecom partner",
    partnerMockImage:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=60",
    userCount: "1,000+",
    sizeMain: 50,
    sizeClass: 10,
    userLabel: "active neighbors",
    reportTooltip: "Having trouble signing in? Let us know",
    reportTriggerLabel: "Need Help?",
  },
  reportModal: {
    title: "Login Help & Feedback",
    closeAriaLabel: "Close modal",
    subtitle:
      "Having trouble signing in or spotted an issue? Let us know so we can help.",
    motiveLabel: "What is this about?",
    motives: [
      { id: "issue", label: "Issue / Bug" },
      { id: "struggle", label: "Struggle" },
      { id: "suggestion", label: "Suggestion" },
    ] as { id: reportMotivesType; label: string }[],
    emailLabel: "Email",
    emailOptionalHint: "(optional)",
    emailPlaceholder: "you@example.com",
    messageLabel: "Details",
    messagePlaceholder: "Describe the sign-in issue, bug, or suggestion...",
    submitIdle: "Send Report",
    submitLoading: "Sending...",
  },
  toasts: {
    reportSuccess:
      "Message sent! Thank you for helping keep the circle running smoothly.",
    reportError: "Something went wrong. Please try again.",
  },
};

// `satisfies` checks every entry against ImageCardProps but keeps your keys
// (interest, place, shop, cautch) typed, so AUTH_IMAGES.shop autocompletes.
export const AUTH_IMAGES = {
  interest: {
    img: "/images/library.png",
    alt: "Quiet study and reading spot",
    motive: "share interests",
    size: "160px",
    kind: "square",
    positionClass: "left-8 top-0 z-20 -rotate-6",
  },
  place: {
    img: "/images/restaurant.png",
    alt: "Local restaurant meetup",
    motive: "plan meetup",
    size: "180px",
    kind: "square",
    positionClass: "right-4 top-4 z-10 rotate-3",
  },
  shop: {
    img: "/images/shopping.png",
    alt: "Neighborhood market and errands",
    motive: "recommend",
    size: "180px",
    kind: "square",
    positionClass: "bottom-0 left-18 z-30 rotate-6",
  },
  cautch: {
    img: "/images/cautch.png",
    alt: "Cozy neighbor lounge",
    motive: "in your comfort",
    size: "112px",
    kind: "square",
    positionClass: "bottom-3 right-3 z-40 -rotate-6",
  },
} satisfies Record<string, ImageCardProps>;

// CORRECTION: renamed SingInData -> SIGN_IN_DATA (typo + same naming style as REGISTER_PAGE_DATA).
// Find-and-replace `SingInData` in any other file that imports it.
export const SIGN_IN_DATA = {
  background: {
    path: "/images/bgAtoll.jpg",
    alt: "", // decorative backdrop: empty alt so screen readers skip it
  },
  welcome: "Welcome back",
  card: {
    title: "Log in",
    subtitle: "Welcome back to your local neighborhood exchange.",

    // CORRECTION: this field accepts an email OR a username (the old label said only "Email").
    identifierLabel: "Email or username",
    identifierPlaceholder: "email@provider.domain",

    // CORRECTION: label was lowercase "password" and the placeholder was "***********",
    // which looks like a value that is already typed in.
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",

    logBtn: "Log in",
    loadingBtn: "Logging in…",

    forgotPassword: "Forgot password?",
    createAccount: "Create a new account",
  },
  // Login only checks "not empty". The server decides if credentials are right. Do NOT reuse
  // the register rules (min 8 etc.): older accounts may not meet them and would be locked out.
  errors: {
    identifier: "Enter your email or username.",
    password: "Enter your password.",
  },
  footer: {
    copyRight: Copyright,
    date: () => new Date().getFullYear(),
    statement: "Atoll Community Exchange • Kigali, Rwanda",
  },
};
