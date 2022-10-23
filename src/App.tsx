import React from "react";
import "./App.css";
import Rankings from "./components/Rankings";
import Card from "./components/Card";

const id = 'hoge'
const title = "好きな動物 Best-10"
const genre = '娯楽'

function App() {
  return (
    <div className="App">
      {/*<Rankings />*/}

      <Card id={id} title={title} genre={genre}/>
    </div>
  );
}

export default App;
