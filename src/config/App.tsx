import React from "react";
import PageRoutes from "./PageRoutes";
import { AppProvider } from "./provider/AppProvider";
import "../assets/styles/global.scss";

const App = () => {
  return (
    <AppProvider>
      <PageRoutes />
    </AppProvider>
  );
};

export default App;
