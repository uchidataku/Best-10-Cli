import React from "react";
import { Tag } from "antd";
import styles from "./style.module.scss";
import Ranking from "../../../models/Ranking";
import { genreLabelFor } from "../../../models/Ranking/helpers";

const RankingCard = (ranking: Ranking) => {
  return (
    <div className={styles.RankingCard}>
      <div className={styles.item}>
        <div className={styles.title}>
          <p>{ranking.title}</p>
        </div>
        <div className={styles.sub}>
          <p className={styles.counts}>143 項目</p>
          <Tag className={styles.genre}>{genreLabelFor(ranking?.genre)}</Tag>
        </div>
      </div>
    </div>
  );
};

export default RankingCard;
