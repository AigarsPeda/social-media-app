import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

// types
import { RouteComponentProps } from "react-router-dom";
import { UserCredentialsType } from "../../types/types";

// redux
import { connect } from "react-redux";
import { getUserProfile } from "../../redux/actions/dataActions";
import { RootStateType } from "../../redux/store";
import { BASE_URL } from "../../constant";

// icons
import BiographyIcon from "../../images/BiographyIcon";
import LocationIcon from "../../images/LocationIcon";
import WebSiteIcon from "../../images/WebSiteIcon";
import CalendarIcon from "../../images/CalendarIcon";
import LogoIcon from "../../images/LogoIcon";

// components
import Spinner from "../../components/spinner/Spinner";
import Scream from "../../components/scream/Scream";

type MyParams = {
  handle: string;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps<MyParams>;

const User: React.FC<Props> = (props) => {
  const { match, screams, isLoadingData, getUserProfile } = props;
  const [profile, setProfile] = useState<UserCredentialsType>();

  useEffect(() => {
    const handle = match.params.handle;
    getUserProfile(handle);
    axios
      .get(`${BASE_URL}/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [match.params.handle, getUserProfile]);

  return (
    <div className="user">
      {console.log(screams)}
      {isLoadingData ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="grid-container">
            <div className="image-container">
              <img src={profile?.imageUrl} alt="users profile picture" />
            </div>
            <div className="information-container">
              <div className="fact">
                <BiographyIcon className="icon" />
                <span>{profile?.bio}</span>
              </div>
              <div className="fact">
                <LocationIcon className="icon" />
                <span>{profile?.location}</span>
              </div>
              <div className="fact">
                <WebSiteIcon className="icon" />
                <span>{profile?.website}</span>
              </div>
              <div className="fact">
                <CalendarIcon className="icon" />
                <span>{dayjs(profile?.createdAt).format("MMM YYYY")}</span>
              </div>
              <div className="fact">
                <LogoIcon className="icon" />
                <span>{screams.length}</span>
              </div>
            </div>
          </div>

          <div className="screams">
            {screams.length ? (
              screams.map((scream) => {
                return <Scream scream={scream} key={scream.screamId} />;
              })
            ) : (
              <div style={{ textAlign: "center", paddingTop: "1.5rem" }}>
                <h1>{profile?.handle} doesn't have any screams yet! 😢</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  screams: state.data.screams,
  isLoadingData: state.data.isLoadingData
});

const mapDispatchToProps = { getUserProfile };

export default connect(mapStateToProps, mapDispatchToProps)(User);
