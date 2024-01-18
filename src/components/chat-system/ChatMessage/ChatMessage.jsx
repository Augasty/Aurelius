/* eslint-disable react/prop-types */

import React from "react";
import topchicken from "../../../../assets/topchicken.jpg";
import { auth } from "../../../firebase";
import styles from './styles.module.css'; 

// eslint-disable-next-line react/display-name
const ChatMessage = React.memo(({ message }) => {
  const { chat, uid, photoURL } = message;
  const messageClass = uid === auth.currentUser.uid;
  console.log(chat);

  return (
    <div className={`${styles.message} ${messageClass && styles.sent}`}>
      <img src={photoURL || topchicken} alt="User" />
        <p>{chat}</p>
      
    </div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if the 'message' prop has changed
  return prevProps.message.uid === nextProps.message.uid;
});

export default ChatMessage;
