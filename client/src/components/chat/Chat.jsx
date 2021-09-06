import React, { useState, useEffect } from "react";
/*
I NEED TO DO A FEW THINGS, BUT I KNOW THE SOCKET IS OPEN AND WORKING!!! WOOHOO!!

1. ORGANIZE MY DATA FLOW 
2. SET UP BASIC CLIENT FRONT END FOR ACTUAL USE TESTING 
3. ENSURE I AM SENDING LOGIC EXPECTED ON THE BACKEND 
4. CELEBRATE 
5. SET UP CONTEXT PERHAPS? INSTEAD OF PROP DRILLING? 
6. ~~ STILL NEED TO SORT OUT LOGIC FOR MATCHES ~~
*/
const Chat = (props) => {
  const { socket, setUsersInfo, usersInfo } = props;
  const [chatMessage, setChatMessage] = useState("");
  const [chatTarget, setChatTarget] = useState(null);
  // console.log(socket)
  // useEffect(() => {
  //   // socket.on('')
  //   if (socket) {
  //     socket.emit("newLogin", 
  //     { profile_name: 'user2' }
  //     );
  //     socket.on("userCreated", (obj) => {
  //       setUsersInfo(obj);
  //       console.log("💎 USER/USERS: ",obj);  
  //       console.log("🔧 SOCKET ID: ",socket.id);  
  //     });
  //   }
  // }, [socket]);

  const handleSubmit = e => {
      e.preventDefault();
      socket.emit("newMessage", { chatMessage });
      setChatMessage("");
  }
  const handleChange = e => setChatMessage(e.target.value)
  // const handleNewChat = () => {
  //   // setChatTarget(u.id)
  //   socket.emit('message', {chatMessage, usersInfo.user, u.id})
  // }
  return (
    <div>
      Hello From Chat
      {usersInfo?usersInfo.users.map(u=>{
        return(<div key={u.id} onClick={() => {
          socket.emit('message', {text: chatMessage, sender:usersInfo.user, receiver: u}) 
        }}>{u.username} {u.id}</div>)
      }):null}
      <form
        action="submit"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={chatMessage}
          onChange={handleChange}
        />
        <button>click me</button>
      </form>
    </div>
  );
};

export default Chat;
