import React from "react";
import styles from "./style.module.scss";
import routes from "../../../constants/routes";
import { MenuOutlined } from "@ant-design/icons";

type Props = {
  openSideDrawer: () => void;
}

const Header = ({ openSideDrawer }: Props) => {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href={routes.top()}>
        Best-10
      </a>
      <MenuOutlined className={styles.menuIcon} onClick={() => openSideDrawer()} />
    </header>
  );
};

export default Header;
