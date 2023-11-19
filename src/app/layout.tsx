import "./globals.css";
import { draftMode } from "next/headers";

import type { Metadata } from "next";
import { QueryProvider } from "klabban-commerce/react";
import { authOptions, getServerSession } from "klabban-commerce/auth";
import { Anuphan } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Footer } from "components/Footer.tsx";
import { KlabbanConfig } from "libs/klabbanConfig";
import { GtmTag } from "components/GTM";

const anuphan = Anuphan({
  display: "swap",
  preload: true,
  variable: "--font-anuphan",
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "Klabban.com",
  description: "Travel Bike Life Technology",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = draftMode();

  // important!!! this line for static generattion will alway get unauthenticate session we disable server session on draftmode
  const session = isEnabled
    ? undefined
    : await getServerSession(authOptions({ GQL_URL: KlabbanConfig.GQL_URL }));

  return (
    <html lang="th" className={anuphan.variable}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#ffffff"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="">
        <NextTopLoader color="var(--primary-color)" />
        <QueryProvider
          GQL_URL={process.env.GQL_URL as string}
          session={session}
        >
          <div className="min-h-[85vh]">{children}</div>
          <Footer />
        </QueryProvider>
        <GtmTag />
      </body>
    </html>
  );
}

// export const revalidate = 3600;
