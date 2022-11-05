import React from "react";
import styles from "./style.module.scss";
import routes from "../../../constants/routes";

const NotLoginMenu = () => {
    return (
        <ul className={styles.menu}>
            <li className={styles.menuItem}>
                <a href={routes.signIn()}>
                    ログイン
                </a>
            </li>
            <li className={styles.menuItem}>
                <a href={routes.signUp()}>
                    新規登録
                </a>
            </li>
        </ul>
    );
};

export default NotLoginMenu;
