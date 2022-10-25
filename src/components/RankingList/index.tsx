import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Api from "../../qpi";
import RankingCard from "../RankingCard";
import styles from "./style.module.scss"

type Ranking = {
  id: string;
  title: string;
  genre: string;
};

const RankingList = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(Api.fetchRankings.buildPath());
      setRankings(request.data.rankings);
      return request;
    }
    fetchData();
  }, []);

  console.log(rankings);

  return (
    <div className={styles.RankingList}>
      {rankings.map((ranking) => (
        <RankingCard key={ranking.id} {...ranking} />
        ))}
    </div>
  );
};

export default RankingList;
