import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat/Chat";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/MainLayout";


function App() {
  const [socket, setSocket] = useState(null);
  const [usersInfo, setUsersInfo] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3333`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);


  return( 
  <div className="App">
      {/* Hello world */}
      <Auth setUsersInfo={setUsersInfo} setToken={setToken}/>
      {/* {socket?<Chat socket={socket} setUsersInfo={setUsersInfo} usersInfo={usersInfo}/>:<div>Not Connected</div>} */}
      {/* <MainLayout /> */}
  </div>)
}

export default App;
