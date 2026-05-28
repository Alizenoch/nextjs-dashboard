// --- Types ---
type LatestInvoice = {
  id: number;
  customer: string;
  email: string;
  amount: number;
  status: string;
  date: string;
};

// Fetch the latest 5 invoices
export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  return sql<LatestInvoice[]>`
    SELECT invoices.id,
           invoices.amount,
           invoices.status,
           invoices.issued_at AS date,
           customers.name AS customer,
           customers.email
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.issued_at DESC
    LIMIT 5
  `;
}
