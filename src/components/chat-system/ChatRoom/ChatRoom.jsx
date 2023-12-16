import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import styles from './styles.module.css'; 
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  limit,
  orderBy,
  getDocs,
  addDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import send from "../../../../assets/send.png";
import { auth, db } from "../../../firebase";
import { useGroupAndChatToggleContext } from "../../layout/navbar/GroupAndChatToggleContext";

function ChatRoom() {
  const { currentGroup } = useGroupAndChatToggleContext();

  const [formValue, setFormValue] = useState("");
  const [messages, setmessages] = useState(null);

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);






  async function fetchTexts(textsRef,no_of_text_to_load) {
    try {
      const textsSnapshot = await getDocs(
        query(textsRef, orderBy("createdAt", "desc"))
      );
      console.log("queries texts", textsSnapshot.size);

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
  // fetch the list of texts in this group
  useEffect(() => {
    const textsRef = collection(db, "groups", currentGroup[0], "textList");
    dummy.current.scrollIntoView({ behavior: "smooth" });

    const unsub = onSnapshot(textsRef, () => {
      fetchTexts(textsRef,5);

      // Set initialLoadComplete to true after the first snapshot
      if (!initialLoadComplete) {
        setInitialLoadComplete(true);
      }
    });

    return () => unsub();
  }, [currentGroup, initialLoadComplete]);

  // refetching the data from firebase when the user has scrolled up to the top
  const [no_of_texts, set_no_of_texts] = useState(5);

  const callAnotherTenTexts = async () => {
    const textsRef = collection(db, "groups", currentGroup[0], "textList");
    fetchTexts(textsRef,no_of_texts);
    console.log('Scrolled to the top of the section',no_of_texts);
  };

  useEffect(() => {
    callAnotherTenTexts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [no_of_texts]);



  // handling when reached to the top
  const sectionRef = useRef(null);
  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;
      if (section) {
        const isAtTop = section.scrollTop === 0;
        if (isAtTop) {
          set_no_of_texts((prevNoOfTexts) => prevNoOfTexts + 10);
        }
      }
    }
    
    // Attach the scroll event listener when the component mounts
    const section = sectionRef.current;
    if (section) {
      section.addEventListener("scroll", handleScroll);
      console.log(section)
      
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (section) {
        section.removeEventListener("scroll", handleScroll);
      }
    };
  }, []); // Empty dependency array ensures that this effect runs once on mount

  const sendMessage = async (e) => {
    e.preventDefault(); //stops the app from refreashing everytime a text is sent

    const { uid, photoURL } = auth.currentUser;

    await addDoc(collection(db, "groups", currentGroup[0], "textList"), {
      text: formValue,
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
        <div ref={sectionRef} className={styles.messageContainer}>
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
