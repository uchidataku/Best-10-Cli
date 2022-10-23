import React, { useEffect, useState } from "react";
import axios from "../axios";
import Api from "../qpi";
import Card from "./Card";

type Ranking = {
  id: string;
  title: string;
  genre: string;
};

const Rankings = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(Api.fetchRankings.buildPath());
      setRankings(request.data.rankings);
      return request;
    }
    fetchData();
  }, []);

  console.log(rankings);

  return (
    <div>
      {/*{rankings.map((ranking) => {*/}
      {/*  <Card id={ranking.id} title={ranking.title} genre={ranking.genre} />;*/}
      {/*})}*/}
    </div>
  );
};

export default Rankings;
