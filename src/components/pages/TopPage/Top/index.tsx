import React, { useEffect, useState } from "react";
import RankingList from "../../../molecules/RankingList";
import { SearchBar } from "antd-mobile";
import styles from "./style.module.scss";
import Ranking from "../../../../models/Ranking";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import Dropdown from "../../../molecules/Dropdown";
import { Button } from "antd";

const Top = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);

  async function fetchData() {
    const request = await axios.get(Api.fetchRankings.buildPath());
    setRankings(request.data.rankings);
    return request;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <SearchBar className={styles.searchBar} placeholder="キーワード" />
      <Dropdown placeholder="ジャンル" />
      <Dropdown defaultValue="人気順" />
      <Button className={styles.searchButton}>検索</Button>
      <RankingList rankings={rankings} />
    </div>
  );
};

export default Top;
