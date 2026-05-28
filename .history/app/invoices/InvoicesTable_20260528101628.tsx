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
    <table>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.customer}</td>
            <td>
              {invoice.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </td>
            <td>{invoice.status}</td>
            <td>{invoice.date.toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
