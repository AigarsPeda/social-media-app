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

const SignUp: React.FC<Props> = (props) => {
  const { history } = props;
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: ""
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
    fetch(BASE_URL + "/signup", {
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

  const displayError = (error: string | undefined) => {
    return error && <p>{error}</p>;
  };

  return (
    <div className="signup">
      <div className="logo">
        <Logo />
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
        {displayError(errors.email)}
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
        {displayError(errors.password)}
        <Input
          htmlFor="password"
          labelTitle="Confirm Password"
          type="password"
          autoComplete="off"
          value={user.confirmPassword}
          error={errors.confirmPassword}
          errorClass="errors"
          name="confirmPassword"
          handleInputChange={handleInputChange}
        />
        {displayError(errors.confirmPassword)}
        <Input
          htmlFor="handle"
          labelTitle="Handle"
          type="text"
          autoComplete="on"
          value={user.handle}
          error={errors.handel}
          errorClass="errors"
          name="handle"
          handleInputChange={handleInputChange}
        />
        {displayError(errors.handel)}
        {displayError(errors.general)}
        <button
          type="submit"
          disabled={!user.email || !user.password || isLoading}
        >
          {isLoading ? <Spinner /> : "Sign Up"}
        </button>
        <section>
          <span>Don't have account?</span>
          <Link to="/login">Log In</Link>
        </section>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
