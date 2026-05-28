// app/dashboard/LatestInvoices.tsx
export default function LatestInvoices({
  latestInvoices,
  currency,
}: {
  latestInvoices: {
    id: number;
    customer: string;
    email: string;
    amount: number;
    status: string;
  }[];
  currency: "USD" | "PGK";
}) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-white font-bold mb-4">Latest Invoices</h2>
      <ul className="divide-y divide-gray-700">
        {latestInvoices.map((invoice) => (
          <li
            key={invoice.id}
            className="py-2 flex justify-between items-center text-gray-300"
          >
            <div>
              <p className="font-semibold">{invoice.customer}</p>
              <p className="text-sm">{invoice.email}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-400 font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency,
                  maximumFractionDigits: 0,
                }).format(invoice.amount)}
              </p>
              <span
                className={`ml-2 px-2 py-1 rounded text-xs ${
                  invoice.status === "paid"
                    ? "bg-green-600 text-white"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {invoice.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
