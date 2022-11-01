import React from "react";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import { Input, Button } from "antd";
import styles from "./style.module.scss";

const SignUp = () => {
  async function onClickSignUp() {
    const request = await axios.post(Api.signUp.buildPath());
    return request;
  }

  return (
    <div className={styles.signUp}>
      <div className={styles.title}>
        <p>新規登録</p>
      </div>
      <div>
        <div>
          <p>ユーザーネーム</p>
          <Input placeholder="Username" />
        </div>
        <div>
          <p>パスワード</p>
          <Input.Password placeholder="Password" />
        </div>

        <Button type="primary" onClick={() => onClickSignUp()}>
          登録
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
