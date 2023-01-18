import React, { useEffect } from "react";
import RankingList from "../../../molecules/RankingList";
import styles from "./style.module.scss";
import { Radio } from "antd";
import { ContentOutline } from "antd-mobile-icons";
import { RankingsSortBy } from "../../../../models/Ranking/helpers";
import { useRankingsContext } from "../../../../domain/context/RankingsContext";

const Top = () => {
  const { rankings, rankingsCount, refetch, rankingQueryParams, setRankingQueryParams } =
    useRankingsContext();

  const onSubmit = (sortBy: RankingsSortBy) => {
    setRankingQueryParams({ ...rankingQueryParams, sortBy: sortBy });
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rankingQueryParams]);

  return (
    <div>
      <div className={styles.listInfo}>
        <div className={styles.rankingsCount}>
          <ContentOutline /> {rankingsCount}
        </div>
        <Radio.Group
          size="small"
          onChange={(e) => (e !== null ? onSubmit(e.target.value) : null)}
          defaultValue={RankingsSortBy.POPULARITY}
        >
          <Radio.Button value={RankingsSortBy.POPULARITY}>人気順</Radio.Button>
          <Radio.Button value={RankingsSortBy.NEWEST_TO_OLDEST}>新着順</Radio.Button>
        </Radio.Group>
      </div>
      {rankings && rankingsCount && (
        <RankingList rankings={rankings} rankingsCount={rankingsCount} />
      )}
    </div>
  );
};

export default Top;
