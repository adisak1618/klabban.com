import { PageQuery } from "klabban-commerce";
import { Breadcrumb } from "components/Breadcrumb";
import { GutenbergContent } from "klabban-commerce/react";

export function PageContent({ page }: { page: PageQuery["page"] }) {
  return (
    <>
      <div className="container-content pt-6">
        <h1 className="text-h3 font-bold text-center">{page?.title}</h1>
      </div>
      <div className="mx-auto !max-w-5xl mt-6 mb-4 lg:container px-5">
        <Breadcrumb
          links={[
            {
              label: page?.title || "",
              href: `/${page?.databaseId}`,
            },
          ]}
        />
      </div>
      <GutenbergContent
        entryClassName="!my-0"
        className="!my-0"
        content={page?.content || ""}
      />
    </>
  );
}
