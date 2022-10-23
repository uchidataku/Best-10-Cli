import React from "react";

type Ranking = {
  id: string;
  title: string;
  genre: string;
};

const Card = (ranking: Ranking) => {
  console.log(ranking);

  return (
    <div>
      <h1>{ranking.title}</h1>
      <p>{ranking.genre}</p>
    </div>
  );
};

export default Card;
