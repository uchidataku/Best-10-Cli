import React from "react";
import { AppProvider } from "./provider/AppProvider";
import "../assets/styles/global.scss";
import { AppLayout } from "./layout/AppLayout";

const App = () => {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
};

export default App;
