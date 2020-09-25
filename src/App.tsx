import React from "react";

import "./global.styles/App.scss";
import Random from "./components/Random";

const App: React.FC = () => {
  return (
    <div className="App">
      <Random />
      <h1>Hello World</h1>
    </div>
  );
};

export default App;
