export default function GlobalLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-bg-muted" />
      <div className="h-32 w-full animate-pulse rounded-xl border bg-bg-muted" />
      <div className="h-32 w-full animate-pulse rounded-xl border bg-bg-muted" />
    </div>
  );
}
