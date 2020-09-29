import React, { useState } from "react";

import { Link, RouteComponentProps, withRouter } from "react-router-dom";

// types
import { ErrorsType } from "../../types/types";

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    fetch(BASE_URL + "/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        // if form DB received token there are user such in DB
        if ("token" in data) {
          console.log(data.token);
          localStorage.setItem("FBIdToken", `Bearer ${data.token}`);
          history.push("/");
        } else {
          setErrors(data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      {console.log(errors)}
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
