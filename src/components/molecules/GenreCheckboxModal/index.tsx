import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";
import GenreCategory from "../../../models/GenreCategory";
import GenreCheckboxGroup from "./GenreCheckboxGroup";

type Props = {
  collectGenreIds: ({ ids }: {ids: string[]}) => void,
}

const GenreCheckboxModal = ({ collectGenreIds }: Props) => {
  const [genreCategories, setGenreCategories] = useState<GenreCategory[]>([]);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const checkValues = ({ values }: { values: string[] }): void => {
    setCheckedValues([...checkedValues, ...values]);
    collectGenreIds({ ids: checkedValues});
  }

  collectGenreIds({ ids: checkedValues});

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

  return (
    <div className={styles.genreCheckboxModal}>
      {genreCategories.map((genreCategory, idx) => (
        <GenreCheckboxGroup key={idx} genreCategory={genreCategory} checkValues={checkValues} />
      ))}
    </div>
  );
};

export default GenreCheckboxModal;
