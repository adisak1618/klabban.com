import { draftMode } from "next/headers";
import { BlogContent } from "container/blogDetail/content";
import { FourceLogin } from "components/ForceLogin";

export interface BlogDetailPageProps {
  params: {
    blogSlug: string;
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { isEnabled } = draftMode();

  return (
    <>
      <>
        {isEnabled && <FourceLogin />}
        <BlogContent slug={params.blogSlug} />
      </>
    </>
  );
}
