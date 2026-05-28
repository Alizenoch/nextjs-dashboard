// app/query/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const result = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
