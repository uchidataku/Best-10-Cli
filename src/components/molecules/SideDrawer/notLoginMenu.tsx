import React from "react";
import styles from "./style.module.scss";
import routes from "../../../constants/routes";
import { InstagramOutlined, TwitterOutlined } from "@ant-design/icons";

const NotLoginMenu = () => {
  return (
    <div className={styles.menu}>
      <div>
        <div className={styles.menuItem}>
          <a href={routes.signUp()}>新規登録</a>
        </div>
        <div className={styles.menuItem}>
          <a href={routes.signIn()}>ログイン</a>
        </div>
      </div>
      <div className={styles.snsIcons}>
        <InstagramOutlined style={{ fontSize: "24px" }} />
        <TwitterOutlined style={{ fontSize: "24px" }} />
      </div>
    </div>
  );
};

export default NotLoginMenu;
