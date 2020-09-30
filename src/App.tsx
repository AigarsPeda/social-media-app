import React, { useEffect, useState } from "react";
import "./global.styles/App.scss";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";

// types
import { TokenType } from "./types/types";

// utils
import AuthRoute from "./utils/authRoute/AuthRoute";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

// components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Navbar from "./components/navbar/Navbar";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("FBIdToken");
    if (token) {
      const decodedToken: TokenType = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = "/login";
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <div className="App">
          <Switch>
            <AuthRoute
              exact
              path="/"
              component={Home}
              isAuthenticated={isAuthenticated}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
