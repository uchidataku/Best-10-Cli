import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import LoginMenu from "./loginMenu";
import NotLoginMenu from "./notLoginMenu";

type Props = {
    isOpen: boolean;
    isLogin: boolean;
}

const SideDrawer = ({ isOpen, isLogin }: Props) => {
    const menuComponent = isLogin ? <LoginMenu/> : <NotLoginMenu/>

  return (
      <div className={isOpen ? classNames(styles.sideDrawer, styles.sideDrawerOpen) : styles.sideDrawer}>
          {menuComponent}
      </div>
  );
};

export default SideDrawer;
