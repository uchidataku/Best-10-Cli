import React from "react";
import styles from "./style.module.scss"
import { HeartOutlined } from '@ant-design/icons';
import classnames from "classnames";
import Item from "../../model/Item";

type Props = {
  rank: number;
  item: Item;
}

const RankingDetailItem = ({rank, item}: Props) => {
  console.log(item);

  function getDetailItemClassName() {
    if (rank < 11) {
      return styles.rankingDetailItem;
    } else {
      return [styles.rankingDetailItem, styles.loadMoreDetailItem];
    }
  }

  function getTitleClassName() {
    switch (rank) {
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
        <p>{rank < 11 ? rank : '-'} {item.name}</p>
      </div>
      <div className={styles.like}>
        <p className={styles.likeCount}>{item.likes_count} likes</p>
        <HeartOutlined />
      </div>
    </div>
  );
};

export default RankingDetailItem;
