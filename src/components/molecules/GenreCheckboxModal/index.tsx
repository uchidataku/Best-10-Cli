import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";
import GenreCategory from "../../../models/GenreCategory";
import GenreCheckboxGroup from "./GenreCheckboxGroup";

type Props = {
  onCheck: ({ ids }: { ids: string[] }) => void;
  isOpen: boolean;
};

const GenreCheckboxModal = ({ onCheck, isOpen }: Props) => {
  const [genreCategories, setGenreCategories] = useState<GenreCategory[]>([]);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  console.log(checkedValues);

  const onCheckValues = ({ values }: { values: string[] }): void => {
    setCheckedValues([...checkedValues, ...values]);
    onCheck({ ids: checkedValues });
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
      {genreCategories.map((genreCategory, idx) => (
        <GenreCheckboxGroup key={idx} defaultValues={checkedValues} genreCategory={genreCategory} onCheckValues={onCheckValues} />
      ))}
    </div>
  ) : (
    <div />
  );
};

export default GenreCheckboxModal;
