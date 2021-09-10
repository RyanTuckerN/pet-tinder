import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/MainLayout";


function App() {
  const [socket, setSocket] = useState(null);
  const [usersInfo, setUsersInfo] = useState({user: {id:20, profile_name: 'user20'}});
  const [onlineUsers, setOnlineUsers] = useState({});
  const mainLayoutProps = {socket, usersInfo, onlineUsers, setUsersInfo, setOnlineUsers}
  const [token, setToken] = useState("");


  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3333`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return( 
  <div className="App">
      {/* Hello world */}

      
      {/* <MainLayout mainLayoutProps={mainLayoutProps}/> */}
      <Auth setUsersInfo={setUsersInfo} setToken={setToken}/>
      {/* {socket?<Chat socket={socket} setUsersInfo={setUsersInfo} usersInfo={usersInfo}/>:<div>Not Connected</div>} */}
      

  </div>)
}

export default App;
