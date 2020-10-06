import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { createUser } from "../../redux/actions/userAction";

// types
import { RootStateType } from "../../redux/store";

// components
import Logo from "../../images/Logo";
import Spinner from "../../components/spinner/Spinner";
import Input from "../../components/reusable/Input";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const SignUp: React.FC<Props> = (props) => {
  const { createUser, isAuthenticated, isLoading, errors } = props;
  const [newUserData, setNewUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUserData((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // User action
    createUser(newUserData);
  };

  const displayError = (error: string | undefined) => {
    return error && <p>{error}</p>;
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

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
          value={newUserData.email}
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
          value={newUserData.password}
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
          value={newUserData.confirmPassword}
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
          value={newUserData.handle}
          error={errors.handel}
          errorClass="errors"
          name="handle"
          handleInputChange={handleInputChange}
        />
        {displayError(errors.handel)}
        {displayError(errors.general)}
        <button
          type="submit"
          disabled={!newUserData.email || !newUserData.password || isLoading}
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

const mapStateToProps = (state: RootStateType) => ({
  isAuthenticated: state.user.isAuthenticated,
  errors: state.errors.error,
  isLoading: state.ui.isLoading
});

const mapDispatchToProps = { createUser };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
