import React, { useState, useEffect } from 'react'

const OnlineStatus = (props) => {
  const { match, onlineUsers, socket } = props;
  const [socketsListExists, setSocketsListExists] = useState(false);
  useEffect(() => {
    setSocketsListExists(onlineUsers ? true : false);
  }, [onlineUsers]);

  // useEffect(()=>{
  //   const onlineStatusCheck = setInterval(()=>{
  //     socket.emit('socketUpdate')
  //   },5000)
  //   return ()=> clearInterval(onlineStatusCheck)
  // })

  const statusStyle = {
    minHeight: 10,
    minWidth: 10,
    border: "solid black 1px",
    borderRadius: "50%",
    position: "relative",
    right: 24,
    top: 15,
    backgroundColor: socketsListExists
      ? Object.keys(onlineUsers.mobileSockets).includes(match.id.toString())
        ? "#2ec72c"
        : "white"
      : null,
  };
  return <div style={socketsListExists ? statusStyle : {}}></div>;
};

export default OnlineStatus