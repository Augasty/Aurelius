/* eslint-disable react/prop-types */
import { doc, getDoc, updateDoc } from "firebase/firestore";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../../firebase";
import { useProjectContexts } from "../../../../utils/ProjectContexts";
import styles from './styles.module.css'
import updateCurrentBoardInFirebase from "../../../../utils/updateCurrentBoardInFirebase";


const AddMemberInBoard = () => {

  const { currentboard } = useProjectContexts();
  const history = useNavigate();

  if (!currentboard) {
    history("/");
  }

  const [userMail, setuserMail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userMail);

    const userRef = doc(db, "users", userMail);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists() && currentboard) {
      // console.log("we can add it, and are adding it", currentboard);




      const userDocRef = doc(db, "users", userMail);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();
      
      await updateDoc(userDocRef, {
        [`boards.${currentboard[0]}`]: currentboard[1],
      });
    
      //  if currentboard is an not an empty array 
      if (!userData.currentboard || userData.currentboard.length === 0) {

        // updating that users db
        updateCurrentBoardInFirebase(userMail,currentboard)
        // await updateDoc(userDocRef, {
        //   currentboard: [...currentboard],
        // });
      }

      // updating in the boards db
      const boardDocRef = doc(db, "boards", currentboard[0]);
      const boardDocSnap = await getDoc(boardDocRef);

      const boardCurrdata = boardDocSnap.data();
      const existingMails = [...boardCurrdata.memberEmails];

      if (existingMails.includes(userMail)){
        console.warn('user already there')
        return
      }
      await updateDoc(boardDocRef, {
        memberEmails: [...boardCurrdata.memberEmails, userMail],
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
          Add member in {currentboard[1]}
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
