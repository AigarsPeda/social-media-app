import React from "react";
import { Link } from "react-router-dom";

// types
import { ScreamType } from "../../types/types";

// helper functions
import { dateFormatted } from "../../helpers/dateFormatted";

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

  // const dateFormatted = (isoDate: string) => {
  //   dayjs.extend(relativeTime);
  //   return dayjs(isoDate).fromNow();
  // };

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
