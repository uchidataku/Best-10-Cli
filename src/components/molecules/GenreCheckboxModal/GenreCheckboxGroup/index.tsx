import React, { useState } from "react";
import styles from "./style.module.scss";
import { Checkbox } from "antd";
import { RightOutline, DownOutline } from "antd-mobile-icons";
import GenreCategory from "../../../../models/GenreCategory";
import { CheckboxValueType } from "antd/es/checkbox/Group";

type Props = {
  genreCategory: GenreCategory;
  checkValues: ({ values }: {values: string[]}) => void;
};

interface GenreOption {
  label: string;
  value: string;
}

const GenreCheckboxGroup = ({ genreCategory, checkValues }: Props) => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([])
  const [open, setOpen] = useState(false);
  const icon = open ? <DownOutline /> : <RightOutline />;
  const genres: GenreOption[] = [];
  const onChange = (checkedValues: CheckboxValueType[]) => {
    const values: string[] = [];
    setCheckedValues(checkedValues);
    checkedValues.map((value) => (
      values.push(value as string)
    ))
    console.log("checkedValues");
    console.log(checkedValues);

    checkValues({ values: values });
  }

  genreCategory.genres.map((genre) => genres.push({ label: genre.name, value: genre.id }));

  const menus = open ? <div className={styles.checkbox}><Checkbox.Group defaultValue={checkedValues} onChange={onChange} options={genres}/></div> : "";

  return (
    <div className={styles.genreCheckboxGroup}>
      <div className={styles.dropDownLabel} onClick={() => setOpen(!open)}>
        {icon} {genreCategory.name}
      </div>
      {menus}
    </div>
  );
};

export default GenreCheckboxGroup;
