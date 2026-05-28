import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex items-center space-x-4">
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="Profile picture"
            className="w-12 h-12 rounded-full"
          />
        )}
        <div>
          <p className="font-semibold">Welcome, {session.user?.name || "User"}!</p>
          <p className="text-gray-600">{session.user?.email}</p>
        </div>
      </div>
      <p className="mt-6 text-gray-600">
        You are now logged in and can view your dashboard.
      </p>
    </div>
  );
}
