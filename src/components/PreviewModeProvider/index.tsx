import { draftMode } from "next/headers";
import { PreviewBox } from "./previewBox";

interface PreviewModeProviderProps extends React.PropsWithChildren {}

async function disablePreview() {
  "use server";
}

export function PreviewModeProvider({ children }: PreviewModeProviderProps) {
  const { isEnabled } = draftMode();

  return (
    <>
      {children}
      {<PreviewBox isEnabled={isEnabled} />}
    </>
  );
}
