import React from "react";
import { Tag } from "antd";
import styles from "./style.module.scss";
import Ranking from "../../../models/Ranking";
import { genreLabelFor } from "../../../models/Ranking/helpers";
import Api from "../../../config/qpi";

const RankingCard = (ranking: Ranking) => {
  return (
    <a rel="stylesheet" href={Api.fetchRanking.buildPath(ranking.id)}>
      <div className={styles.RankingCard}>
        <div className={styles.item}>
          <div className={styles.title}>
            <p>{ranking.title}</p>
          </div>
          <div className={styles.sub}>
            <div className={styles.counts}>
              <p>
                {ranking.itemsCount} items / {ranking.allLikesCount} likes
              </p>
            </div>
            <Tag className={styles.genre}>{genreLabelFor(ranking?.genre)}</Tag>
          </div>
        </div>
      </div>
    </a>
  );
};

export default RankingCard;
