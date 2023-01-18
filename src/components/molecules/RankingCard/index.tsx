import React from "react";
import { Tag } from "antd";
import styles from "./style.module.scss";
import Ranking from "../../../models/Ranking";
import Api from "../../../config/qpi";

type RankingCardProps = {
  ranking: Ranking;
};

const RankingCard = ({ ranking }: RankingCardProps) => {
  return (
    <a rel="stylesheet" href={Api.fetchRanking.buildPath(ranking.id)}>
      <div className={styles.rankingCard}>
        <div className={styles.item}>
          <div className={styles.title}>
            <p>{ranking.title}</p>
          </div>
          <div className={styles.counts}>
            <div className={styles.itemsCount}>
              <p>{ranking.itemsCount} items</p>
            </div>
            <div className={styles.likesCount}>
              <p>{ranking.allLikesCount} likes</p>
            </div>
          </div>
        </div>
        <div className={styles.genres}>
          {ranking.genres.map((genre, idx) => (
            <Tag className={styles.genre} key={idx}>
              {genre.name}
            </Tag>
          ))}
        </div>
      </div>
    </a>
  );
};

export default RankingCard;
