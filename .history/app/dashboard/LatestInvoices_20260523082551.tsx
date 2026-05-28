// app/dashboard/latestnvoices.tsx
interface LatestInvoicesProps {
  latestInvoices: {
    amount: number;
    name: string;
    image_url: string;
    email: string;
  }[];
  currency?: "USD" | "PGK"; // ✅ added currency prop
}

export default function LatestInvoices({
  latestInvoices,
  currency = "USD",
}: LatestInvoicesProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">Invoices</h2>
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
              <td className="py-2 flex items-center gap-2">
                <img
                  src={invoice.image_url}
                  alt={invoice.name}
                  className="h-8 w-8 rounded-full"
                />
                {invoice.name}
              </td>
              <td className="py-2">{invoice.email}</td>
              <td className="py-2">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency,
                }).format(invoice.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
