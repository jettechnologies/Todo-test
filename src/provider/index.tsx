"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { TanstackQueryProvider } from "./provider";

export function Provider({ children }: { children: React.ReactNode }) {
  //   const [queryClient, setQueryClient] = useState<QueryClient>();

  return (
    <ChakraProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ChakraProvider>
  );
}
