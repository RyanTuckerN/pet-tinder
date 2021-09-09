import { Avatar, Tooltip, Typography } from "@material-ui/core";
import './Chat.css'
import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import StickyFooter from "./StickyFooter";
/*
I NEED TO DO A FEW THINGS, BUT I KNOW THE SOCKET IS OPEN AND WORKING!!! WOOHOO!!

1. ~~ ORGANIZE MY DATA FLOW ~~
2. ~~ SET UP BASIC CLIENT FRONT END FOR ACTUAL USE TESTING ~~
3. ~~ ENSURE I AM SENDING LOGIC EXPECTED ON THE BACKEND ~~
4. ~~ CELEBRATE ~~ 
5. SET UP CONTEXT PERHAPS? INSTEAD OF PROP DRILLING? MAYBE FOR LOGGED IN USER
6. ~~ STILL NEED TO SORT OUT LOGIC FOR MATCHES ~~
*/
const ChatIndex = (props) => {
  const { socket, setUsersInfo, usersInfo, chatTarget, setChatTarget, setOnlineUsers, open } =
    props.chatProps;
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // console.log(socket)
  useEffect(() => {
    if (socket) {

      // MOVE THESE TO LOGIN/SIGNUP!
      socket.on("userCreated", (obj) => {
        setUsersInfo(obj);
        console.log("💎 USER/MATCHES: ", obj);
        console.log("🔧 SOCKET ID: ", socket.id);
      });

      socket.on('newUser', socketIds=>{
        setOnlineUsers(socketIds)
        console.log('ONLINE USERS SOCKETS: ', socketIds.mobileSockets)
      })

      socket.emit("newLogin", {
        profile_name: "user18",
        id: 18, //this needs to come from user info,
      });

            socket.on("priorMessages", (conversation) => {
        console.log("CONVERSATION: ", conversation);
        setMessages(conversation.messages);
      });
      socket.on("incomingMessage", ({ message, conversation }) => {
        console.log("INCOMING MESSAGE: ", message);
        console.log("CONVERSATION: ", conversation);
        setMessages(conversation.messages);
      });
    }
    return handleExitChat
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chatTarget) {
      console.log("no chat target");
      return;
    } else {
      if(chatMessage.length>=255){
        console.log('message too long!')
      }else{
      socket.emit("message", {
        text: chatMessage,
        sender: usersInfo.user,
        receiver: chatTarget.user,
      });}
    }
    setChatMessage("");
  };
  const handleChange = (e) => setChatMessage(e.target.value);
  const handleExitChat = () => {
    setChatTarget(null);
    setMessages([]);
  };

  const handleAlign = (m, i) =>
    m.user._id == i.user.id ? "flex-end" : "flex-start";

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }
    useEffect(()=>{
      scrollToBottom()
    },[messages])
    console.log(chatTarget)
  return (
    <>
      <section id='chat'>
        {chatTarget? 
        <div className='chat-target-banner' 
        // style={{position: "fixed", width: '100%', zIndex:999, backgroundColor:'red'}}
        >
              <Avatar src={chatTarget.photo_url} id='chat-target-avatar' />
              <div>
                <Typography variant='h5' >{chatTarget.name}</Typography>
                <Typography variant='caption'>{`${chatTarget.breed}, ${chatTarget.age} years old.`}</Typography>
              </div>
        </div> : <div>
          Click a match from the left to start chatting!
        </div>}
        <div className='chat-messages' style={{ width: "100%", marginBottom:100, }}>
          {messages
            ? messages.map((message) => (
                <div
                  
                  key={message.id}
                  style={{
                    display: "flex",
                    justifyContent: handleAlign(message, usersInfo),
                    overflowAnchor: 'none'
                  }}
                >
                  <ChatMessage message={message} usersInfo={usersInfo} />
                  <div ref={messagesEndRef}/>
                  <br />
                </div>
              ))
            : null}
        </div>
      </section>

      <StickyFooter
        handleChange={handleChange}
        chatMessage={chatMessage}
        handleSubmit={handleSubmit}
        open={open}
      />
    </>
  );
};


export default ChatIndex;