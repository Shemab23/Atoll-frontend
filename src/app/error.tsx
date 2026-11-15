"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-sm text-text-muted">{error.message}</p>
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
