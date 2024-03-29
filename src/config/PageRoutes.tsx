import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../constants/routes";
import TopPage from "../components/pages/TopPage/TopPage";
import AboutPage from "../components/pages/AboutPage/AboutPage";
import SignUpPage from "../components/pages/SignUpPage/SignUpPage";
import SignInPage from "../components/pages/SignInPage/SignInPage";
import NotFoundPage from "../components/pages/NotFoundPage/NotFoundPage";
import RankingPage from "../components/pages/RankingPage/RakingPage";
import CreateRankingPage from "../components/pages/CreateRankingPage/CreateRankingPage";
import SearchPage from "../components/pages/SearchPage/SearchPage";
import GenreDetailPage from "../components/pages/GenreDetailPage/GenreDetailPage";
import EditRankingPage from "../components/pages/EditRankingPage/EditRankingPage";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path={routes.top()} element={<TopPage />} />
      <Route path={routes.genre(":id")} element={<GenreDetailPage />} />
      <Route path={routes.search()} element={<SearchPage />} />
      <Route path={routes.about()} element={<AboutPage />} />
      <Route path={routes.signUp()} element={<SignUpPage />} />
      <Route path={routes.signIn()} element={<SignInPage />} />
      <Route path={routes.ranking(":id")} element={<RankingPage />} />
      <Route path={routes.editRanking(":id")} element={<EditRankingPage />} />
      <Route path={routes.rankings()} element={<CreateRankingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
