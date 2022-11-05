import React, { useEffect, useState } from "react";
import PageRoutes from "./PageRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./style.module.scss";
import { MenuOutlined } from "@ant-design/icons";
import SideDrawer from "../components/molecules/SideDrawer";
import BackDrop from "../components/molecules/BackDrop";
import routes from "../constants/routes";
import axios from "../config/axios";
import Api from "../config/qpi";
import Account from "../models/Account";

function App() {
  const [account, setAccount] = useState<Account>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const closeSideDrawer = (): void => {
    setIsOpen(false);
  };
  const backdrop = isOpen ? <BackDrop closeSideDrawer={closeSideDrawer} /> : "";

  function openSideDrawer() {
    setIsOpen(true);
  }

  useEffect(() => {
    async function fetchAccount() {
      const request = await axios.get(Api.fetchCurrentAccount.buildPath());
      console.log("===request====");
      console.log(request.data);
      if (request.data !== null) {
        setAccount(request.data);
        setIsLogin(true);
      }
      return request;
    }

    console.log("~~~account~~~~~");
    console.log(account);

    if (!account) {
      fetchAccount();
    } else {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <a className={styles.logo} href={routes.top()}>
          Best-10
        </a>
        <MenuOutlined className={styles.menuIcon} onClick={() => openSideDrawer()} />
      </header>
      <main>
        <Router>
          <PageRoutes />
        </Router>
      </main>
      <SideDrawer isOpen={isOpen} isLogin={isLogin} />
      {backdrop}
    </div>
  );
}

export default App;
