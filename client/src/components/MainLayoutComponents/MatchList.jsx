import OnlineStatus from "./OnlineStatus";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  ListItemAvatar,
  IconButton,
} from "@material-ui/core";
import { Chat } from "@material-ui/icons";

const MatchList = (props) => {
  const { usersInfo, setChatTarget, socket, handleDrawerToggle, onlineUsers } =
    props.matchListProps;

  return (
    <List>
      <ListItemIcon>
        <IconButton onClick={handleDrawerToggle}>
          <Chat />
        </IconButton>
      </ListItemIcon>
      {usersInfo.matches
        ? usersInfo.matches.map((match) => (
            <ListItem
              button
              key={match.id}
              onClick={() => {
                console.log("CHAT TARGET: ", match.user);
                setChatTarget(match.user);
                socket.emit("chat", {
                  sender: usersInfo.user,
                  receiver: match.user,
                });
              }}
            >
              <ListItemAvatar>
                <Avatar src={match.photo_url} />
              </ListItemAvatar>
              <OnlineStatus onlineUsers={onlineUsers} match={match} />
              <ListItemText primary={match.name} />
            </ListItem>
          ))
        : null}
    </List>
  );
};



export default MatchList;
