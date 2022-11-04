import { Genre } from "./helpers";

interface Ranking {
  id: string;
  title: string;
  genre: Genre;
  itemsCount: number;
  allLikesCount: number;
}

export default Ranking;
