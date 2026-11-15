import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="text-sm text-text-muted">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-text-inverse"
      >
        Back to Home
      </Link>
    </div>
  );
}
