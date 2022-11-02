import React from "react";
import { useLocation } from "react-router-dom";
import RankingDetail from "../../../molecules/RankingDetail";

const Ranking = () => {
  const location = useLocation();

  return (
    <div>
      <RankingDetail rankingId={location.pathname.split("/")[2]} />
    </div>
  );
};

export default Ranking;
