import "./globals.css";

import type { Metadata } from "next";
import { QueryProvider } from "klabban-commerce/react";
import { Anuphan, Sriracha } from "next/font/google";
import { MainMenu } from "components/MainMenu";

const anuphan = Anuphan({
  display: "swap",
  preload: true,
  variable: "--font-anuphan",
  subsets: ["thai", "latin"],
});

const sriracha = Sriracha({
  display: "swap",
  variable: "--font-sriracha",
  subsets: ["thai", "latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  ...otherProps
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anuphan.variable} ${sriracha.variable}`}>
      <body className="">
        <QueryProvider GQL_URL={process.env.GQL_URL as string}>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}

export const revalidate = 3600;
