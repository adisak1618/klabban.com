import { MainMenu } from "components/MainMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainMenu />
      {children}
    </>
  );
}

// export const revalidate = 3600;
