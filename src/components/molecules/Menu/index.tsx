import React from "react";
import Api from "../../../config/qpi";
import { slide as Menu } from "react-burger-menu";

const MainMenu = () => {
  return (
    <Menu width={ 250 } right pageWrapId={ "page-wrap" } >
      <main id="page-wrap">
        <a href={Api.signIn.buildPath()} className="menu-item" >
          ログイン
        </a>
        <a href={Api.signUp.buildPath()} className="menu-item" >
          新規登録
        </a>
      </main>
    </Menu>
  );
};

export default MainMenu;
