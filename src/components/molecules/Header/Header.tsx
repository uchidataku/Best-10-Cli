import React from "react";
import styles from "./style.module.scss";
import routes from "../../../constants/routes";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import IconImg from "../../../assets/images/Icon.png";
import LogoImg from "../../../assets/images/Logo.png";
import { useRankingsContext } from "../../../domain/context/RankingsContext";

type Props = {
  openSideDrawer: () => void;
};

const Header = ({ openSideDrawer }: Props) => {
  const navigate = useNavigate();
  const { resetQueryParams } = useRankingsContext();

  return (
    <header className={styles.header}>
      <div
        className={styles.logoGroup}
        onClick={() => {
          navigate(routes.top());
          resetQueryParams();
        }}
      >
        <img className={styles.icon} src={IconImg} alt="icon" />
        <img className={styles.logo} src={LogoImg} alt="logo" />
      </div>
      <div className={styles.icons}>
        <SearchOutlined className={styles.searchIcon} onClick={() => navigate(routes.search())} />
        <MenuOutlined className={styles.menuIcon} onClick={() => openSideDrawer()} />
      </div>
    </header>
  );
};

export default Header;
