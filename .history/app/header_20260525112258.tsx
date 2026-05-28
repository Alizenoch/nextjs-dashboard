'use client';

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 border-b">
      <Link href="/dashboard" className="text-xl font-bold">
        My Dashboard
      </Link>
      <nav className="flex gap-4">
        <Link href="/invoices" className="text-blue-600 hover:underline">
          Invoices
        </Link>
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
