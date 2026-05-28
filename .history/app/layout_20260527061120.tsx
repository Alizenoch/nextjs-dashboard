// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Header from './header';
import Providers from "./providers";
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'My Dashboard',
    template: '%s | My Dashboard',
  },
  description: 'Manage invoices, customers, and settings with ease.',
  openGraph: {
    title: 'My Dashboard',
    description: 'A modern dashboard for managing invoices and customers.',
    url: 'https://yourdomain.com',
    siteName: 'My Dashboard',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Dashboard',
    description: 'Track invoices and customers in one place.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* Accessible header landmark */}
          <header>
            <Header />
          </header>

          {/* Main content landmark */}
          <main>{children}</main>

          {/* Accessible footer landmark */}
          <footer className="p-4 text-sm text-gray-600 border-t bg-gray-50">
            © {new Date().getFullYear()} My Dashboard
          </footer>

          {/* ✅ Toast notifications available everywhere */}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
