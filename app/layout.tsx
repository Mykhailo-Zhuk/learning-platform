import { Header } from "@/components/index";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, League_Spartan, Lora, IBM_Plex_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "./context/AuthProvider";
import { Analytics } from "@vercel/analytics/react";

const monserat = Montserrat({ subsets: ["latin"], variable: "--font-monserat" });
const spartan = League_Spartan({ subsets: ["latin"], weight: "400", variable: "--font-spartan" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-plex" });

export const metadata: Metadata = {
  title: "Платформа для навчання",
  description:
    "Дана аплікація створена з освітньому метою, на ній будуть розміщені навчальні матеріали, які необхідні для проходження курсу &quot;Основи HTML, CSS та Javascript&quot;",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ua">
      <body
        className={`${monserat.variable} ${spartan.variable} ${lora.variable} ${plex.variable}`}>
        <AuthProvider>
          <Header />
          {children}
          <Analytics />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
