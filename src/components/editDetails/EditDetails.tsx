import React, { useEffect, useState } from "react";

// types
import { UserDetailsType } from "../../types/types";

// redux
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userAction";
import { RootStateType } from "../../redux/store";

type MyProps = {
  setIsEditDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  MyProps;

const EditDetails: React.FC<Props> = (props) => {
  const { editUserDetails, setIsEditDetailsOpen, user } = props;
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
    setIsEditDetailsOpen(false);
  };

  return (
    <div className="edit-details">
      <form onSubmit={handleSubmit}>
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
          <button className="btn" onClick={() => setIsEditDetailsOpen(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  user: state.user.userData.credentials,
  isLoadingUser: state.user.isLoadingUser
});

const mapDispatchToProps = { editUserDetails };

export default connect(mapStateToProps, mapDispatchToProps)(EditDetails);
