import React, { useMemo, useState } from "react";
import styles from "./style.module.scss";
import { Button, Input, notification, TreeSelect } from "antd";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import routes from "../../../../constants/routes";
import { Modal, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import GenreCategory from "../../../../models/GenreCategory";
import Ranking from "../../../../models/Ranking";
import { useMutation, useQuery } from "react-query";

type EditRankingProps = {
  ranking: Ranking;
};

const EditRanking = ({ ranking }: EditRankingProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(ranking.title.slice(0, -8));
  const [genreIds, setGenreIds] = useState<string[]>(ranking.genres.map((g) => g.id));
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onChange = (newValue: string[]) => {
    setGenreIds(newValue);
  };

  const onSubmit = () => {
    axios
      .patch(Api.updateRanking.buildPath(ranking.id), {
        ranking: {
          title: title,
          genreIds: genreIds,
        },
      })
      .then(() => {
        navigate(routes.ranking(ranking.id));
        Toast.show({
          icon: "success",
          content: "Best-10を更新しました",
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

  const fetchGenreCategories = async () => {
    const res = await axios.get(Api.fetchGenreCategories.buildPath());
    return res;
  };
  const { data } = useQuery("fetchGenreCategories", fetchGenreCategories, {
    onError: (e) => {
      console.log(e);
    },
  });
  const genreCategories: GenreCategory[] = useMemo(() => {
    return data?.data.genreCategories;
  }, [data?.data]);

  const treeData =
    genreCategories &&
    genreCategories.map((genreCategory) => ({
      title: genreCategory.name,
      value: genreCategory.id,
      key: genreCategory.id,
      children: genreCategory.genres.map((genre) => ({
        title: genre.name,
        value: genre.id,
        key: genre.id,
      })),
    }));

  const { mutate: onDeleteRanking } = useMutation(
    () => axios.delete(Api.deleteRanking.buildPath(ranking.id)),
    {
      onSuccess: () => {
        setOpenDeleteModal(false);
        navigate(routes.top());
        notification.success({ message: "削除しました" });
      },
      onError: () => {
        notification.error({ message: "削除に失敗しました" });
      },
    }
  );

  return (
    <React.Fragment>
      <div className={styles.editRanking}>
        <div className={styles.pageTitle}>
          <h2>Best-10を編集する</h2>
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
          <Button disabled={!title} className={styles.updateButton} onClick={() => onSubmit()}>
            更新する
          </Button>
          <Button className={styles.cancelButton} onClick={() => navigate(-1)}>
            キャンセル
          </Button>
          <Button className={styles.deleteButton} onClick={() => setOpenDeleteModal(true)}>
            削除する
          </Button>
        </div>
      </div>
      <Modal
        content="本当に削除しますか?"
        visible={openDeleteModal}
        closeOnAction
        showCloseButton
        onClose={() => setOpenDeleteModal(false)}
        actions={[
          { key: "confirm", text: "削除する", danger: true, onClick: () => onDeleteRanking() },
          { key: "cancel", text: "キャンセル" },
        ]}
      />
    </React.Fragment>
  );
};

export default EditRanking;
