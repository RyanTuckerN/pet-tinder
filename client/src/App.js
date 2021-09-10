import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/MainLayout";
import jwt_decode from 'jwt-decode'

function App() {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [usersInfo, setUsersInfo] = useState({});
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [token, setToken] = useState("");

  
  
  const updateToken = (t) => {
    localStorage.setItem("token", t);
    setToken(t);
  };
  
  const clearToken = () => {
    localStorage.clear()
    setToken("")
    setUsersInfo({})
    setOnlineUsers(null)
    setSocket(null)
    setUserId(null)
  }
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  useEffect(()=>{
    if(token) {
      setUserId(jwt_decode(token).id)
    }
  }, [token])
  
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3333`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  
  useEffect(()=>{
    if(token && userId && socket){
      socket.emit("newLogin", userId)
      socket.on("userCreated", (obj) => {
        setUsersInfo(obj);
        console.log("💎 USER/MATCHES: ", obj);
        console.log("🔧 SOCKET ID: ", socket.id);
      })
      
      socket.on('newUser', socketIds=>{
        setOnlineUsers(socketIds)
        console.log('ONLINE USERS SOCKETS: ', socketIds.mobileSockets)
      })
    }
  },[socket, token, userId])
  
  const mainLayoutProps = {
    socket,
    usersInfo,
    onlineUsers,
    setUsersInfo,
    setOnlineUsers,
    clearToken
  };

  return (
    <div className="App">
      { token ? (
        <MainLayout mainLayoutProps={mainLayoutProps} />
        ) : (
        <Auth setUsersInfo={setUsersInfo} updateToken={updateToken} />
        )}
      {/* {socket?<Chat socket={socket} setUsersInfo={setUsersInfo} usersInfo={usersInfo}/>:<div>Not Connected</div>} */}
    </div>
  );
}

export default App;
