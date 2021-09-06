import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/chat/Chat";


function App() {
  const [socket, setSocket] = useState(null);
  const [usersInfo, setUsersInfo] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3333`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);


  return( 
  <div className="App">
    Hello world
    {socket?<Chat socket={socket} setUsersInfo={setUsersInfo} usersInfo={usersInfo}/>:<div>Not Connected</div>}
  </div>)
}

export default App;
