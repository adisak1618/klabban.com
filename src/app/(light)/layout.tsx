import { MainMenu } from "components/MainMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainMenu light />
      {children}
    </>
  );
}

export const revalidate = 3600;
