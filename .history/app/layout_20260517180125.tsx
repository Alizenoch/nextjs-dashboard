// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Dashboard",
  description: "A simple dashboard tutorial app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-zinc-50 dark:bg-black">
        <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-6 py-4">
          <nav className="flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/invoices">Invoices</Link>
            <Link href="/customers">Customers</Link>
            <Link href="/settings">Settings</Link>
          </nav>
        </header>
        <main className="p-6 flex-1">{children}</main>
      </body>
    </html>
  );
}
