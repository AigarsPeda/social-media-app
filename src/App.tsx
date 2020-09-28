import React from "react";
import "./global.styles/App.scss";

import { Switch, Route, BrowserRouter } from "react-router-dom";

// components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Navbar from "./components/navbar/Navbar";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
