import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { RootStateType } from "../../redux/store";
import { logInUser } from "../../redux/actions/userAction";

// components
import Logo from "../../images/Logo";
import Spinner from "../../components/spinner/Spinner";
import Input from "../../components/reusable/Input";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Login: React.FC<Props> = (props) => {
  const { logInUser, isAuthenticated, errors } = props;
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

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
    // User action
    logInUser(userData);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      {console.log("LOGIN COMPONENT: ", isAuthenticated)}
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

const mapStateToProps = (state: RootStateType) => ({
  isAuthenticated: state.user.isAuthenticated,
  errors: state.errors.error
});

const mapDispatchToProps = { logInUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
