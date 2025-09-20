import {
  QueryClient,
  MutationCache,
  type QueryKey,
} from "@tanstack/react-query";
import type { ToastStatus } from "@context/toast-provider";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      invalidatesQuery?: QueryKey;
      successMessage?: string;
      errorMessage?: string;
    };
  }
}

export const createQueryClient = ({
  openToast,
}: {
  openToast: (message: string, status: ToastStatus) => void;
}) => {
  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        if (mutation.meta?.successMessage) {
          openToast(mutation.meta.successMessage, "success");
        }
      },
      onError: (_error, _variables, _context, mutation) => {
        let message: string | undefined;

        if (_error instanceof Error && _error.message) {
          message = _error.message;
        }
        if (!message && mutation.meta?.errorMessage) {
          message = mutation.meta.errorMessage;
        }
        if (!message) {
          message = "An unexpected error occurred.";
        }

        openToast(message, "error");
      },
      onSettled: (_data, _error, _variables, _context, mutation) => {
        if (mutation.meta?.invalidatesQuery) {
          queryClient.invalidateQueries({
            queryKey: mutation.meta.invalidatesQuery,
          });
        }
      },
    }),
  });

  return queryClient;
};
