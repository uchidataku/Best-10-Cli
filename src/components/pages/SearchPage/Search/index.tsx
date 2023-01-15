import React, { useState } from "react";
import styles from "./style.module.scss";
import { Button } from "antd";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";

const Search = () => {
  const [keyword, setKeyword] = useState<string>();
  const onSubmit = () => {
    axios
      .get(Api.fetchRankings.buildPath(), {
        params: { keyword: keyword }
      })
      .then((res) => {
        console.log(res.data);
        // setRankings(res.data.rankings);
        // setRankingsCount(res.data.totalDataNums);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.search}>
      <input className={styles.searchBar} onChange={(e) => setKeyword(e.target.value)} value={keyword} type="text"
             placeholder="キーワード" />
      <Button className={styles.searchButton} onClick={() => onSubmit()}>
        検索
      </Button>
    </div>
  );
};

export default Search;
