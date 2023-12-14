import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'
import firebase from 'firebase/compat/app'
import './styles.css'
import { v4 as uuidv4 } from "uuid";
import { collection, query, limit, orderBy} from 'firebase/firestore';

import { auth, db } from '../../../firebase';



function ChatRoom() {
  
  



  // fetch the list of texts in this group
  useEffect(() => {
    async function fetchTexts() {
      try {

        const q = query(collection(db, "texts"), orderBy('createdAt', 'desc'), limit(10) );
        console.log(q)

      } catch (error) {
        console.warn("error fetching texts:", error);
      }
    }
    // console.log("fetching groups");
    fetchTexts();
  }, []);





















  const [formValue, setFormValue] = useState('');
  
  



  // refetching the data from firebase when the user has scrolled up to the top
  const [no_of_texts, set_no_of_texts] = useState(5)

  const callAnotherTenTexts = async() => {

    const snapshot = await messagesRef.get()
    let cursize = snapshot.size

    if (no_of_texts - 5 > cursize){
      return
    }
    let newQuery = messagesRef.orderBy('createdAt',"desc").limit(no_of_texts);
    setQuery(newQuery)
    console.log('Scrolled to the top of the section',no_of_texts);
  };
  
  useEffect(() => {
    callAnotherTenTexts();
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
          section.addEventListener('scroll', handleScroll);
        }
    
        // Clean up the event listener when the component unmounts
        return () => {
          if (section) {
            section.removeEventListener('scroll', handleScroll);
          }
        };
      }, []); // Empty dependency array ensures that this effect runs once on mount
    

    
  
  
  
  const sendMessage = async (e) => {
    e.preventDefault(); //stops the app from refreashing everytime a text is sent
    
    const { uid, photoURL } = auth.currentUser;
    
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      uniqueId: uuidv4()
    })
    
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  
  const dummy = useRef();
  return (<>
    <main>

    {/* <div ref={sectionRef} style={{ height: '400px', overflow: 'auto' }}>
      { messages && messages.toReversed().map(msg => <ChatMessage key={msg.uniqueId} message={msg}/>)}

      <span ref={dummy}></span>
</div> */}
    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} style={{fontFamily: 'inherit'}}
      onChange={(e) => setFormValue(e.target.value)} placeholder="Message" />

      <button type="submit" disabled={!formValue}>📩</button>

    </form>
  </>)
}

export default ChatRoom
