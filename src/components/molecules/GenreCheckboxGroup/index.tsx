import React, { useState } from "react";
import styles from "./style.module.scss";
import { Checkbox } from "antd";
import { RightOutline, DownOutline } from "antd-mobile-icons"


const options = [
  [
    { label: 'hoge', value: 'hoge' }, { label: 'fuga', value: 'fuga' }, { label: 'kaka', value: 'kaka' },
  ],
  [
    { label: 'Apple', value: 'Apple' }, { label: 'Pear', value: 'Pear' }, { label: 'Orange', value: 'Orange' },
  ],
];


const GenreCheckboxGroup = () => {
  const [open, setOpen] = useState(false);

  const icon = open ? <DownOutline /> : <RightOutline />;

  const menus = open ? <div>
    {options.map((option, idx) => (
      <Checkbox.Group key={idx} name="hogehoge" options={option} defaultValue={['Pear']} />
    ))}
  </div> : "";

  return (
    <div className={styles.genreCheckboxGroup}>
      <div className={styles.dropDownLabel} onClick={() => setOpen(!open)}>
        {icon} 音楽
      </div>
      {menus}
    </div>
  );
};

export default GenreCheckboxGroup;
