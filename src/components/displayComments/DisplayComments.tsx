import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { ScreamComment } from "../../types/types";

type MyProps = {
  comments: ScreamComment[];
};

const DisplayComments: React.FC<MyProps> = (props) => {
  const { comments } = props;
  return (
    <div className="display-comments">
      {comments && comments.length ? (
        comments.map((comment) => {
          return (
            <section key={comment.createdAt} className="comments">
              <div className="img-container">
                <img src={comment.userImage} />
              </div>
              <div className="content-container">
                <Link to={`/users/${comment.userHandle}`}>
                  {comment.userHandle}
                </Link>
                <p className="comment-body">{comment.body}</p>
                <p className="created-at">
                  {dayjs(comment.createdAt).format("HH:mm, DD MMMM YYYY")}
                </p>
              </div>
            </section>
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

export default DisplayComments;
