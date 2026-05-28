// app/layout.tsx
import type { Metadata } from "next";
import { inter } from "./ui/fonts";   // import Inter from your fonts.ts
import "./globals.css";
import NavLinks from "./NavLinks";

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
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-full flex flex-col bg-zinc-50 dark:bg-black`}>
        <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-6 py-4">
          <NavLinks />
        </header>
        <main className="p-6 flex-1">{children}</main>
      </body>
    </html>
  );
}
