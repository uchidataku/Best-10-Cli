import React, { useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";
import { Menu, Input } from "antd";
import type { MenuProps } from "antd";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import { YoutubeOutlined } from "@ant-design/icons";
import GenreCategory from "../../../../models/GenreCategory";
import { useNavigate } from "react-router-dom";
import routes from "../../../../constants/routes";
import { useRankingsContext } from "../../../../domain/context/RankingsContext";
import { RankingsSortBy } from "../../../../models/Ranking/helpers";
import { BiCameraMovie, BiMusic, BiHealth } from "react-icons/bi";
import { FaMountain, FaDog, FaRunning, FaCarAlt } from "react-icons/fa";
import {
  MdPublic,
  MdOutdoorGrill,
  MdBusiness,
  MdFamilyRestroom,
  MdFastfood,
  MdBiotech,
  MdCardTravel,
  MdSchool,
  MdMedicalServices,
} from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { RiServiceLine } from "react-icons/ri";
import { GenreCategoryName } from "../../../../models/GenreCategory/helper";

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

const genreIconFor = (categoryName: string) => {
  switch (categoryName) {
    case GenreCategoryName.Entertainment:
      return <BiCameraMovie />;
    case GenreCategoryName.Music:
      return <BiMusic />;
    case GenreCategoryName.Nature:
      return <FaMountain />;
    case GenreCategoryName.Lifestyle:
      return <MdPublic />;
    case GenreCategoryName.Animal:
      return <FaDog />;
    case GenreCategoryName.Fashion:
      return <GiClothes />;
    case GenreCategoryName.Sport:
      return <FaRunning />;
    case GenreCategoryName.Outdoor:
      return <MdOutdoorGrill />;
    case GenreCategoryName.Vehicle:
      return <FaCarAlt />;
    case GenreCategoryName.Health:
      return <BiHealth />;
    case GenreCategoryName.Occupation:
      return <MdBusiness />;
    case GenreCategoryName.Family:
      return <MdFamilyRestroom />;
    case GenreCategoryName.Gourmet:
      return <MdFastfood />;
    case GenreCategoryName.Business:
      return <MdBiotech />;
    case GenreCategoryName.Travel:
      return <MdCardTravel />;
    case GenreCategoryName.Education:
      return <MdSchool />;
    case GenreCategoryName.Medical:
      return <MdMedicalServices />;
    case GenreCategoryName.Service:
      return <RiServiceLine />;
    default:
      return <YoutubeOutlined />;
  }
};

const SearchContent = () => {
  const navigate = useNavigate();
  const [genreCategories, setGenreCategories] = useState<GenreCategory[]>([]);
  const { setRankingQueryParams } = useRankingsContext();

  const onSearch = (keyword: string) => {
    setRankingQueryParams({ sortBy: RankingsSortBy.POPULARITY, keyword: keyword, page: 1 });
    navigate(routes.top());
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setRankingQueryParams({ sortBy: RankingsSortBy.POPULARITY, genreIds: [e.key], page: 1 });
    navigate(routes.genre(e.key));
  };

  const items: MenuProps["items"] = useMemo(() => {
    return genreCategories.map((genreCategory, _key) =>
      getItem(
        genreCategory.name,
        genreCategory.id,
        genreIconFor(genreCategory.name),
        genreCategory.genres.map((genre, _key) => getItem(genre.name, genre.id))
      )
    );
  }, [genreCategories]);

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
        onSearch={(v) => onSearch(v)}
      />
      <div>
        <p className={styles.genreLabel}>ジャンル一覧</p>
      </div>
      <Menu onClick={onClick} mode="inline" items={items} />
    </div>
  );
};

export default SearchContent;
