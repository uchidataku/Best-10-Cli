import Genre from "../Genre";

interface Ranking {
  id: string;
  title: string;
  itemsCount: number;
  allLikesCount: number;
  viewerCanUpdate: boolean;
  viewerCanDelete: boolean;
  genres: Genre[];
}

export default Ranking;
