import React, { useState } from "react";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import { Form, Input, Button, Toast } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import styles from "./style.module.scss";
import routes from "../../../../constants/routes";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  async function onClickSignUp() {
    const request = await axios
      .post(Api.signUp.buildPath(), {
        account: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("AUTH_TOKEN", res.data.token);
        navigate(routes.top());
        Toast.show({
          icon: "success",
          content: "登録しました",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    return request;
  }

  return (
    <div className={styles.signUp}>
      <div className={styles.title}>
        <p>新規登録</p>
      </div>

      <Form
        layout="vertical"
        footer={
          <Button block onClick={() => onClickSignUp()} type="submit" color="primary" size="large">
            登録
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
      {/*<div>*/}
      {/*  <div className={styles.username}>*/}
      {/*    <p className={styles.usernameTag}>ユーザーネーム</p>*/}
      {/*    /!*<input className={styles.usernameInput} type="text" placeholder="Username" />*!/*/}
      {/*    <Input className={styles.usernameInput} size="small" placeholder="Username" />*/}
      {/*  </div>*/}
      {/*  <div className={styles.password}>*/}
      {/*    <p>パスワード</p>*/}
      {/*    /!*<input className={styles.passwordInput} type="password" placeholder="Password" />*!/*/}
      {/*    <Input.Password size="small" placeholder="Password" />*/}
      {/*  </div>*/}

      {/*  <Button type="primary" onClick={() => onClickSignUp()}>*/}
      {/*    登録*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  );
};

export default SignUp;
