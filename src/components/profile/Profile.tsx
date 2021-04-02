import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// redux
import { connect } from "react-redux";
import { RootStateType } from "../../redux/store";
import { uploadImage } from "../../redux/actions/userAction";

// icons
import AtIcon from "../../images/AtIcon";
import PencilIcon from "../../images/PencilIcon";
import EditDetails from "../editDetails/EditDetails";
import WebSiteIcon from "../../images/WebSiteIcon";
import LocationIcon from "../../images/LocationIcon";
import CalendarIcon from "../../images/CalendarIcon";
import BiographyIcon from "../../images/BiographyIcon";

// components
import Spinner from "../spinner/Spinner";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Profile: React.FC<Props> = (props) => {
  const { user, isLoadingUser, uploadImage } = props;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);

    uploadImage(formData);
  };

  const handleEditPicture = () => {
    // Get input and click it. Witch calls "handleImageChange" Just to make styling easier
    const fileInput = document.getElementById("imageInput");
    if (!fileInput) {
      return;
    }
    fileInput.click();
  };

  return (
    <div className="profile">
      {isLoadingUser ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <div className="container">
          <div className="container-btn">
            <button onClick={handleEditPicture}>
              <PencilIcon className="icon" />
            </button>
            <EditDetails />
          </div>

          <div className="img-container">
            <img src={require("../../images/Prof.jpeg")} />
            <input
              type="file"
              id="imageInput"
              onChange={handleImageChange}
              hidden
            />
          </div>
          <Link to={`/users/${user.handle}`}>
            <h1>
              <AtIcon />
              {user.handle}
            </h1>
          </Link>
          <hr />
          {user.bio && (
            <p>
              <BiographyIcon className="icon bio" /> {user.bio}
            </p>
          )}
          {user.location && (
            <>
              <p>
                <LocationIcon className="icon" />
                {user.location}
              </p>
            </>
          )}
          {user.website && (
            <a href={user.website} target="_blank" rel="noopener noreferrer">
              <p>
                <WebSiteIcon className="icon" />
                {user.website}
              </p>
            </a>
          )}
          <p>
            <CalendarIcon className="icon" />
            Joined: {dayjs(user.createdAt).format("MMM YYYY")}
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  user: state.user.userData.credentials,
  isLoadingUser: state.user.isLoadingUser
});

const mapDispatchToProps = { uploadImage };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
