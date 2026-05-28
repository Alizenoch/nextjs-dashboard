// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();

  // ✅ Redirect if not logged in
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {session.user?.name || "User"}!</p>
      <p className="text-gray-600">You are now logged in and can view your dashboard.</p>
    </div>
  );
}
