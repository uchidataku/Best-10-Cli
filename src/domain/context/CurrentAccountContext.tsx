import { createContext, FC, useContext, useEffect, useState } from "react";
import axios from "../../config/axios";
import Api from "../../config/qpi";
import Account from "../../models/Account";

type CurrentAccountUseCase = {
  account?: Account | undefined;
  setAccount: (account: Account) => void;
  setToken: (token: string | null) => void;
  setIsLoggedIn: (login: boolean) => void;
  isLoggedIn: boolean;
  refetchAccount: () => void;
};

export const CurrentAccountContext = createContext<CurrentAccountUseCase>({
  account: undefined,
  setAccount: () => undefined,
  setToken: () => undefined,
  setIsLoggedIn: () => undefined,
  isLoggedIn: false,
  refetchAccount: () => undefined,
});

interface ReactContextProps {
  children: React.ReactNode;
}

export const CurrentAccountContextProvider: FC<ReactContextProps> = ({ children }) => {
  const [account, _setAccount] = useState<Account>();
  const [token, _setToken] = useState<string | null>(null);
  const [isLogin, _setIsLogin] = useState<boolean>(false);
  const refetchAccount = fetchAccount;

  async function fetchAccount() {
    const request = await axios
      .get(Api.fetchCurrentAccount.buildPath())
      .then((res) => {
        console.log("request.data", res.data);
        setAccount(res.data);
        _setIsLogin(true);
      })
      .catch((error) => {
        console.log(error);
      });
    return request;
  }

  const setAccount = (account: Account) => {
    _setAccount(account);
  };

  const setToken = (authToken: string | null) => {
    _setToken(authToken);
    console.log("setLogin呼ばれた");

    if (authToken) {
      localStorage.setItem("AUTH_TOKEN", authToken);
    } else {
      localStorage.removeItem("AUTH_TOKEN");
    }
  };

  const setIsLoggedIn = (login: boolean) => {
    _setIsLogin(login);
  };

  useEffect(() => {
    console.log("fetchAccount呼ばれた");
    fetchAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  console.log("isLogin", isLogin);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <CurrentAccountContext.Provider
      value={{
        account,
        setAccount,
        setToken,
        setIsLoggedIn,
        isLoggedIn: isLogin,
        refetchAccount,
      }}
    >
      {children}
    </CurrentAccountContext.Provider>
  );
};

export const useCurrentAccountContext = (): CurrentAccountUseCase => {
  const context = useContext(CurrentAccountContext);
  console.log("useCurrentAccountContext", context);
  if (!context) throw new Error("CurrentAccountContext is not defined");
  return context;
};
