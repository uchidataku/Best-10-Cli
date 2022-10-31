import React from "react";
import axios from "../../../../config/axios";
import Api from "../../../../config/qpi";
import { Input, Button } from "antd";

const SignUp = () => {
  async function onClickSignUp() {
    const request = await axios.post(Api.signUp.buildPath());
    return request;
  }

  return (
    <div>
      <p>新規登録</p>
      <Input placeholder="Username" />
      <Input.Password placeholder="Password" />

      <Button type="primary" onClick={() => onClickSignUp()}>
        登録
      </Button>
    </div>
  );
};

export default SignUp;
