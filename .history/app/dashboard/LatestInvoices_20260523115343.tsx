// app/dashboard/LatestInvoices.tsx
"use client";

interface LatestInvoicesProps {
  latestInvoices: {
    amount: number;
    name: string;
    image_url: string;
    email: string;
  }[];
  currency: "USD" | "PGK";
}

export default function LatestInvoices({ latestInvoices, currency }: LatestInvoicesProps) {
  return (
    <div className="rounded-lg bg-gray-900 p-6 shadow-md md:col-span-2 lg:col-span-4">
      <h2 className="text-sm font-medium text-gray-400">Latest Invoices</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Customer</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {latestInvoices.map((invoice, idx) => (
              <tr key={idx} className="hover:bg-gray-800">
                <td className="px-4 py-2 text-sm text-white">{invoice.name}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{invoice.email}</td>
                <td className="px-4 py-2 text-sm text-white">
                  {currency === "USD" ? `$${invoice.amount}` : `K${invoice.amount}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
