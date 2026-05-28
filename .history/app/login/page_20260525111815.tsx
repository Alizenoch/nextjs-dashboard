'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <button
        onClick={() => signIn("github")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign in with GitHub
      </button>
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}

    </div>
  );
}
