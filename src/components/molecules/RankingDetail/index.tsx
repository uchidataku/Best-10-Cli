import React from "react";
import styles from "./style.module.scss"
import RankingDetailItem from "../RankingDetailItem";

const ranking_title = "好きな漫画 Best-10";

const RankingDetail = () => {
  return (
    <div className={styles.rankingDetail}>
      <div className={styles.rankingTitle}>
        <p>{ranking_title}</p>
      </div>
      <div className={styles.rankingDetailItems}>
        <RankingDetailItem rank={1} title={"OnePiece"} like_counts={5322}/>
        <RankingDetailItem rank={2} title={"OnePiece"} like_counts={5322}/>
        <RankingDetailItem rank={3} title={"OnePiece"} like_counts={5322}/>
        <RankingDetailItem rank={4} title={"OnePiece"} like_counts={5322}/>
        <RankingDetailItem rank={5} title={"OnePiece"} like_counts={5322}/>
        <RankingDetailItem rank={6} title={"OnePiece"} like_counts={5322}/>
        <RankingDetailItem rank={7} title={"OnePiece"} like_counts={5322}/>
        <RankingDetailItem rank={8} title={"OnePiece"} like_counts={5322}/>
        <RankingDetailItem rank={9} title={"OnePiece"} like_counts={5322}/>
        <RankingDetailItem rank={10} title={"OnePiece"} like_counts={5322}/>
        <RankingDetailItem rank={11} title={"OnePiece"} like_counts={5322}/>
        <RankingDetailItem rank={12} title={"OnePiece"} like_counts={5322}/>
      </div>
    </div>
  );
};

export default RankingDetail;
