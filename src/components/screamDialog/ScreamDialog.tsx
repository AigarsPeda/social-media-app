import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// redux
import { connect } from "react-redux";
import { getScream } from "../../redux/actions/dataActions";
import { RootStateType } from "../../redux/store";
import Spinner from "../spinner/Spinner";
import DownArrowIcon from "../../images/DownArrowIcon";

type MyProps = {
  screamId: string;
  userHandle: string;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  MyProps;

const ScreamDialog: React.FC<Props> = (props) => {
  const { isLoading, screamId, scream, getScream } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    getScream(screamId);
    setIsOpen(true);

    console.log(scream);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="scream-dialog">
      <button onClick={handleOpen} className="open-btn">
        <DownArrowIcon />
      </button>
      {isOpen && (
        <div className="scream-dialog-modal">
          <div className="dialog-content">
            {isLoading ? (
              <div className="spinner">
                <Spinner />
              </div>
            ) : (
              <div>
                <Link to={`/users/${scream.userHandle}`}>
                  {scream.userHandle}
                </Link>
                <button onClick={handleClose}>Close</button>
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
  scream: state.data.scream
});

const mapDispatchToProps = { getScream };

export default connect(mapStateToProps, mapDispatchToProps)(ScreamDialog);
