import React from "react";
import styles from "./style.module.scss"
import { HeartOutlined } from '@ant-design/icons';
import classnames from "classnames";

type Item = {
  rank: number;
  title: string;
  like_counts: number;
}

const RankingDetailItem = (item: Item) => {
  console.log(item);

  function getDetailItemClassName() {
    if (item.rank < 11) {
      return styles.rankingDetailItem;
    } else {
      return [styles.rankingDetailItem, styles.loadMoreDetailItem];
    }
  }

  function getTitleClassName() {
    switch (item.rank) {
      case 1:
        return styles.first;
      case 2:
        return styles.second;
      case 3:
        return styles.third;
      default:
        return styles.title;
    }
  }

  return (
    <div className={classnames(getDetailItemClassName())}>
      <div className={classnames(getTitleClassName())}>
        <p>{item.rank < 11 ? item.rank : '-'} {item.title}</p>
      </div>
      <div className={styles.like}>
        <p className={styles.likeCount}>{item.like_counts} likes</p>
        <HeartOutlined />
      </div>
    </div>
  );
};

export default RankingDetailItem;
