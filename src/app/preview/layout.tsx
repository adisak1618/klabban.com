import { PreviewModeBox } from "components/PreviewModeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <PreviewModeBox />
    </>
  );
}

// export const revalidate = 3600;
