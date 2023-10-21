"use client";
import { QueryProvider } from "klabban-commerce/react";

export function QueryProviders({ children }: React.PropsWithChildren) {
  return (
    <QueryProvider GQL_URL="http://klabban-demo.local/graphql">
      {children}
    </QueryProvider>
  );
}
