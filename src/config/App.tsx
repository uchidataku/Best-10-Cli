import React, { useEffect, useState } from "react";
import PageRoutes from "./PageRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./style.module.scss";
import SideDrawer from "../components/molecules/SideDrawer";
import BackDrop from "../components/molecules/BackDrop";
import axios from "../config/axios";
import Api from "../config/qpi";
import Account from "../models/Account";
import Header from "../components/molecules/Header";

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

  async function fetchAccount() {
    const request = await axios.get(Api.fetchCurrentAccount.buildPath());
    if (request.data !== null) {
      setAccount(request.data);
      setIsLogin(true);
    }
    return request;
  }

  useEffect(() => {
    if (!account) {
      fetchAccount();
    } else {
      setIsLogin(true);
    }
  }, []);

  return (
    <div>
      <div className={styles.app}>
        <Header openSideDrawer={openSideDrawer}/>
        <main>
          <Router>
            <PageRoutes />
          </Router>
        </main>
        <SideDrawer isOpen={isOpen} isLogin={isLogin} />
        {backdrop}
      </div>
    </div>
  );
}

export default App;
