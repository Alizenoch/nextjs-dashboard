import { formatCurrency } from "./format";

describe("formatCurrency", () => {
  it("formats numbers as USD currency", () => {
    expect(formatCurrency(500)).toBe("$500.00");
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  it("handles zero and negative values", () => {
    expect(formatCurrency(0)).toBe("$0.00");
    expect(formatCurrency(-99.99)).toBe("-$99.99");
  });
});
