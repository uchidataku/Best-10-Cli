import React from "react";
import RankingCard from "../RankingCard";
import styles from "./style.module.scss";
import Ranking from "../../../models/Ranking";

type Props = {
  rankings: Ranking[];
};

const RankingList = ({ rankings }: Props) => {
  return (
    <div className={styles.RankingList}>
      {rankings.map((ranking) => (
        <RankingCard key={ranking.id} {...ranking} />
      ))}
    </div>
  );
};

export default RankingList;
