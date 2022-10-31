import React, { useEffect, useState } from "react";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";
import styles from "./style.module.scss";
import RankingDetailItem from "../RankingDetailItem";
import Account from "../../model/Account";
import Item from "../../model/Item";
import Ranking from "../../model/Ranking";
import { genreLabelFor } from "../../model/Ranking/helpers";

type Props = {
  rankingId: string;
};

const RankingDetail = ({ rankingId }: Props) => {
  const [ranking, setRanking] = useState<Ranking>();
  const [creator, setCreator] = useState<Account>();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(Api.fetchRanking.buildPath(rankingId));
      setRanking(request.data);
      setCreator(request.data.creator);
      setItems(request.data.items);
      return request;
    }
    fetchData();
  });

  return (
    <div className={styles.rankingDetail}>
      <div className={styles.rankingInfo}>
        <div className={styles.rankingTitle}>
          <p>{ranking?.title}</p>
        </div>
        <div className={styles.rankingSubInfo}>
          <p>created by {creator?.username}</p>
          <p>{genreLabelFor(ranking?.genre)}</p>
        </div>
      </div>
      <div className={styles.rankingDetailItems}>
        {items.map((item, idx) => (
          <RankingDetailItem key={item.id} rank={idx + 1} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RankingDetail;
