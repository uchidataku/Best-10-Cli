import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../constants/routes";
import TopPage from "../components/pages/TopPage";
import AboutPage from "../components/pages/AboutPage";
import SignUpPage from "../components/pages/SignUpPage";
import SignInPage from "../components/pages/SignInPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import RankingPage from "../components/pages/RankingPage";
import CreateRankingPage from "../components/pages/CreateRankingPage";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path={routes.top()} element={<TopPage />} />
      <Route path={routes.about()} element={<AboutPage />} />
      <Route path={routes.signUp()} element={<SignUpPage />} />
      <Route path={routes.signIn()} element={<SignInPage />} />
      <Route path={routes.ranking()} element={<RankingPage />} />
      <Route path={routes.rankings()} element={<CreateRankingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
