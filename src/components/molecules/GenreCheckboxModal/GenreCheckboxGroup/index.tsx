import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Checkbox } from "antd";
import { RightOutline, DownOutline } from "antd-mobile-icons";
import GenreCategory from "../../../../models/GenreCategory";

type Props = {
  genreCategory: GenreCategory;
};

interface GenreOption {
  label: string;
  value: string;
}

const GenreCheckboxGroup = ({ genreCategory }: Props) => {
  const [open, setOpen] = useState(false);
  const icon = open ? <DownOutline /> : <RightOutline />;
  const genres: GenreOption[] = [];
  const menus = open ? <Checkbox.Group options={genres} /> : "";

  genreCategory.genres.map((genre) => genres.push({ label: genre.name, value: genre.name }));

  return (
    <div className={styles.genreCheckboxGroup}>
      <div className={styles.dropDownLabel} onClick={() => setOpen(!open)}>
        {icon} {genreCategory.name}
      </div>
      <div className={styles.checkbox}>{menus}</div>
    </div>
  );
};

export default GenreCheckboxGroup;
