import React, { useState } from "react";
import styles from "./style.module.scss";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import classnames from "classnames";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";
import Item from "../../../models/Item";
import { notification, Spin } from "antd";
import routes from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import ItemDetailCard from "../ItemDetailCard/ItemDetailCard";

type Props = {
  rank: number;
  item: Item;
  refetchData: () => void;
};

const RankingDetailItem = ({ rank, item, refetchData }: Props) => {
  const [disable, setDisable] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const navigate = useNavigate();

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
    await axios
      .post(Api.createLike.buildPath(itemId))
      .then(() => {
        refetchData();
        setDisable(false);
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
  }

  async function onClickDeleteLike(itemId: string) {
    await axios
      .delete(Api.deleteLike.buildPath(itemId))
      .then(() => {
        refetchData();
        setDisable(false);
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
  }

  const onCloseCard = () => {
    setOpenCard(false);
  };

  return (
    <React.Fragment>
      <div className={classnames(getDetailItemClassName())}>
        <div className={classnames(getTitleClassName())} onClick={() => setOpenCard(!openCard)}>
          <p>
            {rank < 11 ? rank : "-"} {item.name}
          </p>
        </div>
        <div className={styles.like}>
          <p className={styles.likeCount}>{item.likesCount} likes</p>
          {!disable ? (
            item.isLiked ? (
              <RiHeart3Fill
                style={{ fontSize: "16px" }}
                color="#d73a49"
                onClick={() => {
                  setDisable(true);
                  onClickDeleteLike(item.id).finally();
                }}
              />
            ) : (
              <RiHeart3Line
                style={{ fontSize: "16px" }}
                onClick={() => {
                  setDisable(true);
                  onClickCreateLike(item.id).finally();
                }}
              />
            )
          ) : (
            <Spin size="small" />
          )}
        </div>
      </div>
      {openCard && <ItemDetailCard item={item} closeCard={onCloseCard} />}
    </React.Fragment>
  );
};

export default RankingDetailItem;
