import { useQuery } from "react-query";
import axios from "../config/axios";
import Api from "../config/qpi";
import Account from "../models/Account";

type authState = {
  isLoggedIn: boolean;
  token: string | null;
  currentAccount: Account | undefined;
};

export const useAuth = (): authState => {
  const token = localStorage.getItem("AUTH_TOKEN");

  const fetchCurrentAccount = async () => {
    const res = await axios.get(Api.fetchCurrentAccount.buildPath());
    return res;
  };

  const { data } = useQuery("fetchCurrentAccount", fetchCurrentAccount, { enabled: !token });

  const currentAccount = data?.data;

  console.log("token", token);
  console.log("currentAccount", currentAccount);

  return {
    isLoggedIn: !!token,
    token,
    currentAccount,
  };
};
