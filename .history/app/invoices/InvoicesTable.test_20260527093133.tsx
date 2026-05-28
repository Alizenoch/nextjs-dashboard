import { render, screen } from "@testing-library/react";
import InvoicesTable from "./InvoicesTable";

describe("InvoicesTable", () => {
  it("renders invoice customer name, amount, and status", () => {
    const invoices = [
      {
        id: "1",
        customer: "Acme Corp",
        amount: 500,
        status: "paid",
        date: new Date("2026-06-01"),
      },
    ];

    render(<InvoicesTable invoices={invoices} />);

    // Customer name
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();

    // Amount formatted as currency
    expect(screen.getByText("$500.00")).toBeInTheDocument();

    // Status
    expect(screen.getByText(/paid/i)).toBeInTheDocument();
  });
});
