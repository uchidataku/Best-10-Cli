import React from "react";
import styles from "../../SignUpPage/SignUp/style.module.scss";
import { Button, Input } from "antd";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";

const SignIn = () => {
  async function onClickSignIn() {
    const request = await axios.post(Api.signIn.buildPath());
    return request;
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.title}>
        <p>ログイン</p>
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

        <Button type="primary" onClick={() => onClickSignIn()}>
          ログイン
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
