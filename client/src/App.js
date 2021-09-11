import React, { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/MainLayout";
import CreateProfile from "./components/Profile/CreateProfile";
import jwt_decode from "jwt-decode";

function App() {
  //STATE VARIABLE AND SETTERS
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [usersInfo, setUsersInfo] = useState({});
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [token, setToken] = useState("");

  //LOGGING IN AND SIGNING UP
  const updateToken = (t) => {
    localStorage.setItem("token", t);
    setToken(t);
  };
  //LOGGING OUT OF SOCKET
  // const disconnectSocket = () => {
  //   socket.broadcast.emit('disconnect', )
  // }

  //LOGGING OUT
  const clearToken = () => {
    setToken("");
    setUsersInfo({});
    setOnlineUsers(null);
    setSocket(null);
    setUserId(null);
    localStorage.clear();
  };

  //LOOKING FOR TOKEN IN LOCAL STORAGE WHEN APP LOADS
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  //DECODING THE TOKEN IF IT EXISTS
  useEffect(() => {
    if (token && localStorage.getItem("token") !== undefined) {
      setUserId(jwt_decode(token).id);
    }
  }, [token]);

  //OPENING A NEW SOCKET FOR CHAT AND REAL-TIME FEATURES
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3333`);
    setSocket(newSocket);
    return () => {
    newSocket.close();}
  }, [setSocket, userId]);

  //EMITTING SOCKET EVENTS
  useEffect(() => {
    if (token && userId && socket) {
      socket.emit("newLogin", userId);
      socket.on("userCreated", (obj) => {
        setUsersInfo({...usersInfo, matches: obj.matches, user: obj.user });
        console.log("💎 USER/MATCHES: ", obj);
        console.log("🔧 SOCKET ID: ", socket.id);
      });
      socket.on("newUser", (socketIds) => {
        setOnlineUsers(socketIds);
        console.log("ONLINE USERS SOCKETS: ", socketIds.mobileSockets);
      });
    }
    // return ()=> socket ? socket.emit('disconnect') : null
  }, [socket, token, userId]);

  //PROPS OBJECT
  const mainLayoutProps = {
    socket,
    token,
    usersInfo,
    onlineUsers,
    setUsersInfo,
    setOnlineUsers,
    clearToken,
  };


  return (
    <div className="App">
      {token ? (
        <MainLayout mainLayoutProps={mainLayoutProps} />
      ) : (
        <Auth setUsersInfo={setUsersInfo} updateToken={updateToken} usersInfo={usersInfo} socket={socket}/>
      )}
    </div>
  );
}

export default App;
