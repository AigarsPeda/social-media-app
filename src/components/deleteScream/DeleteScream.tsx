import React, { useState } from "react";

//redux
import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";

// icons
import TrashCanIcon from "../../images/TrashCanIcon";

type MyProps = {
  screamId: string;
};
type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  MyProps;

const DeleteScream: React.FC<Props> = (props) => {
  const { screamId, deleteScream } = props;
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id: string) => {
    setIsOpen(false);
    deleteScream(id);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setToggle(true);
  };

  const handleCancel = () => {
    setToggle(false);
    // setIsOpen(false);

    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleDeleteScream = (id: string) => {
    setToggle(false);

    setTimeout(() => {
      handleDelete(id);
      setIsOpen(false);
    }, 500);
  };

  return (
    <div className="delete-scream">
      <button onClick={handleOpen}>
        <TrashCanIcon />
      </button>
      {isOpen && (
        <div className="delete-modal">
          <div
            className={
              toggle
                ? "delete-modal-actions toggleIn"
                : "delete-modal-actions toggleOut"
            }
          >
            <h2>Are you sure you want to delete this scream?</h2>
            <button className="cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="delete"
              onClick={() => handleDeleteScream(screamId)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = { deleteScream };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteScream);
