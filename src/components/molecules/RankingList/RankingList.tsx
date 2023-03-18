import React, { useState } from "react";
import RankingCard from "../RankingCard/RankingCard";
import styles from "./style.module.scss";
import Ranking from "../../../models/Ranking";
import { Pagination } from "antd";
import { useRankingsContext } from "../../../domain/context/RankingsContext";

type Props = {
  rankings: Ranking[];
  rankingsCount: number;
};

const RankingList = ({ rankings, rankingsCount }: Props) => {
  const pageIndex = 50;
  const [current, setCurrent] = useState<number>(1);
  const { setQueryParams } = useRankingsContext();

  const onChangePage = (page: number) => {
    setCurrent(page);
    setQueryParams("page", page);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={styles.RankingList}>
      {rankings.map((ranking, idx) => (
        <RankingCard key={idx} ranking={ranking} />
      ))}
      <Pagination
        current={current}
        pageSize={pageIndex}
        total={rankingsCount}
        onChange={(e) => onChangePage(e)}
      />
    </div>
  );
};

export default RankingList;
