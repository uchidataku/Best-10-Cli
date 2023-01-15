import React from "react";
import GenreDetail from "./GenreDetail";
import styles from "./GenreDetail/style.module.scss";

type GenreDetailPageProps = {
  genreId: string;
};

const GenreDetailPage = ({ genreId }: GenreDetailPageProps) => {
  return (
    <div className={styles.genreDetailPage}>
      <p>{genreId}</p>
      <GenreDetail />
    </div>
  );
};

export default GenreDetailPage;
