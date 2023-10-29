import { Header } from '@/components/index';
import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, League_Spartan } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from './context/AuthProvider';

const monserat = Montserrat({ subsets: ['latin'], variable: '--font-monserat' });
const spartan = League_Spartan({ subsets: ['latin'], weight: '400', variable: '--font-spartan' });

export const metadata: Metadata = {
  title: 'Платформа для навчання',
  description:
    'Дана аплікація створена з освітньому метою, на ній будуть розміщені навчальні матеріали, які необхідні для проходження курсу "Основи HTML, CSS та Javascript"',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ua">
      <body className={`${monserat.variable} ${spartan.variable}`}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
