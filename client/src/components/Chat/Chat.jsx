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
  const [priorMessages, setPriorMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);
  const [chatTarget, setChatTarget] = useState(null);
  // console.log(socket)
  useEffect(() => {
    // socket.on('')
    if (socket) {
      socket.emit("newLogin", { profile_name: "user20", id: 20 });

      socket.on("userCreated", (obj) => {
        setUsersInfo(obj);
        console.log("💎 USER/MATCHES: ", obj);
        console.log("🔧 SOCKET ID: ", socket.id);
      });

      socket.on("priorMessages", (conversation) => {
        console.log("CONVERSATION: ", conversation);
        setPriorMessages(conversation.messages);
      });
      //NEED TO FIGURE OUT HOW TO DISPLAY NEW MESSAGES ON EMIT/LISTEN
      socket.on("incomingMessage", (message) => {
        console.log("INCOMING MESSAGE: ", message);
        newMessages.push(message);
      });
    }
  }, [socket]);
  useEffect(() => {});

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {
      text: chatMessage,
      sender: usersInfo.user,
      receiver: chatTarget,
    });
    setChatMessage("");
  };
  const handleChange = (e) => setChatMessage(e.target.value);
  // const handleNewChat = () => {
  //   // setChatTarget(u.id)
  //   socket.emit('message', {chatMessage, usersInfo.user, u.id})
  // }
  return (
    <div>
      Hello From Chat
      <div>
        Click a match below to begin a conversation, then type a message and
        send it!
      </div>
      {usersInfo.matches //checks usersInfo has info about others, will be false unless user is logged in
        ? usersInfo.matches.map((u) => {
            return (
              <div
                key={u.id}
                onClick={() => {
                  console.log("CHAT TARGET: ", u.user);
                  setChatTarget(u.user);

                  socket.emit("chat", {
                    sender: usersInfo.user,
                    receiver: u.user,
                  });
                  // setNewMessages([])

                }}
              >
                {u.name} {u.id}
              </div>
            );
          })
        : null}
      <form action="submit" onSubmit={handleSubmit}>
        <input type="text" value={chatMessage} onChange={handleChange} />
        <button>click me</button>
      </form>
      <ul>
        {priorMessages.length
          ? priorMessages.map((message) => (
              <li key={message.id}>
                message: {message.text} date:{" "}
                {new Date(message.createdAt).toLocaleTimeString()} from:{" "}
                {message.user.name}{" "}
              </li>
            ))
          : null}
          {newMessages.length>0
          ? newMessages.map((message) => (
            <li key={message.id}>
              message: {message.text} date:{" "}
              {new Date(message.createdAt).toLocaleTimeString()} from:{" "}
              {message.user.name}{" "}
            </li>
          ))
        : null
          }
      </ul>
    </div>
  );
};

export default Chat;
