// app/lib/placeholder-data.ts
import { Customer, Invoice } from './definitions';

import postgres
export const customers: Customer[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    image_url: '/customers/alice.png',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    image_url: '/customers/bob.png',
  },
  // Add more customers as needed
];

export const invoices: Invoice[] = [
  {
    id: '101',
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    id: '102',
    customer_id: customers[1].id,
    amount: 20348,
    status: 'paid',
    date: '2022-11-14',
  },
  // Add more invoices as needed
];
