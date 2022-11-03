import React from "react";
import PageRoutes from "./PageRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./style.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h2>Best-10</h2>
      </header>
      <main>
        <Router>
          <PageRoutes />
        </Router>
      </main>
    </div>
  );
}

export default App;
