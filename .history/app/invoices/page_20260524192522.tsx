// app/invoices/page.tsx
import { fetchInvoices } from '../lib/data';
import Link from 'next/link';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { deleteInvoice } from '../lib/actions'; // ✅ import delete action
import toast from 'react-hot-toast'; // ✅ import toast

export default async function InvoicesPage({ searchParams }: { searchParams?: { q?: string } }) {
  // ✅ Check if user is logged in
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  const search = searchParams?.q || '';
  const invoices = await fetchInvoices(search);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const statusClass = (status: string) =>
    status.toLowerCase() === 'paid'
      ? 'text-green-600 font-semibold'
      : status.toLowerCase() === 'pending'
      ? 'text-yellow-600 font-semibold'
      : 'text-gray-600';

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Invoices</h1>
        <Link
          href="/invoices/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Invoice
        </Link>
      </div>

      <form className="mb-4">
        <input
          type="text"
          name="q"
          defaultValue={search}
          placeholder="Search by customer or status..."
          className="border p-2 w-full rounded"
        />
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Customer</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((i) => (
            <tr key={i.id}>
              <td className="border p-2">{i.customer}</td>
              <td className="border p-2">{formatCurrency(i.amount)}</td>
              <td className={`border p-2 ${statusClass(i.status)}`}>{i.status}</td>
              <td className="border p-2">{new Date(i.date).toLocaleDateString()}</td>
              <td className="border p-2">
                <Link
                  href={`/invoices/create/${i.id}/edit`}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </Link>
                <form
                  action={async () => {
                    if (confirm("Are you sure you want to delete this invoice?")) {
                      try {
                        await deleteInvoice(i.id);
                        toast.success("Invoice deleted successfully!"); // ✅ success toast
                      } catch (err) {
                        toast.error("Failed to delete invoice. Please try again."); // ✅ error toast
                      }
                    }
                  }}
                >
                  <button
                    type="submit"
                    className="text-red-600 hover:underline ml-2"
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
