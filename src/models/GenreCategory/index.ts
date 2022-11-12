import Genre from "../Genre";

interface GenreCategory {
  id: string;
  name: string;
  genres: Genre[];
}

export default GenreCategory;
