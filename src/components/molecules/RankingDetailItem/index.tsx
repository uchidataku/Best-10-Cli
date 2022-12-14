import React from "react";
import styles from "./style.module.scss";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import classnames from "classnames";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";
import Item from "../../../models/Item";
import { notification } from "antd";
import routes from "../../../constants/routes";
import { useNavigate } from "react-router-dom";

type Props = {
  rank: number;
  item: Item;
  refetchData: () => void;
};

const RankingDetailItem = ({ rank, item, refetchData }: Props) => {
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
      .then((res) => {
        refetchData();
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
      .then((res) => {
        refetchData();
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

  let icon;
  if (item.isLiked === true) {
    icon = <HeartTwoTone style={{ fontSize: "16px" }} twoToneColor="#d73a49" onClick={() => onClickDeleteLike(item.id)} />;
  } else {
    icon = <HeartOutlined style={{ fontSize: "16px" }} onClick={() => onClickCreateLike(item.id)} />;
  }

  return (
    <div className={classnames(getDetailItemClassName())}>
      <div className={classnames(getTitleClassName())}>
        <p>
          {rank < 11 ? rank : "-"} {item.name}
        </p>
      </div>
      <div className={styles.like}>
        <p className={styles.likeCount}>{item.likesCount} likes</p>
        {icon}
      </div>
    </div>
  );
};

export default RankingDetailItem;
