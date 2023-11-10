import "./globals.css";
import { draftMode } from "next/headers";
import { PreviewModeBox } from "components/PreviewModeProvider";
import type { Metadata } from "next";
import { QueryProvider } from "klabban-commerce/react";
import { authOptions, getServerSession } from "klabban-commerce/auth";
import { Anuphan } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Footer } from "components/Footer.tsx";
import { KlabbanConfig } from "libs/klabbanConfig";

const anuphan = Anuphan({
  display: "swap",
  preload: true,
  variable: "--font-anuphan",
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
      <body className="">
        <NextTopLoader color="var(--primary-color)" />
        <QueryProvider
          GQL_URL={process.env.GQL_URL as string}
          session={session}
        >
          <div className="min-h-[85vh]">{children}</div>
          <Footer />
          <PreviewModeBox />
        </QueryProvider>
      </body>
    </html>
  );
}

// export const revalidate = 3600;
