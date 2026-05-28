// app/invoices/page.tsx
import { fetchInvoices } from '../lib/data'; // ✅ only import what you use
import Link from 'next/link';

export default async function InvoicesPage() {
  const invoices = await fetchInvoices();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Invoices</h1>
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
          {invoices.map(
            (i: { id: string; customer: string; amount: number; status: string; date: string }) => (
              <tr key={i.id}>
                <td className="border p-2">{i.customer}</td>
                <td className="border p-2">${i.amount}</td>
                <td className="border p-2">{i.status}</td>
                <td className="border p-2">{new Date(i.date).toLocaleDateString()}</td>
                <td className="border p-2">
                  <Link href={`/invoices/create/${i.id}/edit`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
