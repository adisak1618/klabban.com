import { draftMode } from "next/headers";
import { getTokenByRefreshToken } from "libs/refreshToken";

async function Page() {
  const { isEnabled } = draftMode();
  const token = isEnabled ? await getTokenByRefreshToken() : null;

  return (
    <div>
      <h1>Draft Mode</h1>
      <div className="container-content">{JSON.stringify(token)}</div>
    </div>
  );
}

export default Page;

export const revalidate = 60 * 60 * 24 * 30; // 1 month
// export const revalidate = true;

// export const fetchCache = "force-cache";
export const runtime = "nodejs"; // 'nodejs' (default) | 'edge'
