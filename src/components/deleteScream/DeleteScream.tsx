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
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id: string) => {
    setIsOpen(false);
    deleteScream(id);
  };

  return (
    <div className="delete-scream">
      <button onClick={() => setIsOpen((state) => !state)}>
        <TrashCanIcon />
      </button>
      {isOpen && (
        <div className="delete-modal">
          <div className="delete-modal-actions">
            <h2>Are you sure you want to delete this scream?</h2>
            <button className="cancel" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className="delete" onClick={() => handleDelete(screamId)}>
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
