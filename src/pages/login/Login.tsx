import React, { useState } from "react";
import axios from "axios";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

// types
import { ErrorsType, LoginUserType } from "../../types/types";

// components
import Logo from "../../images/Logo";
import Spinner from "../../components/spinner/Spinner";
import Input from "../../components/reusable/Input";

import { BASE_URL } from "../../constant";

interface Props extends RouteComponentProps {}

const Login: React.FC<Props> = (props) => {
  const { history } = props;
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<ErrorsType>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((state) => ({
      ...state,
      [name]: value
    }));
  };

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const logInUser = (user: LoginUserType) => {
    const response = axios
      .post(`${BASE_URL}/login`, user, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // something.token or something.password or something.general
    const something = await logInUser(userData);
    console.log("something: ", something);
  };

  return (
    <div className="login">
      <div className="logo">
        <Logo />
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Input
          htmlFor="email"
          labelTitle="Email"
          type="email"
          value={userData.email}
          error={errors.email}
          errorClass="errors"
          name="email"
          handleInputChange={handleInputChange}
        />
        {errors.email && <p>{errors.email}</p>}
        <Input
          htmlFor="password"
          labelTitle="Password"
          type="password"
          autoComplete="off"
          value={userData.password}
          error={errors.password}
          errorClass="errors"
          name="password"
          handleInputChange={handleInputChange}
        />
        {errors.password && <p>{errors.password}</p>}
        {errors.general && <p>{errors.general}</p>}
        <button
          type="submit"
          disabled={!userData.email || !userData.password || isLoading}
        >
          {isLoading ? <Spinner /> : "Login"}
        </button>
        <section>
          <span>Don't have account?</span>
          <Link to="/signup">Sign Up</Link>
        </section>
      </form>
    </div>
  );
};

export default withRouter(Login);
