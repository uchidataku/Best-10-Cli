import React from "react";
import styles from "./style.module.scss";
import routes from "../../../constants/routes";
import { FillinOutline } from "antd-mobile-icons"

const LoginMenu = () => {
    return (
        <ul className={styles.menu}>
            <li className={styles.menuItem}>
                <a href={routes.rankings()}>
                    <FillinOutline /> Best-10を作成する
                </a>
            </li>
        </ul>
    );
};

export default LoginMenu;
