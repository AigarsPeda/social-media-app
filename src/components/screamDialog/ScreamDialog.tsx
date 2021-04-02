import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// redux
import { connect } from "react-redux";
import {
  getScream,
  likeScream,
  unLikeScream
} from "../../redux/actions/dataActions";
import { RootStateType } from "../../redux/store";

// icons
import CancelIcon from "../../images/CancelIcon";
import DownArrowIcon from "../../images/DownArrowIcon";

// components
import Spinner from "../spinner/Spinner";
import Comment from "../reusable/comment/Comment";
import LikeAndUnlikeButton from "../reusable/likeAndUnlikeButton/LikeAndUnlikeButton";
import DisplayComments from "../displayComments/DisplayComments";

type MyProps = {
  screamId: string;
  userHandle: string;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  MyProps;

const ScreamDialog: React.FC<Props> = (props) => {
  const {
    isLoading,
    screamId,
    scream,
    user,
    getScream,
    likeScream,
    unLikeScream
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleOpen = () => {
    getScream(screamId);
    setIsOpen(true);
    setToggle(true);

    console.log(scream);
  };

  const handleClose = () => {
    setToggle(false);

    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;

    if (element.classList.contains("scream-dialog-modal")) {
      setToggle(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
  };

  return (
    <div className="scream-dialog">
      <button onClick={handleOpen} className="open-btn">
        <DownArrowIcon />
      </button>
      {isOpen && (
        <div className="scream-dialog-modal" onClick={handleOutClick}>
          <div
            className={
              toggle ? "dialog-content toggleIn" : "dialog-content toggleOut"
            }
          >
            {isLoading ? (
              <div className="spinner">
                <Spinner />
              </div>
            ) : (
              <div>
                <div className="cancel">
                  <span onClick={handleClose}>
                    <CancelIcon />
                  </span>
                </div>
                <div className="main">
                  <div className="scream-dialog-img">
                    <img src={require("../../images/Prof.jpeg")} />
                  </div>
                  <div className="content-container">
                    <Link to={`/users/${scream.userHandle}`}>
                      {scream.userHandle}
                    </Link>
                    <p>
                      {dayjs(scream.createdAt).format("HH:mm, DD MMMM YYYY")}
                    </p>
                    <section>
                      <p className="body">{scream.body}</p>
                      <div className="like-comment-container">
                        <LikeAndUnlikeButton
                          likes={user.userData.likes}
                          id={screamId}
                          likeScream={likeScream}
                          unLikeScream={unLikeScream}
                        />
                        <p>{scream.likeCount}</p>
                        <Comment />
                        <p>{scream.commentCount}</p>
                      </div>
                    </section>
                  </div>
                </div>
                <DisplayComments
                  comments={scream.comments}
                  screamId={screamId}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  isLoading: state.ui.isLoading,
  scream: state.data.scream,
  user: state.user
});

const mapDispatchToProps = { getScream, likeScream, unLikeScream };

export default connect(mapStateToProps, mapDispatchToProps)(ScreamDialog);
