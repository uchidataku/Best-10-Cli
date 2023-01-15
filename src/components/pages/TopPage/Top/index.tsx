import React, { useEffect, useState } from "react";
import RankingList from "../../../molecules/RankingList";
import styles from "./style.module.scss";
import Ranking from "../../../../models/Ranking";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import { Button } from "antd";
import { ContentOutline } from "antd-mobile-icons";
import Select from "react-select";
import { SortByObjects } from "../../../../models/Ranking/helpers";
import GenreCheckboxModal from "../../../molecules/GenreCheckboxModal";
import BackDrop from "../../../molecules/BackDrop";
import classNames from "classnames";

// type QueryInput = {
//   keyword?: string;
//   genre?: { value: string; label: string };
//   sortBy?: { value: string; label: string };
// };

// type QueryInput = {
//   keyword?: string;
//   genreIds: string[];
//   sortBy?: { value: string; label: string };
// };

const Top = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [rankingsCount, setRankingsCount] = useState(0);
  const [openGenreModal, setOpenGenreModal] = useState(false);
  const defaultSortByParams = SortByObjects[0];
  const closeSideDrawer = (): void => {
    setOpenGenreModal(false);
  };
  const onCheckGenreIds = ({ ids }: { ids: string[] }): void => {
    setGenreIds(ids);
  };

  const [keyword, setKeyword] = useState<string>();
  const [genreIds, setGenreIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");

  const onSubmit = () => {
    axios
      .get(Api.fetchRankings.buildPath(), {
        params: {
          keyword: keyword,
          genreIds: genreIds,
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

  async function fetchData() {
    const request = await axios
      .get(Api.fetchRankings.buildPath(), {
        params: {
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={styles.form}>
        <input
          className={styles.searchBar}
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          type="text"
          placeholder="キーワード"
        />
        <div
          className={classNames(styles.genreInput, { [styles.active]: genreIds.length })}
          onClick={() => setOpenGenreModal(true)}
        >
          <p>ジャンル{genreIds.length > 0 && " ・ " + genreIds.length}</p>
        </div>

        <Select
          className={styles.sortByInput}
          onChange={(e) => (e !== null ? setSortBy(e.value) : null)}
          defaultValue={defaultSortByParams}
          options={SortByObjects}
        />
        <Button className={styles.searchButton} onClick={() => onSubmit()}>
          検索
        </Button>
      </div>
      <GenreCheckboxModal onCheck={onCheckGenreIds} isOpen={openGenreModal} />
      {openGenreModal && <BackDrop closeSideDrawer={closeSideDrawer} />}
      <div className={styles.rankingsCount}>
        <ContentOutline /> {rankingsCount}
      </div>
      <RankingList rankings={rankings} />
    </div>
  );
};

export default Top;
