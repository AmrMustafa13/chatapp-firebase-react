import React, { useState, useEffect, useRef, useContext } from "react";
import "./MessagePrompt.scss";
import { db } from "../../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../../context/auth";

const MesssagePrompt = ({ scrollRef, messages }) => {
  const [prompt, setPrompt] = useState("");
  const { user } = useContext(AuthContext);

  const msgInput = useRef(null);
  useEffect(() => {
    msgInput.current.focus();
  }, []);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, scrollRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.trim() === "") {
      alert("Please enter a message first");
      return;
    }
    const { uid, displayName, photoURL } = user;
    await addDoc(collection(db, "messages"), {
      text: prompt,
      name: displayName,
      photoURL,
      uid,
      timestamp: serverTimestamp(),
    });
    setPrompt("");
  };

  return (
    <form className="prompt-container" onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        placeholder="Message"
        ref={msgInput}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MesssagePrompt;
