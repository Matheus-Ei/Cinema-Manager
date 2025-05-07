import { useState, useCallback } from "react";

interface UseMutationOptions<TVariables, TData> {
  onSuccess?: (data: TData, variables?: TVariables) => void;
  onError?: (error: Error, variables?: TVariables) => void;
}

export const useMutation = <TVariables, TData>(
  mutationFn: (variables?: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TVariables, TData>,
) => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutate = useCallback(
    async (variables?: TVariables) => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const result = await mutationFn(variables);
        setData(result);
        setIsLoading(false);
        if (options?.onSuccess) {
          options.onSuccess(result, variables);
        }
        return result;
      } catch (err: unknown) {
        let caughtError: Error;
        if (err instanceof Error) {
          caughtError = err;
        } else if (typeof err === "string") {
          caughtError = new Error(err);
        } else {
          caughtError = new Error("An unknown error occurred");
        }

        setError(caughtError);
        setIsLoading(false);
        if (options?.onError) {
          options.onError(caughtError, variables);
        }
        throw caughtError;
      }
    },
    [mutationFn, options],
  );

  return {
    mutate,
    data,
    isLoading,
    error,
  };
};
