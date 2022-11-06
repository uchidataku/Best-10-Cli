import React from "react";
import styles from "./style.module.scss";
import { InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import routes from "../../../constants/routes";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.snsIcons}>
        <InstagramOutlined className={styles.insta} style={{fontSize: "24px"}}/>
        <TwitterOutlined style={{fontSize: "24px"}}/>
      </div>
      <div>
        <a className={styles.footerInfo} href={routes.information()}>お問い合わせ</a>
      </div>
    </footer>
  );
};

export default Footer;
