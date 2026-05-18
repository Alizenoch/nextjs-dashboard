// app/lib/definitions.ts
export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // Only 'pending' or 'paid' allowed
  status: 'pending' | 'paid';
};
