import { ThemeToggle } from "@/components/feature/toggleTheme";
import { Toaster } from "sonner";
import { AppProvider } from "@/context/Global/AppProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen">
      <ThemeToggle />
      <div className="w-full">
        <AppProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AppProvider>
      </div>
    </div>
  );
}
