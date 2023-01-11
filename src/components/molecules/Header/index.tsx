import React from "react";
import styles from "./style.module.scss";
import routes from "../../../constants/routes";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type Props = {
  openSideDrawer: () => void;
}

const Header = ({ openSideDrawer }: Props) => {
  const navigate = useNavigate();


  return (
    <header className={styles.header}>
      <a className={styles.logo} href={routes.top()}>
        Best-10
      </a>
      <div className={styles.icons}>
        <SearchOutlined className={styles.searchIcon}  onClick={() => navigate(routes.search())}/>
        <MenuOutlined className={styles.menuIcon} onClick={() => openSideDrawer()} />
      </div>
    </header>
  );
};

export default Header;
