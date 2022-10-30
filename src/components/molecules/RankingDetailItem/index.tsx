import React, { useState } from "react";
import styles from "./style.module.scss"
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import classnames from "classnames";
import Item from "../../model/Item";
import axios from "axios";
import Api from "../../../config/qpi";
import Account from "../../model/Account";

type Props = {
  rank: number;
  item: Item;
}

const RankingDetailItem = ({rank, item}: Props) => {
  const [account, setAccount] = useState<Account>();

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

  async function onClickCreateLike(itemId: string) {
    if (!account) return;

    // TODO: currentAccount渡す
    await axios.post(Api.createLike.buildPath(itemId))
  }

  return (
    <div className={classnames(getDetailItemClassName())}>
      <div className={classnames(getTitleClassName())}>
        <p>{rank < 11 ? rank : '-'} {item.name}</p>
      </div>
      <div className={styles.like}>
        <p className={styles.likeCount}>{item.likesCount} likes</p>
        { item.isLiked === true ? (
          <HeartTwoTone twoToneColor="#d73a49" />
        ) : (
          <HeartOutlined onClick={() => onClickCreateLike(item.id)}/>
          )
        }
      </div>
    </div>
  );
};

export default RankingDetailItem;
