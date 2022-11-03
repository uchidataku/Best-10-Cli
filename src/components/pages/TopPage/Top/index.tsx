import React from "react";
import RankingList from "../../../molecules/RankingList";
import { SearchBar } from "antd-mobile";
import styles from "./style.module.scss";

const Top = () => {
  return (
    <div className="App">
      <SearchBar className={styles.searchBar} placeholder="キーワード" />
      <RankingList />
    </div>
  );
};

export default Top;
