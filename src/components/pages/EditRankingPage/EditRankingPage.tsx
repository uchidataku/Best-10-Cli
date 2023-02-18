import React from "react";
import EditRanking from "./EditRanking/EditRanking";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";

const EditRankingPage = () => {
  const { id: rankingId } = useParams();
  const fetchRanking = async () => {
    if (!rankingId) return;

    const res = await axios.get(Api.fetchRanking.buildPath(rankingId));
    return res;
  };
  const { data: rankingData } = useQuery(`fetchRanking`, fetchRanking, {
    enabled: !!rankingId,
  });

  return rankingData?.data && <EditRanking ranking={rankingData.data} />;
};

export default EditRankingPage;
