import Header from "../../components/molecules/Header";
import PageRoutes from "../PageRoutes";
import SideDrawer from "../../components/molecules/SideDrawer";
import React, { useState } from "react";
import BackDrop from "../../components/molecules/BackDrop";
import { useAuth } from "../../hooks/useAuth";
import styles from "./style.module.scss";

export const AppLayout = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeSideDrawer = (): void => {
    setIsOpen(false);
  };
  const backdrop = isOpen ? <BackDrop closeSideDrawer={closeSideDrawer} /> : "";

  const openSideDrawer = () => {
    setIsOpen(true);
  };

  return (
    <main className={styles.app}>
      <Header openSideDrawer={openSideDrawer} />
      <PageRoutes />
      <SideDrawer isOpen={isOpen} isLogin={isLoggedIn} />
      {backdrop}
    </main>
  );
};
