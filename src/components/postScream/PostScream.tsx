import React, { useState } from "react";

// redux
import { connect } from "react-redux";
import { RootStateType } from "../../redux/store";

// icons
import PlusIcon from "../../images/PlusIcon";
import Spinner from "../spinner/Spinner";
import { postScream } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/errorActions";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const PostScream: React.FC<Props> = (props) => {
  const { isLoading, errors, postScream, clearErrors } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [screamBody, setScreamBody] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setScreamBody(value);
  };

  const handleCancel = () => {
    clearErrors();
    setScreamBody("");
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postScream(screamBody);

    setScreamBody("");
    setIsOpen(false);
  };

  return (
    <div className="add-scream">
      <button onClick={() => setIsOpen((state) => !state)}>
        <PlusIcon />
      </button>
      {isOpen && (
        <div className="add-scream-modal">
          <form onSubmit={handleSubmit}>
            <label htmlFor="new scream">Add New Scream!</label>
            <textarea
              rows={6}
              value={screamBody}
              name="new scream"
              onChange={handleChange}
            />
            <div className="action-btn-container">
              {errors.body && <p>{errors.body}</p>}
              <button type="submit" className="add-scream">
                {isLoading ? <Spinner /> : "Add"}
              </button>
              {!isLoading && (
                <button onClick={handleCancel} className="cancel">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  isLoading: state.ui.isLoading,
  errors: state.errors.error
});

const mapDispatchToProps = { postScream, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(PostScream);
