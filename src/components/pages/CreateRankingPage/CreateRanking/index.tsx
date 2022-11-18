import React from "react";
import styles from "./style.module.scss";
import { Button, notification } from "antd";
import { useForm, Controller } from "react-hook-form";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import routes from "../../../../constants/routes";
import { Toast } from "antd-mobile";
import { GenreObjects } from "../../../../models/Ranking/helpers";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

type FormInput = {
  title: string;
  genre: { value: string; label: string };
};

const CreateRanking = () => {
  const { control, handleSubmit } = useForm<FormInput>();
  const navigate = useNavigate();

  const onSubmit = (data: FormInput) => {
    axios
      .post(Api.createRanking.buildPath(), {
        ranking: {
          title: data.title,
          genre: data.genre.value,
        },
      })
      .then((res) => {
        console.log(res.data);
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className={styles.title}>
              <p className={styles.titleLabel}>タイトル</p>
              <input className={styles.titleInput} value={value} placeholder="タイトル" onChange={onChange} />
            </div>
          )}
        />
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <div className={styles.genre}>
              <p className={styles.genreLabel}>ジャンル</p>
              <Select {...field} className={styles.genreInput} placeholder="ジャンル" options={GenreObjects} />
            </div>
          )}
        />
        <Button className={styles.createButton} onClick={handleSubmit(onSubmit)}>
          作成する
        </Button>
      </form>
    </div>
  );
};

export default CreateRanking;
