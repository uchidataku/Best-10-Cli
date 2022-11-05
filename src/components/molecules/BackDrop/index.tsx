import React, { Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";

type Props = {
  closeSideDrawer: () => void;
};

const BackDrop = ({ closeSideDrawer }: Props) => {
  return <div className={styles.backDrop} onClick={() => closeSideDrawer()}></div>;
};

export default BackDrop;
