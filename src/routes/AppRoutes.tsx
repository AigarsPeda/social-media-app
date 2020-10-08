import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// token check
import axios from "axios";
import jwtDecode from "jwt-decode";
import { TokenType } from "../types/types";

// auth route
import AuthRoute from "../utils/authRoute/AuthRoute";

// redux
import { connect } from "react-redux";
import { RootStateType } from "../redux/store";
import { logOutUser } from "../redux/actions/userAction";

// pages
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const AppRoutes: React.FC<Props> = (props) => {
  const { isAuthenticated, token, logOutUser } = props;

  // TODO: i should check if token has not been ended
  useEffect(() => {
    // checking if token is valid and if it is setting in to axios header
    if (token) {
      console.log("ES TE");
      const decodedToken: TokenType = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        // user action if token has expired
        logOutUser();
        <Redirect to="/login" />;
      } else {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  });

  return (
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
  );
};

const mapStateToProps = (state: RootStateType) => ({
  isAuthenticated: state.user.isAuthenticated,
  token: state.user.token
});

const mapDispatchToProps = { logOutUser };

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
