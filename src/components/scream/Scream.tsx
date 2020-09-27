import React from "react";
import { Link } from "react-router-dom";
import { ScreamType } from "../../types/types";

interface Props {
  scream: ScreamType;
}

const Scream: React.FC<Props> = (props) => {
  const { scream } = props;
  const {
    body,
    createdAt,
    userImage,
    userHandle,
    screamId,
    likeCount,
    commentCount
  } = scream;

  const dateFormatted = (isoDate: string) => {
    const date = new Date(isoDate);
    var options = {
      hour: "numeric",
      minute: "numeric"
      // day: "numeric",
      // month: "numeric",
      // year: "numeric"
    };

    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div className="scream">
      <div className="img-container">
        <img src={userImage} />
      </div>
      <div className="content-container">
        <Link to={`/users/${userHandle}`} className="user-handle">
          {userHandle}
        </Link>
        <p className="created-at">{dateFormatted(createdAt)}</p>
        <p className="body">{body}</p>
      </div>
    </div>
  );
};

export default Scream;
