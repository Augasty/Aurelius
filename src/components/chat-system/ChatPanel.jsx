import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage/ChatMessage";
import styles from "./ChatPanel.module.css";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  orderBy,
  getDocs,
  addDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useProjectContexts } from "../../utils/ProjectContexts";

function ChatPanel() {
  const { currentboard } = useProjectContexts();

  const [formValue, setFormValue] = useState("");
  const [messages, setmessages] = useState(null);


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

    });

    return () => unsub();
  }, [currentboard]);


  
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();
    const trimmedFormValue = formValue.trim();
  
    if (!trimmedFormValue) {
      return;
    }
  
    const { uid, photoURL } = auth.currentUser;
  
    await addDoc(collection(db, "boards", currentboard[0], "chatList"), {
      chat: trimmedFormValue,
      createdAt: new Date().toISOString(),
      uid,
      photoURL,
      uniqueId: uuidv4(),
    });
  
    setFormValue("");
    dummy.current.scrollIntoView({ block: "end", inline: "nearest" , behavior: "auto"});
  };


  return (
    <div className={styles.ChatPanel}>
      <main className={styles.OuterMessageContainer}>
        <div className={styles.InnerMessageContainer}>
          {messages &&
            messages.toReversed().map((msg) => <ChatMessage key={msg.uniqueId} message={msg} />)}
        </div>
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage} className={styles.form}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}

          className={styles.input}
        />

        <button type="submit" disabled={!formValue} className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatPanel;

