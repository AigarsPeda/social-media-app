import React, { useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

// constants
import { BASE_URL } from "../../constant";

// types
import { ErrorsType } from "../../types/types";

// components
import Logo from "../../images/Logo";
import Spinner from "../../components/spinner/Spinner";
import Input from "../../components/reusable/Input";

interface Props extends RouteComponentProps {}

const Login: React.FC<Props> = (props) => {
  const { history } = props;
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<ErrorsType>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((state) => ({
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
      body: JSON.stringify(user)
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        // if form DB received token there are user such in DB
        if ("token" in data) {
          history.push("/");
          // console.log(data.token);
        } else {
          setErrors(data);
        }
      })
      .catch((err) => console.log(err));
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
          value={user.email}
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
          value={user.password}
          error={errors.password}
          errorClass="errors"
          name="password"
          handleInputChange={handleInputChange}
        />
        {errors.password && <p>{errors.password}</p>}
        {errors.general && <p>{errors.general}</p>}
        <button
          type="submit"
          disabled={!user.email || !user.password || isLoading}
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
