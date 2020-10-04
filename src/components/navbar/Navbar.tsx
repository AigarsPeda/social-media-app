import React from "react";
import { Link } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { logOutUser } from "../../redux/actions/userAction";
import { RootStateType } from "../../redux/store";

// components
import Logo from "../../images/Logo";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Navbar: React.FC<Props> = (props) => {
  const { isAuthenticated, logOutUser } = props;
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <Logo />
        </Link>
        {isAuthenticated ? (
          <button onClick={logOutUser}>Log Out</button>
        ) : (
          <ul className="links">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = { logOutUser };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
