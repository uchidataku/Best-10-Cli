import React, { useState } from "react";
import PageRoutes from "./PageRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./style.module.scss";
import SideDrawer from "../components/molecules/SideDrawer";
import BackDrop from "../components/molecules/BackDrop";
import Header from "../components/molecules/Header";
import { RankingsContextProvider } from "../domain/context/RankingsContext";
import {
  CurrentAccountContextProvider,
  useCurrentAccountContext,
} from "../domain/context/CurrentAccountContext";

function App() {
  const { isLoggedIn } = useCurrentAccountContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeSideDrawer = (): void => {
    setIsOpen(false);
  };
  const backdrop = isOpen ? <BackDrop closeSideDrawer={closeSideDrawer} /> : "";

  function openSideDrawer() {
    setIsOpen(true);
  }

  console.log("App.isLoggedIn", isLoggedIn);

  return (
    <div className={styles.app}>
      <main>
        <CurrentAccountContextProvider>
          <RankingsContextProvider>
            <Router>
              <Header openSideDrawer={openSideDrawer} />
              <PageRoutes />
            </Router>
          </RankingsContextProvider>
        </CurrentAccountContextProvider>
      </main>
      <SideDrawer isOpen={isOpen} isLogin={isLoggedIn} />
      {backdrop}
    </div>
  );
}

export default App;
