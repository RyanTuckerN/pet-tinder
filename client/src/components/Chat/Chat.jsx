import React, { useState, useEffect } from "react";
/*
I NEED TO DO A FEW THINGS, BUT I KNOW THE SOCKET IS OPEN AND WORKING!!! WOOHOO!!

1. ~~ ORGANIZE MY DATA FLOW ~~
2. ~~ SET UP BASIC CLIENT FRONT END FOR ACTUAL USE TESTING ~~
3. ~~ ENSURE I AM SENDING LOGIC EXPECTED ON THE BACKEND ~~
4. ~~ CELEBRATE ~~ 
5. SET UP CONTEXT PERHAPS? INSTEAD OF PROP DRILLING? MAYBE FOR LOGGED IN USER
6. ~~ STILL NEED TO SORT OUT LOGIC FOR MATCHES ~~
*/
const Chat = (props) => {
  const { socket, setUsersInfo, usersInfo } = props;
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatTarget, setChatTarget] = useState(null);

  // console.log(socket)
  useEffect(() => {
    // socket.on('')
    if (socket) {
      //send to server 'newLogin' event
      socket.emit("newLogin", { 
        profile_name: "user20", id: 20 
      });
      //listening for 'userCreated' from server
      socket.on("userCreated", (obj) => {
        setUsersInfo(obj);
        console.log("💎 USER/MATCHES: ", obj);
        console.log("🔧 SOCKET ID: ", socket.id);
      });
      //listening for 'priorMessages' from server
      socket.on("priorMessages", (conversation) => {
        console.log("CONVERSATION: ", conversation);
        setMessages(conversation.messages);
      });
      //listening for 'incomingMessage' from server
      socket.on("incomingMessage", ({ message, conversation }) => {
        console.log("INCOMING MESSAGE: ", message);
        console.log("CONVERSATION: ", conversation);
        setMessages(conversation.messages);
      });
      // return socket. 
    }
    
  }, [socket]);
  //new message submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chatTarget) {
      console.log("no chat target");
      return;
    } else {
      socket.emit("message", {
        text: chatMessage,
        sender: usersInfo.user,
        receiver: chatTarget,
      });
    }
    setChatMessage("");
  };
  //message input 
  const handleChange = (e) => setChatMessage(e.target.value);
  //when user exits chat component
  const handleExitChat = () => {
    setChatTarget(null);
    setMessages([]);
    // setMessages([])
  };
  return (
    <div>
      Hello From Chat
      <div>
        Click a match below to begin a conversation, then type a message and
        send it!
      </div>
      {usersInfo.matches //checks usersInfo has info about others, will be false unless user is logged in
        ? 
        usersInfo.matches.map((match) => {
            return (
              <div
                key={match.id}
                onClick={() => {
                  console.log("CHAT TARGET: ", match.user);
                  setChatTarget(match.user);
                  socket.emit("chat", {
                    sender: usersInfo.user,
                    receiver: match.user,
                  });
                }}
              >
                {match.name} {match.id}
              </div>
            );
          })
        : null}
      <form action="submit" onSubmit={handleSubmit}>
        <input type="text" value={chatMessage} onChange={handleChange} />
        <button>click me</button>
      </form>
      <ul>
        {messages.length
          ? messages.map((message) => (
              <li key={message.id}>
                message: {message.text} date:{" "}
                {new Date(message.createdAt).toLocaleTimeString()} from:{" "}
                {message.user.name}{" "}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Chat;
