import React, { useEffect, useState } from "react";
import RankingList from "../../../molecules/RankingList";
import styles from "./style.module.scss";
import Ranking from "../../../../models/Ranking";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import { ContentOutline } from "antd-mobile-icons";
import Select from "react-select";
import { SortByObjects } from "../../../../models/Ranking/helpers";

const Top = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [rankingsCount, setRankingsCount] = useState(0);
  const defaultSortByParams = SortByObjects[0];

  const onSubmit = (sortBy: string) => {
    axios
      .get(Api.fetchRankings.buildPath(), {
        params: {
          sortBy: sortBy,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={styles.form}>
        <Select
          className={styles.sortByInput}
          onChange={(e) => (e !== null ? onSubmit(e.value) : null)}
          defaultValue={defaultSortByParams}
          options={SortByObjects}
        />
      </div>
      <div className={styles.rankingsCount}>
        <ContentOutline /> {rankingsCount}
      </div>
      <RankingList rankings={rankings} />
    </div>
  );
};

export default Top;
