import { PostDocument, PostIdType, initRequestClient } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";

async function Page() {
  const res = await fetch("http://localhost:3000/api/time", {
    next: {
      revalidate: 30,
    },
  });

  // gqlFetch(PostDocument, {});

  const result = await res.json();

  const client = initRequestClient({
    ...KlabbanConfig,
    option: {
      credentials: "include",
      next: {
        revalidate: 10,
      },
    },
  });
  const post = await client.request(PostDocument, {
    id: "test",
    idType: PostIdType.Slug,
  });
  return (
    <div>
      <div>{JSON.stringify(result)}</div>
      <div>{post.post?.content}</div>
    </div>
  );
}

export default Page;

export const revalidate = 30;
