import { RefreshTokenDocument, initRequestClient } from "klabban-commerce";
import { KlabbanConfig } from "./klabbanConfig";
import { authOptions, getServerSession } from "klabban-commerce/auth";

export async function getTokenByRefreshToken() {
  const session = await getServerSession(
    authOptions({ GQL_URL: KlabbanConfig.GQL_URL })
  );

  const refreshToken = (session as any)?.refreshToken;
  if (!(session as any)?.refreshToken) return null;
  if (!refreshToken) return null;
  const client = initRequestClient(KlabbanConfig);
  const result = await client.request(RefreshTokenDocument, {
    input: {
      refreshToken,
    },
  });
  return result.refreshToken?.authToken || null;
}
