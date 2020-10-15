import React, { useState } from "react";

// redux
import { connect } from "react-redux";
import { RootStateType } from "../../redux/store";
import { postScream } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/errorActions";

// icons
import PlusIcon from "../../images/PlusIcon";
import Spinner from "../spinner/Spinner";
import CancelIcon from "../../images/CancelIcon";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const PostScream: React.FC<Props> = (props) => {
  const { isLoading, errors, postScream, clearErrors } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [screamBody, setScreamBody] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setScreamBody(value);
  };

  const handleCancel = () => {
    clearErrors();
    setScreamBody("");

    setToggle(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postScream(screamBody);
    setScreamBody("");

    setToggle(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  // handle click outside form to close modal
  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;

    if (element.classList.contains("add-scream-modal")) {
      setScreamBody("");
      setToggle(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setToggle(true);
  };

  return (
    <div className="add-scream">
      <button onClick={handleOpen}>
        <PlusIcon />
      </button>
      {isOpen && (
        <div className="add-scream-modal" onClick={handleOutClick}>
          <form
            onSubmit={handleSubmit}
            className={toggle ? "toggleIn" : "toggleOut"}
          >
            {!isLoading && (
              <div className="cancel">
                <span onClick={handleCancel}>
                  <CancelIcon />
                </span>
              </div>
            )}
            <h2>Post New Scream!</h2>
            <textarea
              rows={6}
              value={screamBody}
              name="new scream"
              onChange={handleChange}
            />

            {errors.body && <p>{errors.body}</p>}
            <button type="submit" className="add-scream">
              {isLoading ? <Spinner /> : "Add"}
            </button>
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
