import React, { useState, useEffect } from 'react'

const OnlineStatus = (props) => {
  const { match, onlineUsers } = props;
  const { mobileSockets } = props.onlineUsers;
  const [socketsListExists, setSocketsListExists] = useState(false);
  useEffect(() => {
    setSocketsListExists(mobileSockets ? true : false);
  }, [onlineUsers]);

  // if (socketsListExists) {
  //   console.log("MATCHLIST ONLINE STATUS TEST: ", Object.keys(mobileSockets));
  // }

  const statusStyle = {
    minHeight: 10,
    minWidth: 10,
    border: "solid black 1px",
    borderRadius: "50%",
    position: "relative",
    right: 24,
    top: 15,
    backgroundColor: socketsListExists
      ? Object.keys(mobileSockets).includes(match.id.toString())
        ? "#2ec72c"
        : "white"
      : null,
  };
  return <div style={socketsListExists ? statusStyle : {}}></div>;
};

export default OnlineStatus