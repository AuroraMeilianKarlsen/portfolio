import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className="scroll-smooth bg-gray-900">
      <body className="bg-gray-900">
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
