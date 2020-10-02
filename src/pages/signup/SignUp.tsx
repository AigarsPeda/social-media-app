import React, { useState } from "react";

import { Link, RouteComponentProps, withRouter } from "react-router-dom";

// types
import { ErrorsType } from "../../types/types";

// components
import Logo from "../../images/Logo";
import Spinner from "../../components/spinner/Spinner";
import Input from "../../components/reusable/Input";
import { signUser } from "../../services/auth.services";

interface Props extends RouteComponentProps {}

const SignUp: React.FC<Props> = (props) => {
  const { history } = props;
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: ""
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // localStorage.setItem("FBIdToken", `Bearer ${data.token}`);
    const something = await signUser(userData);
    console.log(something);
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
          value={userData.email}
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
          value={userData.password}
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
          value={userData.confirmPassword}
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
          value={userData.handle}
          error={errors.handel}
          errorClass="errors"
          name="handle"
          handleInputChange={handleInputChange}
        />
        {displayError(errors.handel)}
        {displayError(errors.general)}
        <button
          type="submit"
          disabled={!userData.email || !userData.password || isLoading}
        >
          {isLoading ? <Spinner /> : "Sign Up"}
        </button>
        <section>
          <span>Already have an account?</span>
          <Link to="/login">Log In</Link>
        </section>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
