import React, { useEffect, useState } from "react";

// constants
import { BASE_URL } from "../../constant";

// types
import { ScreamType } from "../../types/types";

// components
import Scream from "../../components/scream/Scream";
import Spinner from "../../components/spinner/Spinner";
import Profile from "../../components/profile/Profile";

const Home: React.FC = () => {
  const [screams, setScreams] = useState<ScreamType[]>([]);

  useEffect(() => {
    fetch(BASE_URL + "/screams")
      .then((response) => response.json())
      .then((data) => setScreams(data))
      .catch((err) => console.log("Error fetching screams: ", err));
  }, []);

  const recentScreamMarkup = screams.length ? (
    screams.map((scream) => {
      return <Scream key={scream.screamId} scream={scream} />;
    })
  ) : (
    <div className="spinner">
      <Spinner />
    </div>
  );

  return (
    <div className="home">
      <div>{recentScreamMarkup}</div>
      <Profile />
    </div>
  );
};

export default Home;
