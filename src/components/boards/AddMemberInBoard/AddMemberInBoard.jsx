/* eslint-disable react/prop-types */
import {  doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import styles from "./styles.module.css";
import btn from "../../../sharedStyles/BigButtonStyle.module.css"

const AddMemberInBoard = () => {
  const { currentboard } = useProjectContexts();
  const history = useNavigate();
  const curuser = auth.currentUser;
  if (!currentboard) {
    history("/");
  }

  const [userMail, setuserMail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userRef = doc(db, "users", userMail);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {



      // checking in the boards collection
      const boardDocRef = doc(db, "boards", currentboard[0]);
      const boardDocSnap = await getDoc(boardDocRef);

      const boardCurrdata = boardDocSnap.data();
      const existingMails = [...boardCurrdata.memberEmails];

      if (existingMails.includes(userMail)) {
        window.alert(`This guy/girl is already in ${currentboard[1]}`);
        return;
      }
      else{
        const userNotificationRef = doc(db, "users",  userMail, "notificationList",currentboard[0])
        const userNotificationSnapShot = await getDoc(userNotificationRef)

        if (userNotificationSnapShot.exists()){
          window.alert(`Already notification sent to ${userMail}`);
          return
        }
        await setDoc(userNotificationRef,{
          type:"join-req",
          details: [...currentboard],
          sender: curuser.email
        })
      }



      history("/");
    } else {
      window.alert("This guy/girl doesn't use Aurelius as of now");
    }
  };
  return (
    <form className={styles.createTaskForm} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className={styles.label}>
          Add member in {currentboard[1]}
        </label>
        <br/>
        <br/>
        <input
          type="text"
          id="name"
          className={styles.inputField}
          value={userMail}
          onChange={(e) => setuserMail(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" className={btn.BigButton}>
          Add
        </button>
      </div>
    </form>
  );
};

export default AddMemberInBoard;
