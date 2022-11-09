import React from "react";
import styles from "./style.module.scss";
import Item from "../../../models/Item";
import RankingDetailItem from "../RankingDetailItem";

type Props = {
  items: Item[];
  refetchData: () => void;
};

const LoadMoreItems = ({ items, refetchData }: Props) => {
  return (
    <div>
      {items.map((item, idx) => (
        <RankingDetailItem key={item.id} rank={idx + 11} item={item} refetchData={refetchData} />
      ))}
    </div>
  );
};

export default LoadMoreItems;
