import React from "react";
import { Route, Switch } from "react-router-dom";

// auth route
import AuthRoute from "../utils/authRoute/AuthRoute";

// redux
import { connect } from "react-redux";
import { RootStateType } from "../redux/store";

// pages
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";

type Props = ReturnType<typeof mapStateToProps>;

const AppRoutes: React.FC<Props> = (props) => {
  const { isAuthenticated } = props;
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
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
