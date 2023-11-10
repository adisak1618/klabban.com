import { draftMode } from "next/headers";
import { PreviewBox } from "./previewBox";

export function PreviewModeBox() {
  const { isEnabled } = draftMode();

  return <>{isEnabled && <PreviewBox isEnabled={isEnabled} />}</>;
}
