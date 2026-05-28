import { DeleteInvoiceButton } from './DeleteInvoiceButton';
import { fetchInvoices } from '@/app/lib/data';

type Invoice = {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string;
};

export default async function InvoicesPage() {
  const invoices: Invoice[] = await fetchInvoices();

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Invoices</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.customer}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.status}</td>
              <td>{invoice.date}</td>
              <td>
                <a
                  href={`/invoices/${invoice.id}/edit`}
                  className="text-blue-600 mr-2"
                >
                  Edit
                </a>
                <DeleteInvoiceButton id={invoice.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
