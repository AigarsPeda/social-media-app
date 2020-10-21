import React, { useEffect, useState } from "react";

// types
import { UserDetailsType } from "../../types/types";

// redux
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userAction";
import { RootStateType } from "../../redux/store";

// icons
import EditIcon from "../../images/EditIcon";
import CancelIcon from "../../images/CancelIcon";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const EditDetails: React.FC<Props> = (props) => {
  const { editUserDetails, user } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetailsType>({
    bio: "",
    website: "",
    location: ""
  });

  useEffect(() => {
    const { bio, website, location } = user;
    setUserDetails({
      bio: bio ? bio : "",
      website: website ? website : "",
      location: location ? location : ""
    });
  }, [user]);

  const handleCancel = () => {
    setToggle(false);

    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserDetails((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editUserDetails(userDetails);

    setToggle(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;

    if (element.classList.contains("edit-details-modal")) {
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
    <div className="edit-details">
      <button onClick={handleOpen}>
        <EditIcon className="icon" />
      </button>
      {isOpen && (
        <div className="edit-details-modal" onClick={handleOutClick}>
          <form
            onSubmit={handleSubmit}
            className={toggle ? "toggleIn" : "toggleOut"}
          >
            <div className="cancel">
              <span onClick={handleCancel}>
                <CancelIcon />
              </span>
            </div>
            <label>Website</label>
            <input
              value={userDetails.website}
              name="website"
              onChange={handleChange}
            />
            <label>Locations</label>
            <input
              value={userDetails.location}
              name="location"
              onChange={handleChange}
            />
            <label>Bio</label>
            <textarea
              rows={3}
              value={userDetails.bio}
              name="bio"
              onChange={handleChange}
            />
            <div className="btn-container">
              <button type="submit" className="btn primary">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  user: state.user.userData.credentials
});

const mapDispatchToProps = { editUserDetails };

export default connect(mapStateToProps, mapDispatchToProps)(EditDetails);
