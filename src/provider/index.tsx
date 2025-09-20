"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { TanstackQueryProvider } from "./provider";
import { ToastProvider } from "@/context/toast-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Provider({ children }: { children: React.ReactNode }) {
  //   const [queryClient, setQueryClient] = useState<QueryClient>();

  return (
    <NuqsAdapter>
      <ChakraProvider>
        <ToastProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </ToastProvider>
      </ChakraProvider>
    </NuqsAdapter>
  );
}
