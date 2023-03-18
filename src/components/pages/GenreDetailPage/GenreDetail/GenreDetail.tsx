import React from "react";
import styles from "./style.module.scss";
import RankingList from "../../../molecules/RankingList/RankingList";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import { RankingsSortBy } from "../../../../models/Ranking/helpers";
import { useLocation } from "react-router-dom";
import { ContentOutline } from "antd-mobile-icons";
import { Radio, Spin } from "antd";
import { useRankingsContext } from "../../../../domain/context/RankingsContext";
import NoData from "../../../molecules/NoData/NoData";
import { useQuery } from "react-query";

const GenreDetail = () => {
  const location = useLocation();
  const genreId = location.pathname.split("/")[2];
  const { rankings, rankingsCount, isLoading, setQueryParams } = useRankingsContext();

  const onSubmit = (sortBy: RankingsSortBy) => {
    setQueryParams("sortBy", sortBy);
  };

  const fetchGenre = async () => {
    const res = await axios.get(Api.fetchGenre.buildPath(genreId));
    return res;
  };

  const { data } = useQuery(`fetchGenre/${genreId}`, fetchGenre, {
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <div className={styles.genreDetail}>
      <p className={styles.genreTitle}>{data?.data.name}</p>
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
        </React.Fragment>
      )}
      {!rankings?.length && <NoData />}
    </div>
  );
};

export default GenreDetail;
