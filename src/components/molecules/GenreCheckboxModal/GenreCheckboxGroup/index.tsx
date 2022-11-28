import React, { useState } from "react";
import styles from "./style.module.scss";
import { Checkbox } from "antd";
import { RightOutline, DownOutline } from "antd-mobile-icons";
import GenreCategory from "../../../../models/GenreCategory";
import { CheckboxValueType } from "antd/es/checkbox/Group";

type Props = {
  genreCategory: GenreCategory;
};

interface GenreOption {
  label: string;
  value: string;
}

const GenreCheckboxGroup = ({ genreCategory }: Props) => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);
  const [open, setOpen] = useState(false);
  const genres: GenreOption[] = [];
  const onChange = (checkedValues: CheckboxValueType[]) => {
    setCheckedValues(checkedValues);
    // onCheckValues({ values: checkedValues.map((checkedValue) => checkedValue.toString()) });
  };

  genreCategory.genres.map((genre) => genres.push({ label: genre.name, value: genre.id }));

  return (
    <div className={styles.genreCheckboxGroup}>
      <div className={styles.dropDownLabel} onClick={() => setOpen(!open)}>
        {open ? <DownOutline /> : <RightOutline />}
        {genreCategory.name}
      </div>
      {open && (
        <div className={styles.checkbox}>
          {genres.map((genre) => (
            <Checkbox key={genre.value} value={genre.value}>
              {genre.label}
            </Checkbox>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreCheckboxGroup;
