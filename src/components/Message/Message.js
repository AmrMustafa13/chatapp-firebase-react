import React, { useContext } from "react";
import "./Message.scss";
import { AuthContext } from "../../context/auth";

const Message = ({ msg }) => {
  const { user } = useContext(AuthContext);

  const styles = msg.uid === user.uid ? "sent" : "received";

  return (
    <div className={`message-container ${styles}`}>
      <div className="msg-header">
        <div className="avatar-img">
          <img src={msg.photoURL} alt="avatar" />
        </div>
        <p className="name">{msg.name}</p>
      </div>
      <p className="message">{msg.text}</p>
    </div>
  );
};

export default Message;
