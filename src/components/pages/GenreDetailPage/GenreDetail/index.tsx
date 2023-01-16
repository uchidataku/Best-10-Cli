import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import RankingList from "../../../molecules/RankingList";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import { RankingsSortBy } from "../../../../models/Ranking/helpers";
import { useLocation } from "react-router-dom";
import { ContentOutline } from "antd-mobile-icons";
import Genre from "../../../../models/Genre";
import { Radio } from "antd";
import { useRankingsContext } from "../../../../domain/context/RankingsContext";

const GenreDetail = () => {
  const location = useLocation();
  const genreId = location.pathname.split("/")[2];
  const [genre, setGenre] = useState<Genre>();
  const { rankings, rankingsCount, refetch, rankingQueryParams, setRankingQueryParams } =
    useRankingsContext();

  const onSubmit = (sortBy: RankingsSortBy) => {
    setRankingQueryParams({ ...rankingQueryParams, sortBy: sortBy });
  };

  async function fetchGenreData() {
    const request = await axios
      .get(Api.fetchGenre.buildPath(genreId))
      .then((res) => {
        setGenre(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return request;
  }

  useEffect(() => {
    fetchGenreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rankingQueryParams]);

  return (
    <div className={styles.genreDetail}>
      <p className={styles.genreTitle}>{genre?.name}</p>
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
      {rankings && <RankingList rankings={rankings} />}
    </div>
  );
};

export default GenreDetail;
