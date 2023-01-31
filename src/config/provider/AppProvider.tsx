import React, { PropsWithChildren, useCallback, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { RankingsContextProvider } from "../../domain/context/RankingsContext";
import Header from "../../components/molecules/Header";
import {
  CurrentAccountContextProvider,
  useCurrentAccountContext,
} from "../../domain/context/CurrentAccountContext";
import BackDrop from "../../components/molecules/BackDrop";
import SideDrawer from "../../components/molecules/SideDrawer";
import styles from "./style.module.scss";

const ErrorFallback = () => {
  return (
    <div>
      <h1>Ooops, something went wrong</h1>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
};

export const AppProvider = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useCurrentAccountContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeSideDrawer = (): void => {
    setIsOpen(false);
  };
  const backdrop = isOpen ? <BackDrop closeSideDrawer={closeSideDrawer} /> : "";

  const openSideDrawer = () => {
    setIsOpen(true);
  };

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

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      <BrowserRouter>
        <CurrentAccountContextProvider>
          <RankingsContextProvider>
            <main className={styles.app}>
              <Header openSideDrawer={openSideDrawer} />
              {children}
              <SideDrawer isOpen={isOpen} isLogin={isLoggedIn} />
              {backdrop}
            </main>
          </RankingsContextProvider>
        </CurrentAccountContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
