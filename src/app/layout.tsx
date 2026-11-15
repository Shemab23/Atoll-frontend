import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppProvider";
// import { ThemeProvider } from "@/providers/ThemeProvider";
// import { QueryProvider } from "@/providers/QueryProvider";
// import { AppProvider } from "@/context/AppProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atoll",
  description: "Minimalist community discussions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen w-full bg-bg text-text antialiased selection:bg-brand/20 selection:text-text">
        {/* Uncomment providers once created */}
        {/* <ThemeProvider> */}
        {/* <QueryProvider> */}
        <AppProvider>{children}</AppProvider>
        {/* </QueryProvider> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
