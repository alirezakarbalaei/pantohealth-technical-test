"use client";

import { MobileStationsToggle } from "@/components/MobileStationsToggle";
import { ModeToggle } from "@/components/ModeToggle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

export function ClientProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {},
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ModeToggle />
      <MobileStationsToggle />
      {children}
    </QueryClientProvider>
  );
}

export const ReactQueryDevtoolsWrapper = () => (
  <ReactQueryDevtools initialIsOpen={false} />
);
