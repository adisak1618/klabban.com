{
  /* <MainMenu /> */
}

import { MainMenu } from "components/MainMenu";

export default function RootLayout({
  children,
  ...otherPRops
}: {
  children: React.ReactNode;
}) {
  console.log("otherPRops", otherPRops);
  return (
    <>
      {/* <MainMenu /> */}
      {children}
    </>
  );
}

export const revalidate = 3600;
