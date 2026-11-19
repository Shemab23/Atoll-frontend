import {
  Compass,
  Sparkles,
  Heart,
  MessageCircle,
  Copyright,
} from "lucide-react";

export const REGISTER_PAGE_DATA = {
  leftSide: {
    title: "Join Atoll, your social companion",
    slogan: "Your circle. Your picks. Your vibe.",
    features: [
      {
        id: "discover",
        label: "Discover",
        description: "Explore local stories, events, and hidden gems.",
        icon: Compass,
      },
      {
        id: "recommend",
        label: "Recommend",
        description: "Share your favorite cafés, music, and trusted picks.",
        icon: Sparkles,
      },
      {
        id: "love",
        label: "Find Love",
        description: "Spark genuine romance with people who match your vibe.",
        icon: Heart,
      },
      {
        id: "interact",
        label: "Interact",
        description: "Join thoughtful conversations and grow your circle.",
        icon: MessageCircle,
      },
    ],
    slides: [
      {
        id: 1,
        image: "/images/groupFriend.jpg",
        // CORRECTION: your alt texts did not match the file names (groupFriend / couple /
        // library vs "person in autumn leaves" / "forest"). Alt text must describe the REAL
        // image, so I rewrote them from the file names. Check them against the actual photos.
        alt: "Group of friends laughing together outdoors",
        badge: "Your Circle",
        hook: "Your circle starts with real conversations and shared moments.",
      },
      {
        id: 2,
        image: "/images/couple.jpg",
        alt: "Couple enjoying a warm moment together outdoors",
        badge: "Your Vibe",
        hook: "Your vibe attracts real chemistry, without the endless swiping.",
      },
      {
        id: 3,
        image: "/images/library.jpg",
        alt: "Quiet library with shelves of books",
        badge: "Your Picks",
        hook: "Your picks put the best local spots and hidden gems on the map.",
      },
    ],
  },

  rightSide: {
    background: {
      path: "/images/bg2.jpg",
      alt: "", // decorative backdrop: empty alt so screen readers skip it
    },
    welcome: "Welcome to Atoll",
    card: {
      title: "Create Your Account",
      subtitle: "Join your community exchange in under a minute.",

      fullNameLabel: "Full name",
      fullNamePlaceholder: "e.g. Keza Aline",

      usernameLabel: "Username",
      usernamePlaceholder: "e.g. keza_rw",
      usernameHint: "3–20 characters: letters, numbers, underscores.",

      emailLabel: "Email address",
      emailPlaceholder: "keza.aline@atoll.rw",

      passwordLabel: "Password",
      // CORRECTION: the placeholder repeated the rule and vanished while typing.
      // The rule is now a hint (always visible); the placeholder is just a prompt.
      passwordPlaceholder: "Create a password",
      passwordHint: "At least 8 characters.",

      confirmPasswordLabel: "Confirm password",
      confirmPasswordPlaceholder: "Re-enter your password",

      submitBtn: "Join Atoll",
      loadingBtn: "Setting up your space…",
      alreadyHaveAccount: "Already part of the community?",
      loginLink: "Log in",
    },
    // Error messages live with the rest of the copy, so the schema has no hard-coded text.
    errors: {
      required: "This field is required.",
      fullName: "Please enter your full name.",
      username: "Use 3–20 letters, numbers or underscores.",
      email: "Please enter a valid email address.",
      passwordMin: "Password must be at least 8 characters.",
      passwordMismatch: "Passwords do not match.",
    },
    footer: {
      copyRight: Copyright,
      date: () => new Date().getFullYear(),
      statement: "Atoll Community Exchange • Kigali, Rwanda",
    },
  },

  toasts: {
    success: "Account created! Welcome to Atoll.",
    error: "Could not create account. Please try again.",
  },
};
