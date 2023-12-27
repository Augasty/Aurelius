import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import styles from './styles.module.css'; 
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  orderBy,
  getDocs,
  addDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import send from "../../../../assets/send.png";
import { auth, db } from "../../../firebase";
import { useProjectContexts } from "../../../utils/ProjectContexts";

function ChatRoom() {
  const {currentboard} = useProjectContexts();

  const [formValue, setFormValue] = useState("");
  const [messages, setmessages] = useState(null);

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);


  async function fetchTexts(textsRef) {
    try {
      const textsSnapshot = await getDocs(
        query(textsRef, orderBy("createdAt", "desc"))
      );
      // console.log("queries texts", textsSnapshot.size);

      if (!textsSnapshot.empty) {
        const textsData = textsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setmessages([...textsData]);
        console.log(textsData);
      }
    } catch (error) {
      console.warn("error fetching texts:", error);
    }
  }
  // fetch the list of texts in this group whenever someone else adds a text
  useEffect(() => {
    const textsRef = collection(db, "boards", currentboard[0], "chatList");
    dummy.current.scrollIntoView({ behavior: "smooth" });

    const unsub = onSnapshot(textsRef, () => {
      fetchTexts(textsRef);

      // Set initialLoadComplete to true after the first snapshot
      if (!initialLoadComplete) {
        setInitialLoadComplete(true);
      }
    });

    return () => unsub();
  }, [currentboard, initialLoadComplete]);



  const sendMessage = async (e) => {
    e.preventDefault(); //stops the app from refreashing everytime a text is sent

    const { uid, photoURL } = auth.currentUser;

    await addDoc(collection(db, "boards", currentboard[0], "chatList"), {
      chat: formValue,
      createdAt: new Date().toISOString(),
      uid,
      photoURL,
      uniqueId: uuidv4(),
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const dummy = useRef();

  return (
    <>
      <main className={styles.main}>
        <div className={styles.messageContainer}>
          {messages &&
            messages.toReversed().map((msg) => (
              <ChatMessage key={msg.uniqueId} message={msg} />
            ))}
          <span ref={dummy}></span>
        </div>
      </main>
  
      <form onSubmit={sendMessage} className={styles.form}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Message"
          className={styles.input}
        />
  
        <button type="submit" disabled={!formValue} className={styles.button}>
        <img src={send} alt="send" style={{
            width: '30px',  height: '30px'
        }} />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
