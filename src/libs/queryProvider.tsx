"use client";
import { QueryProvider } from "klabban-commerce/react";

export function QueryProviders({ children }: React.PropsWithChildren) {
  return (
    <QueryProvider GQL_URL={process.env.GQL_URL as string}>
      {children}
    </QueryProvider>
  );
}
