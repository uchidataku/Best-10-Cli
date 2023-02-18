import React from "react";
import styles from "./style.module.scss";
import { WarningOutlined } from "@ant-design/icons";

const NoData = () => {
  return (
    <div className={styles.noData}>
      <WarningOutlined style={{ fontSize: "24px" }} className={styles.icon} />
      <p className={styles.label}>No Data</p>
    </div>
  );
};

export default NoData;
