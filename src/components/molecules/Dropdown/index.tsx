import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { DownOutline, UpOutline } from "antd-mobile-icons";
import DropdownMenu from "./DropdownMenu";
// import { GENRE } from "../../../models/Ranking/helpers";
// import { Genre } from "../../../models/Ranking/helpers";

type Props = {
  placeholder?: string;
  defaultValue?: string;
};

const Dropdown = ({ placeholder, defaultValue }: Props) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState("");
  const dropdownLine = isOpen ? <UpOutline /> : <DownOutline />;
  const items = [
    "エンタメ・趣味",
    "音楽",
    "自然",
    "社会・時事",
    "政治・経済",
    "動物",
    "ファッション",
    "ライフスタイル",
    "スポーツ",
    "乗り物",
    "美容・健康",
    "ファミリー・キッズ",
    "料理",
    "グルメ",
    "ビジネス・教養",
    "IT",
    "旅行・お出かけ",
    "教育",
  ];
  const menu = isOpen ? <DropdownMenu items={items} /> : "";

  function changeDropdown() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
      setDisplay(defaultValue);
    } else {
      if (placeholder !== undefined) {
        setDisplay(placeholder);
      }
    }
  }, []);

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownButton} onClick={() => changeDropdown()}>
        <p className={value !== "" ? styles.dropdownValue : styles.dropdownPlaceholder}>{display}</p>
        <div className={styles.dropdownLine}>{dropdownLine}</div>
      </div>
      {menu}
    </div>
  );
};

export default Dropdown;
