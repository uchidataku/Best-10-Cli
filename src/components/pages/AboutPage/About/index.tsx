import React from "react";
import styles from "./style.module.scss";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.title}>
        <p>Best-10とは</p>
      </div>
      <div className={styles.description}>
        <p>あらゆるジャンルにおけるランキング(Best-10)を掲載しています。</p>
        <p>ランキングは自由に作成することができます。</p>
        <p>ランキングの項目も自由に追加することができます。</p>
        <p>各項目に対していいねをつけることができます。</p>
        <p>オリジナルのランキングを作成しましょう!</p>
      </div>
    </div>
  );
};

export default About;
