import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";
import GenreCategory from "../../../models/GenreCategory";
import GenreCheckboxGroup from "./GenreCheckboxGroup";
import { Checkbox } from "antd";

type Props = {
  onCheck: ({ ids }: { ids: string[] }) => void;
  isOpen: boolean;
};

const GenreCheckboxModal = ({ onCheck, isOpen }: Props) => {
  const [genreCategories, setGenreCategories] = useState<GenreCategory[]>([]);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const onCheckValues = (values: string[]): void => {
    setCheckedValues(values);
    onCheck({ ids: values });
  };

  async function fetchData() {
    const request = await axios
      .get(Api.fetchGenreCategories.buildPath())
      .then((res) => {
        setGenreCategories(res.data.genreCategories);
      })
      .catch((error) => {
        console.log(error);
      });
    return request;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return isOpen ? (
    <div className={styles.genreCheckboxModal}>
      <Checkbox.Group defaultValue={checkedValues} onChange={(checkedValues) => onCheckValues(checkedValues as string[])}>
        {genreCategories.map((genreCategory) => (
          <GenreCheckboxGroup key={genreCategory.id} genreCategory={genreCategory} />
        ))}
      </Checkbox.Group>
    </div>
  ) : (
    <div />
  );
};

export default GenreCheckboxModal;
