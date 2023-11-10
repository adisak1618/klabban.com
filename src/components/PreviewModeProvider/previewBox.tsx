"use client";
import { Button } from "components/ui/button";
import { Switch } from "components/ui/switch";
import { signIn, signOut, useSession } from "klabban-commerce/auth";
import { usePathname, useSearchParams } from "next/navigation";

export function PreviewBox({ isEnabled }: { isEnabled: boolean }) {
  const { data, status } = useSession();
  const path = usePathname();

  const allParams = useSearchParams().toString();

  return (
    <>
      <div className="fixed z-[9999] bottom-3 right-3 bg-secondary shadow-md border px-3 text-center py-2 rounded-md">
        <div className="flex gap-2 items-center divide-x-2">
          <div>
            <h1>preview mode</h1>
            <a
              href={
                isEnabled
                  ? `/api/draft-mode/disable?redirect=${path}`
                  : `/api/draft-mode/enable?redirect=${path}?${encodeURIComponent(
                      allParams
                    )}`
              }
            >
              <Switch checked={isEnabled} onCheckedChange={(isChecked) => {}} />
            </a>
          </div>
          <div>
            {status === "authenticated" ? (
              <div>
                <p className="px-3">สวัสดี {data?.user?.name}</p>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => signOut()}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div className="pl-3 flex justify-center flex-wrap max-w-[160px] text-center">
                <p className="inline">
                  คุณต้องเข้าสู่ระบบเพื่อดูโพสที่เป็นบันทึกร่าง
                </p>
                <Button
                  className="inline"
                  variant="link"
                  size="sm"
                  onClick={() => signIn()}
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
