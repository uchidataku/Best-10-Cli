import Genre from "../Genre";

interface Ranking {
  id: string;
  title: string;
  itemsCount: number;
  allLikesCount: number;
  genres: Genre[];
}

export default Ranking;
