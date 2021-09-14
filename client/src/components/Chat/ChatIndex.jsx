import { Avatar, Typography } from "@material-ui/core";
import "./Chat.css";
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
  const { socket, usersInfo, chatTarget, setChatTarget, open } =
    props.chatProps;
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {

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
    return handleExitChat;
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chatTarget) {
      console.log("no chat target");
      return;
    } else {
      if (chatMessage.length >= 255) {
        console.log("message too long!");
        alert('Your message is too long! Keep it under 255 characters.')
      } else {
        socket.emit("message", {
          text: chatMessage,
          sender: usersInfo.user,
          receiver: chatTarget.user,
        });
      }
    }
    setChatMessage("");
  };
  const handleChange = (e) => {
    setChatMessage(e.target.value)
  };
  const handleExitChat = () => {
    setChatTarget(null);
    setMessages([]);
  };

  const handleAlign = (m, i) =>
    m.user._id == i.user.id ? "flex-end" : "flex-start";

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  console.log(chatTarget);
  return (
    <>
      <section id="chat">
        {chatTarget ? (
          <div className="chat-target-banner">
            <Avatar src={chatTarget.photo_url} id="chat-target-avatar" />
            <div>
              <Typography className='chat-target-text' variant="h6">{chatTarget.name}</Typography>
              <Typography className='chat-target-text' variant="caption">{`${chatTarget.breed}, ${chatTarget.age} years old.`}</Typography>
            </div>
          </div>
        ) : (
          <div>Click a match from the left to start chatting!</div>
        )}
        <div
          className="chat-messages"
          style={{ width: "100%", marginBottom: 100 }}
        >
          {messages
            ? messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    display: "flex",
                    justifyContent: handleAlign(message, usersInfo),
                    overflowAnchor: "none",
                  }}
                >
                  <ChatMessage message={message} usersInfo={usersInfo} />
                  <div ref={messagesEndRef} />
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
        value={chatMessage}
        open={open}
      />
    </>
  );
};

export default ChatIndex;
