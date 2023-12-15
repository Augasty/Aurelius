/* eslint-disable react/prop-types */

import topchicken from "../../../../assets/topchicken.jpg";
import { auth } from "../../../firebase";
import styles from './styles.module.css'; 


function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (
      <div className={`${styles.message} ${messageClass}`}>
        <img src={photoURL || topchicken} alt="User" />
        <div className={styles.messageContent}>
          {/* {sender && <span className={styles.sender}>{sender}</span>} */}
          <p>{text}</p>
        </div>
      </div>
    );
  }

export default ChatMessage