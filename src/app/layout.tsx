import "./globals.css";
import { draftMode } from "next/headers";

import type { Metadata } from "next";
import { QueryProvider } from "klabban-commerce/react";
import { authOptions, getServerSession } from "klabban-commerce/auth";
import { Kanit } from "next/font/google";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Footer } from "components/Footer.tsx";
import { KlabbanConfig } from "libs/klabbanConfig";
import { GtmTag } from "components/GTM";
import clsx from "clsx";

const kanitFont = Kanit({
  display: "swap",
  preload: true,
  variable: "--font-kanit",
  subsets: ["thai"],
  weight: ["700", "600", "400", "300"],
});

const MontserratFont = Montserrat({
  preload: true,
  variable: "--font-montserrat",
  subsets: ["latin"],
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
    <html
      lang="th"
      className={clsx(kanitFont.variable, MontserratFont.variable)}
    >
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
