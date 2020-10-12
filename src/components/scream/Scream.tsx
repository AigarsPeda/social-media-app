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
import EmptyLikeIcon from "../../images/EmptyLikeIcon";
import LikeIcon from "../../images/LikeIcon";
import CommentIcon from "../../images/CommentIcon";
import TrashCanIcon from "../../images/TrashCanIcon";

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

  // TODO: disable button if user already liked scream
  // and show different icon

  const isLikedScream = (id: string) => {
    const { likes } = user.userData;
    if (likes.length && likes.find((like) => like.screamId === id)) {
      return true;
    } else {
      return false;
    }
  };

  const likeAndUnlikeButton = () => {
    return !isLikedScream(screamId) ? (
      <button onClick={() => likeScream(screamId)}>
        <EmptyLikeIcon />
      </button>
    ) : (
      <button onClick={() => unLikeScream(screamId)}>
        <LikeIcon className="like" />
      </button>
    );
  };

  const isOwner = () => {
    if (user.userData.credentials.handle === userHandle) {
      return true;
    } else {
      return false;
    }
  };

  const deleteButton = () => {
    return isOwner() ? (
      <button className="btn-delete">
        <TrashCanIcon />
      </button>
    ) : null;
  };

  return (
    <div className="scream">
      {console.log("Scream:", scream)}
      {console.log("User: ", user.userData.likes)}
      <div className="img-container">
        <img src={userImage} />
      </div>
      <div className="content-container">
        <Link to={`/users/${userHandle}`} className="user-handle">
          {userHandle}
        </Link>

        <p className="created-at">{dateFormatted(createdAt)}</p>
        <p className="body">{body}</p>
        <div className="action-container">
          <p>
            {likeAndUnlikeButton()}
            {likeCount} Likes
          </p>
          <p>
            <button>
              <CommentIcon className="comments" />
            </button>
            {commentCount} Comments
          </p>
        </div>
      </div>
      <div className="delete-container">{deleteButton()}</div>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  user: state.user,
  isLoadingUser: state.user.isLoadingUser
});

const mapDispatchToProps = { likeScream, unLikeScream };

export default connect(mapStateToProps, mapDispatchToProps)(Scream);
