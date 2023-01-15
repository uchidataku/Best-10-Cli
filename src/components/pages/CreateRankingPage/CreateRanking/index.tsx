import React, { useState } from "react";
import styles from "./style.module.scss";
import { Button, notification } from "antd";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import routes from "../../../../constants/routes";
import { Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import GenreCheckboxModal from "../../../molecules/GenreCheckboxModal";
import BackDrop from "../../../molecules/BackDrop";

const CreateRanking = () => {
  const navigate = useNavigate();
  const [openGenreModal, setOpenGenreModal] = useState(false);
  const [title, setTitle] = useState<string>();
  const [genreIds, setGenreIds] = useState<string[]>([]);
  const closeSideDrawer = (): void => {
    setOpenGenreModal(false);
  };
  const onCheckGenreIds = ({ ids }: { ids: string[] }): void => {
    setGenreIds(ids);
  };

  const onSubmit = () => {
    axios
      .post(Api.createRanking.buildPath(), {
        ranking: {
          title: title,
          genreIds: genreIds,
        },
      })
      .then((res) => {
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

  return (
    <div className={styles.createRanking}>
      <div className={styles.pageTitle}>
        <h2>Best-10を作成する</h2>
      </div>
      <div className={styles.form}>
        <div className={styles.title}>
          <p className={styles.titleLabel}>タイトル</p>
          <input
            className={styles.titleInput}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="タイトル"
          />
        </div>
        <div className={styles.genre}>
          <p className={styles.genreLabel}>ジャンル</p>
          <div
            className={classNames(styles.genreInput, { [styles.active]: genreIds.length })}
            onClick={() => setOpenGenreModal(true)}
          >
            <p>ジャンル{genreIds.length > 0 && " ・ " + genreIds.length}</p>
          </div>
        </div>
        <Button className={styles.createButton} onClick={() => onSubmit()}>
          作成する
        </Button>
      </div>
      <GenreCheckboxModal onCheck={onCheckGenreIds} isOpen={openGenreModal} />
      {openGenreModal && <BackDrop closeSideDrawer={closeSideDrawer} />}
    </div>
  );
};

export default CreateRanking;
