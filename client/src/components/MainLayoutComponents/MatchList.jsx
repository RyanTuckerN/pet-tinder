import OnlineStatus from "./OnlineStatus";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  ListItemAvatar,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { Chat, ChevronLeft } from "@material-ui/icons";

const MatchList = (props) => {
  const {
    usersInfo,
    setChatTarget,
    socket,
    handleDrawerToggle,
    onlineUsers,
    open,
  } = props.matchListProps;

  return (
    <List>
      <ListItemIcon>
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeft /> : <Tooltip title='Select a match to begin chatting'>
            <Chat />
          </Tooltip>}
        </IconButton>
      </ListItemIcon>
      {usersInfo.matches
        ? usersInfo.matches.map((match) => (
           
            <Tooltip key={match.id} title={`Bark at ${match.name}!`}>
              <ListItem
                button
                
                onClick={() => {
                  console.log("CHAT TARGET: ", match);
                  setChatTarget(match);
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
            </Tooltip>
          ))
        : null}
    </List>
  );
};

export default MatchList;
