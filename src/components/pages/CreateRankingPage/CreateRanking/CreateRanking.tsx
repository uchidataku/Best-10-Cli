import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Button, Input, notification, TreeSelect } from "antd";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import routes from "../../../../constants/routes";
import { Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import GenreCategory from "../../../../models/GenreCategory";

const CreateRanking = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>();
  const [genreIds, setGenreIds] = useState<string[]>([]);
  const [genreCategories, setGenreCategories] = useState<GenreCategory[]>([]);

  const treeData = genreCategories.map((genreCategory) => ({
    title: genreCategory.name,
    value: genreCategory.id,
    key: genreCategory.id,
    children: genreCategory.genres.map((genre) => ({
      title: genre.name,
      value: genre.id,
      key: genre.id,
    })),
  }));

  const onChange = (newValue: string[]) => {
    setGenreIds(newValue);
  };

  const onSubmit = () => {
    axios
      .post(Api.createRanking.buildPath(), {
        ranking: {
          title: title,
          genreIds: genreIds,
        },
      })
      .then(() => {
        navigate(routes.top());
        Toast.show({
          icon: "success",
          content: "Best-10を作成しました",
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          notification.error({
            message: `${err.response.data.errors[0].description}`,
          });
          navigate(routes.signIn());
        } else if (err.response) {
          notification.error({
            message: `${err.response.data.errors[0].description}`,
          });
        } else {
          notification.error({
            message: `${err.message}`,
          });
        }
      });
  };

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
    <div className={styles.createRanking}>
      <div className={styles.pageTitle}>
        <h2>Best-10を作成する</h2>
      </div>
      <div className={styles.form}>
        <div className={styles.title}>
          <p className={styles.titleLabel}>タイトル</p>
          <Input
            size="large"
            className={styles.titleInput}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="XXX Best-10"
          />
          <caption className={styles.caption}>※ 末尾のBest-10は自動で付与されます</caption>
        </div>
        <div className={styles.genre}>
          <p className={styles.genreLabel}>ジャンル</p>
          <TreeSelect
            size="large"
            className={styles.genreSelect}
            treeData={treeData}
            value={genreIds}
            multiple
            listHeight={400}
            onChange={onChange}
            treeCheckable={true}
            placeholder="ジャンル"
            showSearch={false}
          />
          <caption className={styles.caption}>※ 複数選択可</caption>
        </div>
        <Button disabled={!title} className={styles.createButton} onClick={() => onSubmit()}>
          作成する
        </Button>
      </div>
    </div>
  );
};

export default CreateRanking;
