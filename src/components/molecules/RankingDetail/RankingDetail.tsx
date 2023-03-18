import React, { useState } from "react";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";
import styles from "./style.module.scss";
import RankingDetailItem from "../RankingDetailItem/RankingDetailItem";
import Account from "../../../models/Account";
import Item from "../../../models/Item";
import Ranking from "../../../models/Ranking";
import { Button, Input, notification, Spin, Tag } from "antd";
import { Toast } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
import LoadMoreItems from "./LoadMoreItems";
import routes from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import NoData from "../NoData/NoData";
import { EditOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";

type RankingDetailProps = {
  rankingId: string;
};

const RankingDetail = ({ rankingId }: RankingDetailProps) => {
  const [ranking, setRanking] = useState<Ranking>();
  const [creator, setCreator] = useState<Account>();
  const [best10Items, setBest10Items] = useState<Item[]>([]);
  const [otherItems, setOtherItems] = useState<Item[]>([]);
  const [loadMore, setloadMore] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const fetchRanking = async () => {
    const res = await axios.get(Api.fetchRanking.buildPath(rankingId));
    return res;
  };

  const { refetch, isLoading } = useQuery("fetchRanking", fetchRanking, {
    enabled: !!rankingId,
    onSuccess: (data) => {
      setRanking(data.data);
      setCreator(data.data.creator);
      setBest10Items(data.data.items.slice(0, 10));
      setOtherItems(data.data.items.slice(10));
    },
  });

  const onSubmit = (name: string) => {
    axios
      .post(Api.createRankingItem.buildPath(rankingId), {
        item: { name: name },
      })
      .then(() => {
        refetch();
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

  return (
    <React.Fragment>
      {isLoading ? (
        <Spin className={styles.spin} />
      ) : (
        <React.Fragment>
          {!!best10Items && (
            <div className={styles.rankingDetail}>
              <div className={styles.rankingInfo}>
                <div className={styles.rankingTitle}>
                  <p>{ranking?.title}</p>
                </div>
                <div className={styles.rankingSubInfo}>
                  <div className={styles.creatorInfo}>
                    <div className={styles.creator}>
                      <p>created by {creator?.username}</p>
                    </div>
                    {ranking?.viewerCanUpdate && (
                      <EditOutlined
                        key="edit"
                        onClick={() => navigate(routes.editRanking(rankingId))}
                      />
                    )}
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
                {!!best10Items.length &&
                  best10Items.map((item, idx) => (
                    <RankingDetailItem
                      key={item.id}
                      rank={idx + 1}
                      item={item}
                      refetchData={refetch}
                    />
                  ))}
                {!!otherItems.length && !loadMore && (
                  <div className={styles.loadMoreButton} onClick={() => setloadMore(true)}>
                    もっとみる <DownOutline />
                  </div>
                )}
                {loadMore && <LoadMoreItems items={otherItems} refetchData={refetch} />}
              </div>
              <div>
                <Input
                  size="large"
                  className={styles.itemInput}
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  type="text"
                  placeholder={ranking?.title.slice(0, -8)}
                />
                <Button
                  disabled={!value}
                  className={styles.createButton}
                  onClick={() => {
                    onSubmit(value);
                    setValue("");
                  }}
                >
                  追加する
                </Button>
              </div>
            </div>
          )}
          {!best10Items.length && <NoData />}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default RankingDetail;
