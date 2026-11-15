// import { AppHeader } from "@/components/layout/AppHeader";
// import { AppSidebar } from "@/components/layout/AppSidebar";
// import { MobileNavigation } from "@/components/layout/MobileNavigation";

import { AppProvider } from "@/context/AppProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-bg text-text flex flex-col">
      {/* Full-width top bar border, constrained inner content */}
      <header className="sticky top-0 z-40 w-full border-b bg-bg/95 backdrop-blur">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* <AppHeader /> */} App header
        </div>
      </header>

      {/* Constrained main workspace with side spacing on desktop */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 sm:px-6 lg:px-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0 border-r py-6 pr-6">
          {/* <AppSidebar /> */} App side bar
        </aside>

        {/* Main Page Content */}
        <main className="min-w-0 flex-1 py-6 pb-20 md:pb-8">
          <AppProvider>{children}</AppProvider>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-bg md:hidden">
        {/* <MobileNavigation /> */} mobile navigation
      </nav>
    </div>
  );
}
