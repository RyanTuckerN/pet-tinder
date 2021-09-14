import { Typography, Tooltip } from "@material-ui/core";

const ChatMessage = (props) => {
  const { message, usersInfo } = props;
  const time = new Date(message.createdAt).toLocaleTimeString();
  const month = new Date(message.createdAt).getMonth();
  const date = new Date(message.createdAt).getDate();
  const year = new Date(message.createdAt).getFullYear();
  const userStyle = {
    textAlign: "right",
    backgroundColor: "orange",
    padding: "8px",
    borderRadius: 12,
  };
  const targetStyle = {
    textAlign: "left",
    backgroundColor: "red",
    padding: "8px",
    borderRadius: 12,
  };

  return (
    <Tooltip title={`Sent on: ${month}/${date}/${year}, ${time}`} placement='top'>
      <div className='chat-message' style={{ color: "white", padding: "2px", display: "inline-block" }}>
        <div
          key={message.id}
          style={
            message.user.name === usersInfo.user.profile_name
              ? userStyle
              : targetStyle
          }
        >
          {/* <Typography variant="caption">{`${month}/${date}/${year}`}</Typography> */}
          {/* <Typography variant="caption">{time}</Typography> */}
          <Typography variant="caption" style={{ paddingLeft: 8, paddingRight: 8}}>{message.text}</Typography>
        </div>
      </div>
    </Tooltip>
  );
};

export default ChatMessage