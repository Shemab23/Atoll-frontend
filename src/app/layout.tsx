import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/Global/AppProvider";
import { SessionProvider } from "@/context/Session/SessionProvider";
import { ThemeToggle } from "@/components/feature/toggleTheme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atoll",
  description: "Minimalist community discussions",
  icons: {
    icon: "/logo/Atoll.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen w-full bg-bg text-text antialiased selection:bg-brand/20 selection:text-text">
        <ThemeToggle />
        <SessionProvider>
          <AppProvider>{children}</AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
