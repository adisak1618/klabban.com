import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    },
    accessToken: string;
    refreshToken: string;
    authTokenExpiration: string;
    refreshTokenExpiration: string;
  }
}