// app/NavLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Invoices", href: "/invoices" },
  { name: "Customers", href: "/customers" },
  { name: "Settings", href: "/settings" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={clsx(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
              : "text-zinc-700 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
