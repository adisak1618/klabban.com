import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "klabban-commerce/react";
import { Anuphan } from "next/font/google";
const anuphan = Anuphan({
  display: "swap",
  preload: true,
  variable: "--font-anuphan",
  subsets: ["thai", "latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={anuphan.variable}>
      <body>
        <QueryProvider GQL_URL={process.env.GQL_URL as string}>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
