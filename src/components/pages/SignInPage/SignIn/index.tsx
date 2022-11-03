import React, { useState } from "react";
import styles from "./style.module.scss";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import { Form, Input, Button } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import routes from "../../../../constants/routes";

const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  async function onClickSignIn() {
    const request = await axios
      .post(Api.signIn.buildPath(), {
        account: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("AUTH_TOKEN", res.data.token);
        navigate(routes.top());
      })
      .catch((error) => {
        console.log(error);
      });
    return request;
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.title}>
        <p>ログイン</p>
      </div>
      <Form
        layout="vertical"
        footer={
          <Button block onClick={() => onClickSignIn()} type="submit" color="primary" size="large">
            ログイン
          </Button>
        }
      >
        <Form.Item name="username" label="ユーザーネーム" rules={[{ required: true, message: "ユーザーネームを入力してください" }]}>
          <Input value={username} onChange={(value) => setUsername(value)} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="パスワード"
          rules={[{ required: true, message: "パスワードを入力してください" }]}
          extra={<div className={styles.eye}>{!visible ? <EyeInvisibleOutline onClick={() => setVisible(true)} /> : <EyeOutline onClick={() => setVisible(false)} />}</div>}
        >
          <Input value={password} type={visible ? "text" : "password"} onChange={(value) => setPassword(value)} placeholder="Password" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
