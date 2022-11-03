import React, { useEffect, useState } from "react";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";
import RankingCard from "../RankingCard";
import styles from "./style.module.scss";
import Ranking from "../../../models/Ranking";

const RankingList = () => {
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
    <div className={styles.RankingList}>
      {rankings.map((ranking) => (
        <RankingCard key={ranking.id} {...ranking} />
      ))}
    </div>
  );
};

export default RankingList;
