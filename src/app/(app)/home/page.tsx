"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/context/Session/SessionContext";

export default function HomePage() {
  const router = useRouter();
  const { clearSession, isAuthenticated, isCheckingSession } = useSession();

  // Redirect to /login if no active session exists
  useEffect(() => {
    if (!isCheckingSession && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isCheckingSession, isAuthenticated, router]);

  // Prevent flashing protected content before session check finishes
  if (isCheckingSession || !isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    clearSession();
    toast.success("Logged out successfully.");
    router.replace("/login");
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6">
      {/* Top-Left Logout Button */}
      <button
        type="button"
        onClick={handleLogout}
        className="absolute top-6 left-6 flex cursor-pointer items-center gap-2 rounded-full border border-root/40 bg-bg-card px-4 py-2 text-sm font-medium text-text shadow-sm transition hover:bg-red-500/10 hover:text-red-600"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>

      <h1 className="text-2xl font-bold">Welcome to Atoll Home</h1>
    </main>
  );
}
