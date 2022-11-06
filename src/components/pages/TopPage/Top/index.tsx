import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RankingList from "../../../molecules/RankingList";
import { SearchBar } from "antd-mobile";
import styles from "./style.module.scss";
import Ranking from "../../../../models/Ranking";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import Dropdown from "../../../molecules/Dropdown";
import { Button } from "antd";
import { ContentOutline } from "antd-mobile-icons";

type Query = {
  keyword: string;
  genre: string;
  sortBy: string;
};

const Top = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [rankingsCount, setRankingsCount] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Query>();

  async function fetchData() {
    const request = await axios.get(Api.fetchRankings.buildPath());
    setRankings(request.data.rankings);
    setRankingsCount(request.data.totalDataNums);
    return request;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <input className={styles.searchBar} placeholder="キーワード" {...register("keyword")} />
      <Dropdown placeholder="ジャンル" />
      <Dropdown defaultValue="人気順" />
      <Button className={styles.searchButton}>検索</Button>
      <div className={styles.rankingsCount}>
        <ContentOutline /> {rankingsCount}
      </div>
      <RankingList rankings={rankings} />
    </div>
  );
};

export default Top;
