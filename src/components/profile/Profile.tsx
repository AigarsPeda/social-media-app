import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// redux
import { connect } from "react-redux";
import { RootStateType } from "../../redux/store";

import Location from "../../images/Location";
import Spinner from "../spinner/Spinner";
import WebSite from "../../images/WebSite";
import Calendar from "../../images/Calendar";
import At from "../../images/At";
import Pencil from "../../images/Pencil";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Profile: React.FC<Props> = (props) => {
  const { user, isLoadingUser, isAuthenticated } = props;

  const profileMarkup = () => {
    // nested ternary statements
    return isLoadingUser ? (
      <div className="spinner">
        <Spinner />
      </div>
    ) : isAuthenticated ? (
      <div className="container">
        <div className="img-container">
          <img src={user.imageUrl} />
        </div>

        <Link to={`/users/${user.handle}`}>
          <h1>
            <At />
            {user.handle}
          </h1>
        </Link>
        {user.bio && (
          <p>
            <Pencil className="icon" />
            {user.bio}
          </p>
        )}
        {user.location && (
          <>
            <p>
              <Location className="icon" />
              {user.location}
            </p>
          </>
        )}
        {user.website && (
          <a href={user.website} target="_blank" rel="noopener noreferrer">
            <p>
              <WebSite className="icon" />
              {user.website}
            </p>
          </a>
        )}
        <p>
          <Calendar className="icon" />
          Joined: {dayjs(user.createdAt).format("MMM YYYY")}
        </p>
      </div>
    ) : (
      <div>
        <h3>No profile found, please login again</h3>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  };

  return <div className="profile">{profileMarkup()}</div>;
};

const mapStateToProps = (state: RootStateType) => ({
  user: state.user.userData.credentials,
  isLoadingUser: state.user.isLoadingUser,
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
