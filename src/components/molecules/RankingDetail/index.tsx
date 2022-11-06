import React, { useEffect, useState } from "react";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";
import styles from "./style.module.scss";
import RankingDetailItem from "../RankingDetailItem";
import Account from "../../../models/Account";
import Item from "../../../models/Item";
import Ranking from "../../../models/Ranking";
import { genreLabelFor } from "../../../models/Ranking/helpers";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { Toast } from "antd-mobile";

type Props = {
  rankingId: string;
};

type FormInput = {
  name: string;
}

const RankingDetail = ({ rankingId }: Props) => {
  const [ranking, setRanking] = useState<Ranking>();
  const [creator, setCreator] = useState<Account>();
  const [items, setItems] = useState<Item[]>([]);
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const onSubmit = (data: FormInput) => {
    axios
      .post(Api.createRankingItem.buildPath(rankingId), {
        item: { ...data }
      })
      .then((res) => {
        console.log(res.data);
        fetchData();
        reset();
        Toast.show({
          icon: "success",
          content: "追加しました",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function fetchData() {
    const request = await axios.get(Api.fetchRanking.buildPath(rankingId));
    setRanking(request.data);
    setCreator(request.data.creator);
    setItems(request.data.items);
    return request;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.rankingDetail}>
      <div className={styles.rankingInfo}>
        <div className={styles.rankingTitle}>
          <p>{ranking?.title}</p>
        </div>
        <div className={styles.rankingSubInfo}>
          <p>created by {creator?.username}</p>
          {/*<p>{genreLabelFor(ranking?.genre)}</p>*/}
        </div>
      </div>
      <div className={styles.rankingDetailItems}>
        {items.map((item, idx) => (
          <RankingDetailItem key={item.id} rank={idx + 1} item={item} />
        ))}
      </div>
      <form className={styles.addItem} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.addItemInput}
          placeholder={ranking?.title}
          {...register("name")}
        />
        <Button className={styles.addItemButton} onClick={handleSubmit(onSubmit)}>追加する</Button>
      </form>
    </div>
  );
};

export default RankingDetail;
