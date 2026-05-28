'use client';

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 border-b">
      <Link href="/dashboard" className="text-xl font-bold">
        My Dashboard
      </Link>
      <nav className="flex gap-4">
        <Link href="/invoices" className="text-blue-600 hover:underline">
          Invoices
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
        
      </nav>
    </header>
  );
}
