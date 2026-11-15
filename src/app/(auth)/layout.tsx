import { AppProvider } from "@/context/AppProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-bg text-text flex flex-col items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md">
        <AppProvider>{children}</AppProvider>
      </div>
    </div>
  );
}
