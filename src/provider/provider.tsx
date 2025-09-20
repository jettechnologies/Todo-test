"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useToastContext } from "@/hook/toast";
import { useState, useEffect } from "react";
import { createQueryClient } from "@/lib";

export function TanstackQueryProvider({
  children,
  onClientReady,
}: {
  children: React.ReactNode;
  onClientReady?: (client: QueryClient) => void;
}) {
  const { openToast } = useToastContext();
  // Create the QueryClient once per app instance
  const [queryClient] = useState(() => createQueryClient({ openToast }));

  useEffect(() => {
    if (onClientReady) {
      onClientReady(queryClient);
    }
  }, [onClientReady, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
