import React from "react";
import { Tag } from "antd";
import styles from "./style.module.scss"

type Ranking = {
  id: string;
  title: string;
  genre: string;
};

const RankingCard = (ranking: Ranking) => {
  console.log(ranking);

  return (
    <div className={styles.RankingCard}>
      <div className={styles.item}>
        <div className={styles.title}>
          <p>{ranking.title}</p>
        </div>
        <div className={styles.sub}>
          <p className={styles.counts}>143 項目</p>
          <Tag className={styles.genre}>{ranking.genre}</Tag>
        </div>
      </div>
    </div>
  );
};

export default RankingCard;
