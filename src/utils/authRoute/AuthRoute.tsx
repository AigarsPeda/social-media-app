import React from "react";
import { Route, Redirect } from "react-router-dom";

type propsFromRoute = {
  component: React.FC;
  path: string;
  exact: boolean;
  isAuthenticated: boolean;
};

type Props = propsFromRoute;

const AuthRoute: React.FC<Props> = (props) => {
  const { isAuthenticated, component, path, exact } = props;
  return !isAuthenticated ? (
    <Redirect to="/login" />
  ) : (
    <Route path={path} exact={exact} component={component} />
  );
};

export default AuthRoute;
