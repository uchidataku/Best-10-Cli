import React, { useEffect, useState } from "react";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";
import styles from "./style.module.scss";
import RankingDetailItem from "../RankingDetailItem";
import Account from "../../../models/Account";
import Item from "../../../models/Item";
import Ranking from "../../../models/Ranking";
import { Button, notification, Tag } from "antd";
import { useForm } from "react-hook-form";
import { Toast } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
import LoadMoreItems from "./loadMoreItems";
import routes from "../../../constants/routes";
import { useNavigate } from "react-router-dom";

type Props = {
  rankingId: string;
};

type FormInput = {
  name: string;
};

const RankingDetail = ({ rankingId }: Props) => {
  const [ranking, setRanking] = useState<Ranking>();
  const [creator, setCreator] = useState<Account>();
  const [best10Items, setBest10Items] = useState<Item[]>([]);
  const [otherItems, setOtherItems] = useState<Item[]>([]);
  const [loadMore, setloadMore] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const navigate = useNavigate();
  const onSubmit = (data: FormInput) => {
    axios
      .post(Api.createRankingItem.buildPath(rankingId), {
        item: { ...data },
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
      .catch((err) => {
        if (err.response.status === 401) {
          notification.error({
            message: `${err.response.data.errors[0].description}`,
          });
          navigate(routes.signIn());
        } else if (err.response) {
          notification.error({
            message: `${err.response.data.errors[0].description}`,
          });
        } else {
          notification.error({
            message: `${err.message}`,
          });
        }
      });
  };

  async function fetchData() {
    const request = await axios.get(Api.fetchRanking.buildPath(rankingId));
    setRanking(request.data);
    setCreator(request.data.creator);
    setBest10Items(request.data.items.splice(0, 10));
    setOtherItems(request.data.items.splice(10));
    return request;
  }

  const refetchData = (): void => {
    fetchData();
  };

  let loadMoreItems;
  if (loadMore === true) {
    loadMoreItems = <LoadMoreItems items={otherItems} refetchData={refetchData} />;
  } else {
    loadMoreItems = (
      <div className={styles.loadMoreButton} onClick={() => setloadMore(true)}>
        load more <DownOutline />
      </div>
    );
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.rankingDetail}>
      <div className={styles.rankingInfo}>
        <div className={styles.rankingTitle}>
          <p>{ranking?.title}</p>
        </div>
        <div className={styles.rankingSubInfo}>
          <div className={styles.creator}>
            <p>created by {creator?.username}</p>
          </div>
          <div className={styles.genres}>
            {ranking?.genres.map((genre, idx) => (
              <Tag className={styles.genre} key={idx}>
                {genre.name}
              </Tag>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.rankingDetailItems}>
        {best10Items.map((item, idx) => (
          <RankingDetailItem key={item.id} rank={idx + 1} item={item} refetchData={refetchData} />
        ))}
        {loadMoreItems}
      </div>
      <form className={styles.addItem} onSubmit={handleSubmit(onSubmit)}>
        <input className={styles.addItemInput} placeholder={ranking?.title.slice(0, -8)} {...register("name")} />
        <Button className={styles.addItemButton} onClick={handleSubmit(onSubmit)}>
          追加する
        </Button>
      </form>
    </div>
  );
};

export default RankingDetail;
