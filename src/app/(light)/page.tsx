import { initRequestClient } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import { PageCustomUiDocument } from "../../gql/generated/index";
import { HeroBlock } from "container/homePage/heroBlock";
import { TopCategories } from "container/homePage/TopCategories";
import { LastestPosts } from "container/homePage/LatestPosts";
import { EditorPickPosts } from "container/homePage/EditorPickPosts";

export default async function Home() {
  const client = initRequestClient(KlabbanConfig);
  const data = await client.request(PageCustomUiDocument, {
    id: "/",
    preview: false,
  });

  return (
    <div className="">
      <HeroBlock />
      {data.page &&
        (data.page.customPageUI?.topCategories?.categories?.length || 0) >
          0 && <TopCategories {...data.page} />}
      {data.page && <EditorPickPosts {...data.page} />}
      {data.page && <LastestPosts {...data.page} />}
    </div>
  );
}

export const revalidate = 60 * 60 * 24 * 30; // 1 month
