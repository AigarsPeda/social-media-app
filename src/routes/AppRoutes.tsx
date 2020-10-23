import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

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
import User from "../pages/user/User";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const AppRoutes: React.FC<Props> = (props) => {
  const { token, logOutUser } = props;

  useEffect(() => {
    // checking if token is valid and if it is setting in to axios header
    if (token) {
      const decodedToken: TokenType = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        // user action if token has expired
        logOutUser();
      } else {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  }, [logOutUser, token]);

  return (
    <Switch>
      <AuthRoute exact path="/" component={Home} />
      <AuthRoute exact path="/users/:handle" component={User} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  token: state.user.token
});

const mapDispatchToProps = { logOutUser };

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
