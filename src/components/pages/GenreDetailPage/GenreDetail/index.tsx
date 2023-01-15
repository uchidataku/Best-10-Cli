import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import RankingList from "../../../molecules/RankingList";
import Ranking from "../../../../models/Ranking";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import { SortByObjects } from "../../../../models/Ranking/helpers";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { ContentOutline } from "antd-mobile-icons";
import Genre from "../../../../models/Genre";

const GenreDetail = () => {
  const location = useLocation();
  const genreId = location.pathname.split("/")[2];
  const [genre, setGenre] = useState<Genre>();
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [rankingsCount, setRankingsCount] = useState(0);
  const defaultSortByParams = SortByObjects[0];

  const onSubmit = (sortBy: string) => {
    axios
      .get(Api.fetchRankings.buildPath(), {
        params: {
          genreIds: [genreId],
          sortBy: sortBy,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRankings(res.data.rankings);
        setRankingsCount(res.data.totalDataNums);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function fetchRankingData() {
    const request = await axios
      .get(Api.fetchRankings.buildPath(), {
        params: {
          genreIds: [genreId],
          sortBy: defaultSortByParams.value,
        },
      })
      .then((res) => {
        setRankings(res.data.rankings);
        setRankingsCount(res.data.totalDataNums);
      })
      .catch((error) => {
        console.log(error);
      });
    return request;
  }

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
    fetchRankingData();
    fetchGenreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.genreDetail}>
      <p className={styles.genreTitle}>{genre?.name}</p>
      <Select
        className={styles.sortByInput}
        onChange={(e) => (e !== null ? onSubmit(e.value) : null)}
        defaultValue={defaultSortByParams}
        options={SortByObjects}
      />
      <div className={styles.rankingsCount}>
        <ContentOutline /> {rankingsCount}
      </div>
      <RankingList rankings={rankings} />
    </div>
  );
};

export default GenreDetail;
