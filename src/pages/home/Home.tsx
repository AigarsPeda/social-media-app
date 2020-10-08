import React, { useEffect, useState } from "react";
import axios from "axios";

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
    let mounted = true;

    const loadData = async () => {
      const response = await axios
        .get(`${BASE_URL}/screams`)
        // destruction data property from res
        .then((res) => res.data)
        .catch((err) => console.error(err));

      // check if components is still mounted
      if (mounted) {
        setScreams(response);
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
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
