// app/dashboard/LatestInvoices.tsx
'use client';

interface Invoice {
  amount: number;
  name: string;
  email: string;
  image_url: string;
}

interface LatestInvoicesProps {
  latestInvoices: Invoice[];
}

export default function LatestInvoices({ latestInvoices }: LatestInvoicesProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow md:col-span-4 lg:col-span-4">
      <h2 className="text-lg font-semibold">Latest Invoices</h2>
      <table className="mt-4 w-full text-left">
        <thead>
          <tr>
            <th className="py-2">Customer</th>
            <th className="py-2">Email</th>
            <th className="py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {latestInvoices.map((invoice, idx) => (
            <tr key={idx}>
              <td className="py-2">{invoice.name}</td>
              <td className="py-2">{invoice.email}</td>
              <td className="py-2">${invoice.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
