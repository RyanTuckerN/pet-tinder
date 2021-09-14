// import DogDisplay from "../Profile/DogDisplay";
import { Grid } from "@material-ui/core";
import MatchDisplay from "./MatchDisplay";

const Matches = (props) => {
  const { usersInfo, socket } = props;
  console.log(usersInfo);

  return (
    <Grid container justifyContent='center'>
      {usersInfo?.matches?.map((match) => (
        <MatchDisplay dog={match} socket={socket} usersInfo={usersInfo} key={match.id} />
      ))}
    </Grid>
  );
};

export default Matches;
