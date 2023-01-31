import { onSnapshot, orderBy, query, collection } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import "./Chat.scss";
import Message from "../Message/Message";
import { db } from "../../config/firebase";
import MesssagePrompt from "../MessagePrompt/MesssagePrompt";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chat-container">
      <main>
        {messages && messages.map((msg) => <Message key={msg.id} msg={msg} />)}
        <span ref={scrollRef}></span>
      </main>
      <MesssagePrompt scrollRef={scrollRef} messages={messages} />
    </div>
  );
};

export default Chat;
