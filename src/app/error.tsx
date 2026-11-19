"use client";

import { useEffect } from "react";

function isBrowserExtensionError(error: Error): boolean {
  const message = error?.message || "";
  const stack = error?.stack || "";

  return (
    message.includes("message channel closed before a response was received") ||
    message.includes("Extension context invalidated") ||
    stack.includes("chrome-extension://") ||
    stack.includes("moz-extension://")
  );
}

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isExtensionError = isBrowserExtensionError(error);

  useEffect(() => {
    if (isExtensionError) {
      reset();
      return;
    }

    console.error("Application Error:", error);
  }, [error, isExtensionError, reset]);

  if (isExtensionError) {
    return null;
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-sm text-text-muted">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-lg bg-bg-inverse px-4 py-2 text-sm font-medium text-text-inverse"
      >
        Try again
      </button>
    </div>
  );
}
