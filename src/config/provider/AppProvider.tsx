import React, { PropsWithChildren, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { RankingsContextProvider } from "../../domain/context/RankingsContext";
import { QueryClient, QueryClientProvider } from "react-query";

const ErrorFallback = () => {
  return (
    <div>
      <h1>Ooops, something went wrong</h1>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
};

export const AppProvider = ({ children }: PropsWithChildren) => {
  const onError = useCallback(
    (
      error: Error,
      _info: {
        componentStack: string;
      }
    ) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
    []
  );

  const queryClient = new QueryClient();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <RankingsContextProvider>{children}</RankingsContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
