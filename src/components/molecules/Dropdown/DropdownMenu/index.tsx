import React from "react";
import styles from "./style.module.scss";

type Props = {
  items: string[];
};

const DropdownMenu = ({ items }: Props) => {
  return (
    <div>
      <ul>
        {items.map((item, idx) => (
          <li className={styles.item} key={idx}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
