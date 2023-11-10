import { draftMode } from "next/headers";
import { getTokenByRefreshToken } from "libs/refreshToken";
import { PageIdType, initRequestClient, pageRequest } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import { PageCustomUiDocument } from "../../gql/generated";
import { FourceLogin } from "components/ForceLogin";
import { PageContent } from "container/pageDetail/content";

async function fetchData(slug: string, token: string | null) {
  try {
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

    const client = initRequestClient({
      ...KlabbanConfig,
      option: {
        headers,
      },
    });

    const [pageResult, data] = await Promise.all([
      pageRequest({
        ...KlabbanConfig,
        variables: {
          id: slug || "/",
          asPreview: token ? true : false,
          idType: Number.isNaN(Number(slug || "/"))
            ? PageIdType.Uri
            : PageIdType.DatabaseId,
        },
        option: {
          headers,
        },
      }),
      client.request(PageCustomUiDocument, {
        id: slug,
        preview: false,
        idType: Number.isNaN(Number(slug || "/"))
          ? PageIdType.Uri
          : PageIdType.DatabaseId,
      }),
    ]);

    return {
      page: pageResult.page,
      customUI: data.page,
    };
  } catch (error) {
    return {
      page: undefined,
      customUI: undefined,
    };
  }
}

async function Page() {
  const { isEnabled } = draftMode();
  const token = isEnabled ? await getTokenByRefreshToken() : null;
  const { customUI, page } = await fetchData("/", token);

  return (
    <div className="space-y-3">
      <h1>Draft Mode</h1>
      <div>
        Page Type:{" "}
        {Number.isNaN(Number("/")) ? PageIdType.Uri : PageIdType.DatabaseId}
      </div>
      <div className="container-content whitespace-break-spaces break-words">
        {JSON.stringify(token)}
      </div>
      <div className="container-content whitespace-break-spaces break-words">
        {JSON.stringify(page)}
      </div>
      <div className="container-content whitespace-break-spaces break-words">
        {JSON.stringify(customUI)}
      </div>
      {/* {isEnabled && <FourceLogin />} */}
      <PageContent page={page} pageCustomUI={customUI} />
    </div>
  );
}

export default Page;

export const revalidate = 60 * 60 * 24 * 30; // 1 month
// export const revalidate = true;

// export const fetchCache = "force-cache";
export const runtime = "nodejs"; // 'nodejs' (default) | 'edge'
