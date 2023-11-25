import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server"

export const GET = (request: Request) => {
  const { searchParams } = new URL(request.url)
  console.log("searchParams", searchParams.get("path"), searchParams.get("tag"));
  const path = searchParams.get("path");
  if(path) {
    console.log("start revalidate path", path.replace(/\/+$/, ''));
    revalidatePath(encodeURI(path.replace(/\/+$/, '')));
  }
  const tag = searchParams.get("tag");
  if(tag) {
    console.log("start revalidate tag", tag)
    revalidateTag(encodeURI(tag))
  }
  return NextResponse.json({
    success: true
  })
}