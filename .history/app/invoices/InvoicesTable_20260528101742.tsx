import React from "react";

type Invoice = {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: Date;
};

export default function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Customer</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Amount</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="px-4 py-2">{invoice.customer}</td>
              <td className="px-4 py-2">
                {invoice.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td className="px-4 py-2 capitalize">{invoice.status}</td>
              <td className="px-4 py-2">
                {invoice.date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
