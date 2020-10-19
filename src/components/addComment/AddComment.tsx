import React from "react";
import Input from "../reusable/Input";

type MyProps = {
  name: string;
  error: string | undefined;
  commentBody: string;

  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AddComment: React.FC<MyProps> = (props) => {
  const { handleSubmit, handleInputChange, commentBody, error } = props;
  return (
    <div className="add-comment">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          autoComplete="off"
          value={commentBody}
          error={error}
          errorClass="errors"
          name="commentBody"
          placeholder="Add Comment!"
          handleInputChange={handleInputChange}
        />
        {error && <p>{error}</p>}
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default AddComment;
