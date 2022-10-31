import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../constants/routes";
import TopPage from "../components/pages/TopPage";
import SignUpPage from "../components/pages/SignUpPage";
import SignInPage from "../components/pages/SignInPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import RankingPage from "../components/pages/RankingPage";

const id = "hoge";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path={routes.top()} element={<TopPage />} />
      <Route path={routes.signUp()} element={<SignUpPage />} />
      <Route path={routes.signIn()} element={<SignInPage />} />
      <Route path={routes.ranking(id)} element={<RankingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
