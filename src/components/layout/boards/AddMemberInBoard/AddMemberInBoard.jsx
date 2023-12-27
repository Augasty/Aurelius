/* eslint-disable react/prop-types */
import { doc, getDoc, updateDoc } from "firebase/firestore";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../../firebase";
import { useProjectContexts } from "../../../../utils/ProjectContexts";
import styles from './styles.module.css'


const AddMemberInBoard = () => {

  const { currentBoard } = useProjectContexts();
  const history = useNavigate();

  if (!currentBoard) {
    history("/");
  }

  const [userMail, setuserMail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userMail);

    const userRef = doc(db, "users", userMail);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists() && currentBoard) {
      // console.log("we can add it, and are adding it", currentGroup);




      const userDocRef = doc(db, "users", userMail);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();
      
      //  if currentGroup is an not an empty array 
      if (!userData.currentBoard || userData.currentBoard.length === 0) {

        // updating that users db
        await updateDoc(userDocRef, {
          currentGroup: [...currentBoard],
        });
      }
        await updateDoc(userDocRef, {
          [`groups.${currentBoard[0]}`]: currentBoard[1],
        });
      

      // updating in the groups db
      const groupDocRef = doc(db, "groups", currentBoard[0]);
      const groupDocSnap = await getDoc(groupDocRef);

      const groupCurrdata = groupDocSnap.data();
      const existingMails = [...groupCurrdata.memberEmails];

      if (existingMails.includes(userMail)){
        console.warn('user already there')
        return
      }
      await updateDoc(groupDocRef, {
        memberEmails: [...groupCurrdata.memberEmails, userMail],
      });

      history("/");
    } else {
      console.log("nopes");
    }
  };
  return (
    <form className={styles.createTaskForm} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className={styles.label}>
          Add member in {currentBoard[1]}
        </label>
        <input
          type="text"
          id="name"
          className={styles.inputField}
          value={userMail}
          onChange={(e) => setuserMail(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" className={styles.btn}>
          Add
        </button>
      </div>
    </form>
  );
  
};

export default AddMemberInBoard;
