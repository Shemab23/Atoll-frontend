import { ThemeToggle } from "@/components/feature/toggleTheme";
import { AppProvider } from "@/context/Global/AppProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-bg text-text flex flex-col">
      <ThemeToggle />
      <header className="flex sticky top-0 z-40 w-full border-b h-15 items-center justify-center md:px-4">
        App header
      </header>
      <div className="flex w-full max-w-7xl flex-1 gap-6 md:px-4 items-center justify-center">
        <main className="min-w-0">
          <AppProvider>{children}</AppProvider>
        </main>
      </div>
      <div className="flex bottom-0 z-40 w-full border-t h-15 items-center justify-center md:px-4">
        footer
      </div>
    </div>
  );
}
