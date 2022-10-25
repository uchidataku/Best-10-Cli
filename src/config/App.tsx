import React from "react";
import PageRoutes from "./PageRoutes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <PageRoutes />
    </Router>
  );
}

export default App;
