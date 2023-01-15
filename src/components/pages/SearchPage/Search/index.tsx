import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Menu, Input } from "antd";
import type { MenuProps } from "antd";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import { YoutubeOutlined } from "@ant-design/icons";
import GenreCategory from "../../../../models/GenreCategory";
import { useNavigate } from "react-router-dom";
import routes from "../../../../constants/routes";

const { Search } = Input;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SearchContent = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>();
  const [genreCategories, setGenreCategories] = useState<GenreCategory[]>([]);

  const onSearch = () => {
    axios
      .get(Api.fetchRankings.buildPath(), {
        params: { keyword: keyword },
      })
      .then((res) => {
        console.log(res.data);
        navigate(routes.top());
        // setRankings(res.data.rankings);
        // setRankingsCount(res.data.totalDataNums);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(routes.genre(e.key));
  };

  const items: MenuProps["items"] = genreCategories.map((genreCategory, _key) =>
    getItem(
      genreCategory.name,
      genreCategory.id,
      <YoutubeOutlined />,
      genreCategory.genres.map((genre, _key) => getItem(genre.name, genre.id))
    )
  );

  async function fetchData() {
    const request = await axios
      .get(Api.fetchGenreCategories.buildPath())
      .then((res) => {
        setGenreCategories(res.data.genreCategories);
      })
      .catch((error) => {
        console.log(error);
      });
    return request;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.search}>
      <Search
        className={styles.searchBar}
        size="large"
        placeholder="キーワード"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={onSearch}
      />
      <div>
        <p className={styles.genreLabel}>ジャンル一覧</p>
      </div>
      <Menu onClick={onClick} mode="inline" items={items} />
    </div>
  );
};

export default SearchContent;
