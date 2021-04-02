import React from "react";
import { Link } from "react-router-dom";

// types
import { ScreamType } from "../../types/types";

// helper functions
import { dateFormatted } from "../../helpers/dateFormatted";

// redux
import { connect } from "react-redux";
import { RootStateType } from "../../redux/store";
import { likeScream, unLikeScream } from "../../redux/actions/dataActions";

// components
import Comment from "../reusable/comment/Comment";
import DeleteScream from "../deleteScream/DeleteScream";
import ScreamDialog from "../screamDialog/ScreamDialog";
import LikeAndUnlikeButton from "../reusable/likeAndUnlikeButton/LikeAndUnlikeButton";

type MyProps = {
  scream: ScreamType;
};
type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  MyProps;

const Scream: React.FC<Props> = (props) => {
  const { scream, user, likeScream, unLikeScream } = props;
  const {
    body,
    createdAt,
    userImage,
    userHandle,
    screamId,
    likeCount,
    commentCount
  } = scream;

  const isOwner = () => {
    if (user.userData.credentials.handle === userHandle) {
      return true;
    } else {
      return false;
    }
  };

  const deleteButton = (screamId: string) => {
    return isOwner() ? <DeleteScream screamId={screamId} /> : null;
  };

  return (
    <div className="scream">
      <div className="scream-card">
        <div className="img-container">
          <img src={require("../../images/Prof.jpeg")} alt="profile picture" />
        </div>
        <div className="content-container">
          <Link to={`/users/${userHandle}`} className="user-handle">
            {userHandle}
          </Link>

          <p className="created-at">{dateFormatted(createdAt)}</p>
          <p className="body">{body}</p>
          <div className="action-container">
            <div className="like-container">
              <LikeAndUnlikeButton
                likes={user.userData.likes}
                id={screamId}
                likeScream={likeScream}
                unLikeScream={unLikeScream}
              />
              {likeCount} likes
            </div>
            <div className="comment-container">
              <Comment />
              {commentCount} Comments
            </div>
          </div>
        </div>
        <div className="delete-container">
          {deleteButton(screamId)}
          <ScreamDialog screamId={screamId} userHandle={userHandle} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  user: state.user,
  isLoadingUser: state.user.isLoadingUser
});

const mapDispatchToProps = { likeScream, unLikeScream };

export default connect(mapStateToProps, mapDispatchToProps)(Scream);
