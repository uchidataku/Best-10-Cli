import React from "react";
import styles from "./style.module.scss";
import routes from "../../../constants/routes";
import { FillinOutline, InformationCircleOutline } from "antd-mobile-icons";
import { InstagramOutlined, TwitterOutlined } from "@ant-design/icons";

const LoginMenu = () => {
  return (
    <div className={styles.menu}>
      <div>
        <div className={styles.menuItem}>
          <a href={routes.rankings()}>
            <FillinOutline /> Best-10を作成する
          </a>
        </div>
        {/*<div className={styles.info}>*/}
        {/*  <a href={routes.information()}>*/}
        {/*    <InformationCircleOutline /> お問い合わせ*/}
        {/*  </a>*/}
        {/*</div>*/}
      </div>
      <div className={styles.snsIcons}>
        <InstagramOutlined style={{ fontSize: "24px" }} />
        <TwitterOutlined style={{ fontSize: "24px" }} />
      </div>
    </div>
  );
};

export default LoginMenu;
