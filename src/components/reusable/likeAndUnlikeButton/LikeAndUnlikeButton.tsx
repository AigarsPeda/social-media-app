import React from "react";
import EmptyLikeIcon from "../../../images/EmptyLikeIcon";
import LikeIcon from "../../../images/LikeIcon";
import { DataActionThunk } from "../../../redux/actions/dataActions";

type Props = {
  id: string;
  likes: {
    userHandle: string;
    screamId: string;
  }[];
  likeScream: (screamId: string) => DataActionThunk;
  unLikeScream: (screamId: string) => DataActionThunk;
};

const LikeAndUnlikeButton: React.FC<Props> = (props) => {
  const { id, likes, likeScream, unLikeScream } = props;

  const isLikedScream = (id: string) => {
    if (likes.length && likes.find((like) => like.screamId === id)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="like-unlike-btn">
      {!isLikedScream(id) ? (
        <button onClick={() => likeScream(id)}>
          <EmptyLikeIcon />
        </button>
      ) : (
        <button onClick={() => unLikeScream(id)} className="like">
          <LikeIcon />
        </button>
      )}
    </div>
  );
};

export default LikeAndUnlikeButton;
