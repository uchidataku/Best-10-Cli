import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import RankingList from "../../../molecules/RankingList";
import styles from "./style.module.scss";
import Ranking from "../../../../models/Ranking";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import { Button, Checkbox } from "antd";
import { ContentOutline } from "antd-mobile-icons";
import Select from "react-select";
import { GenreObjects, SortByObjects } from "../../../../models/Ranking/helpers";
import GenreCheckboxGroup from "../../../molecules/GenreCheckboxGroup";

type QueryInput = {
  keyword?: string;
  genre?: { value: string; label: string };
  sortBy?: { value: string; label: string };
};

const Top = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [rankingsCount, setRankingsCount] = useState(0);
  const defaultSortByParams = SortByObjects[0];

  const {
    handleSubmit,
    control,
  } = useForm<QueryInput>();

  const onSubmit = (data: QueryInput) => {
    axios
      .get(Api.fetchRankings.buildPath(), {
        params: {
          keyword: data?.keyword,
          genre: data?.genre?.value,
          sortBy: data?.sortBy?.value ? data.sortBy.value : defaultSortByParams.value,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRankings(res.data.rankings);
        setRankingsCount(res.data.totalDataNums);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function fetchData() {
    const request = await axios
      .get(Api.fetchRankings.buildPath(), {
        params: {
          sortBy: defaultSortByParams.value,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRankings(res.data.rankings);
        setRankingsCount(res.data.totalDataNums);
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
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller name="keyword" control={control} render={({ field: { onChange, value } }) => <input className={styles.searchBar} value={value} placeholder="キーワード" onChange={onChange} />} />
        <Controller name="genre" control={control} render={({ field }) => <Select {...field} className={styles.genreInput} placeholder="ジャンル" options={GenreObjects} />} />
        <Controller name="sortBy" control={control} render={({ field }) => <Select {...field} className={styles.sortByInput} defaultValue={defaultSortByParams} options={SortByObjects} />} />
        <Button className={styles.searchButton} onClick={handleSubmit(onSubmit)}>
          検索
        </Button>
      </form>
      <GenreCheckboxGroup />
      <div className={styles.rankingsCount}>
        <ContentOutline /> {rankingsCount}
      </div>
      <RankingList rankings={rankings} />
    </div>
  );
};

export default Top;
