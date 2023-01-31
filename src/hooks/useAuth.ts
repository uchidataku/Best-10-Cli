import { useQuery } from "react-query";
import axios from "../config/axios";
import Api from "../config/qpi";
import Account from "../models/Account";
import { useState } from "react";
import routes from "../constants/routes";

type authState = {
  isLoggedIn: boolean;
  token: string | null;
  currentAccount: Account | undefined;
  signOut: () => void;
  refetchCurrentAccount: () => void;
};

export const useAuth = (): authState => {
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const token = localStorage.getItem("AUTH_TOKEN");

  const fetchCurrentAccount = async () => {
    const res = await axios.get(Api.fetchCurrentAccount.buildPath());
    return res;
  };

  const { refetch } = useQuery("fetchCurrentAccount", fetchCurrentAccount, {
    enabled: !!token,
    onSuccess: (data) => {
      setAccount(data.data);
    },
  });

  const signOut = () => {
    localStorage.clear();
    window.location.href = routes.top();
  };

  return {
    isLoggedIn: !!token,
    token,
    currentAccount: account,
    signOut,
    refetchCurrentAccount: refetch,
  };
};
