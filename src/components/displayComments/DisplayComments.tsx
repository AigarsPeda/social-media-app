import React, { useState } from "react";
import dayjs from "dayjs";

// redux
import { Link } from "react-router-dom";
import { ScreamComment } from "../../types/types";
import { RootStateType } from "../../redux/store";
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

// component
import AddComment from "../addComment/AddComment";

type MyProps = {
  comments: ScreamComment[];
  screamId: string;
};
type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  MyProps;

const DisplayComments: React.FC<Props> = (props) => {
  const { comments, screamId, errors, submitComment } = props;
  const [commentBody, setCommentBody] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitComment(screamId, commentBody);
    setCommentBody("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentBody(e.target.value);
  };

  return (
    <div className="display-comments">
      <AddComment
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        error={errors.comment}
        commentBody={commentBody}
        name="commentBody"
      />

      {comments && comments.length ? (
        comments.map((comment, index) => {
          const { createdAt, userHandle, userImage, body } = comment;
          return (
            <div key={createdAt}>
              <section className="comments">
                <div className="img-container">
                  <img src={userImage} />
                </div>
                <div className="content-container">
                  <Link to={`/users/${userHandle}`}>{userHandle}</Link>
                  <p className="comment-body">{body}</p>
                  <p className="created-at">
                    {dayjs(createdAt).format("HH:mm, DD MMMM YYYY")}
                  </p>
                </div>
              </section>
              {index !== comments.length - 1 && <hr />}
            </div>
          );
        })
      ) : (
        <div>
          <h3>No Comments!</h3>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  user: state.user.userData.credentials,
  errors: state.errors.error
});

const mapDispatchToProps = { submitComment };

export default connect(mapStateToProps, mapDispatchToProps)(DisplayComments);
