import React from "react";
import { useLocation } from "react-router-dom";
import RankingDetail from "../../../molecules/RankingDetail";

const Ranking = () => {
  const location = useLocation();
  const rankingId = location.pathname.split("/")[2];

  return (
    <div>
      <RankingDetail rankingId={rankingId} />
    </div>
  );
};

export default Ranking;
