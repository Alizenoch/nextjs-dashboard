export async function fetchInvoiceById(id: number): Promise<Invoice | null> {
  try {
    const result = await sql`
      SELECT i.id, c.name AS customer, c.email, i.amount, i.status, i.date
      FROM invoices i
      JOIN customers c ON i.customer_id = c.id
      WHERE i.id = ${id}
      LIMIT 1;
    `;
    const r = result.rows[0];
    return r
      ? {
          id: String(r.id), // still normalize to string for Invoice type
          customer: r.customer ?? '',
          email: r.email ?? '',
          amount: Number(r.amount),
          status: r.status as 'pending' | 'paid',
          date: r.date instanceof Date
            ? r.date.toISOString()
            : new Date(String(r.date)).toISOString(),
        }
      : null;
  } catch (err) {
    console.error("fetchInvoiceById error:", err);
    return null;
  }
}
