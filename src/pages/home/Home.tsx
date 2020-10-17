import React, { useEffect } from "react";

// redux
import { connect } from "react-redux";
import { getScreams } from "../../redux/actions/dataActions";
import { RootStateType } from "../../redux/store";

// components
import Scream from "../../components/scream/Scream";
import Spinner from "../../components/spinner/Spinner";
import Profile from "../../components/profile/Profile";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Home: React.FC<Props> = (props) => {
  const { isLoadingData, screams, getScreams } = props;
  // const [screams, setScreams] = useState<ScreamType[]>([]);

  useEffect(() => {
    let mounted = true;

    // don't call this function if component is unmounted
    if (mounted) {
      getScreams();
    }

    return () => {
      mounted = false;
    };
  }, [getScreams]);

  const recentScreamMarkup = isLoadingData ? (
    <div className="spinner">
      <Spinner />
    </div>
  ) : (
    screams.map((scream) => {
      return <Scream key={scream.screamId} scream={scream} />;
    })
  );

  return (
    <div className="home">
      <div>{recentScreamMarkup}</div>
      <Profile />
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  isLoadingData: state.data.isLoadingData,
  screams: state.data.screams
});

const mapDispatchToProps = { getScreams };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
