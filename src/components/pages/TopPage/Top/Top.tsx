import React from "react";
import RankingList from "../../../molecules/RankingList/RankingList";
import styles from "./style.module.scss";
import { Radio, Spin } from "antd";
import { ContentOutline } from "antd-mobile-icons";
import { RankingsSortBy } from "../../../../models/Ranking/helpers";
import { useRankingsContext } from "../../../../domain/context/RankingsContext";
import NoData from "../../../molecules/NoData/NoData";

const Top = () => {
  const { rankings, rankingsCount, isLoading, setQueryParams } = useRankingsContext();

  const onSubmit = (sortBy: RankingsSortBy) => {
    setQueryParams("sortBy", sortBy);
  };

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
      {isLoading ? (
        <Spin className={styles.spin} />
      ) : (
        <React.Fragment>
          {rankings && !!rankingsCount && (
            <RankingList rankings={rankings} rankingsCount={rankingsCount} />
          )}
          {!rankings?.length && <NoData />}
        </React.Fragment>
      )}
    </div>
  );
};

export default Top;
