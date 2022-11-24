import React, { useState } from "react";
import styles from "./style.module.scss";
import { Checkbox } from "antd";
import { RightOutline, DownOutline } from "antd-mobile-icons";
import GenreCategory from "../../../../models/GenreCategory";
import { CheckboxValueType } from "antd/es/checkbox/Group";

type Props = {
  defaultValues?: string[];
  genreCategory: GenreCategory;
  onCheckValues: ({ values }: { values: string[] }) => void;
};

interface GenreOption {
  label: string;
  value: string;
}

const GenreCheckboxGroup = ({ defaultValues, genreCategory, onCheckValues }: Props) => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>(defaultValues ?? []);
  const [open, setOpen] = useState(false);
  const genres: GenreOption[] = [];
  const onChange = (checkedValues: CheckboxValueType[]) => {
    setCheckedValues(checkedValues);
    onCheckValues({ values: checkedValues.map((checkedValue) => checkedValue.toString()) });
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
          <Checkbox.Group defaultValue={checkedValues} onChange={onChange} options={genres} />
        </div>
      )}
    </div>
  );
};

export default GenreCheckboxGroup;
