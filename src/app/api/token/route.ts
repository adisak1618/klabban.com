import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: any) {
 
 
  return NextResponse.json({ data: "data", token: await getToken({
    req
  }) })
}
