/* eslint-disable react/prop-types */
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import styles from "./CreateBoard.module.css";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { addSingleboard } from "./boardSlice";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import updateCurrentBoardInFirebase from "../../../utils/updateCurrentBoardInFirebase";

// when a board is created, need to create a doc in ‘texts’ collection with the same ID.
// only show it if authenticated
const Createboard = () => {
  const {  setcurrentboard, toggleRightPanel, isRightPanelVisible } =
  useProjectContexts();
  const [boardName, setboardName] = useState(null);
  const [user] = useAuthState(auth);

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleCreate = async (e, isScrum) => {
    e.preventDefault();
    if (!boardName) {
      console.warn("board name cant be empty");
      return;
    }
    if (boardName.trim() == "") {
      console.warn("board name cant be blank spaces");
      return;
    }
    try {
      // add board data in boards db in firebase
      const boardDocRef = await addDoc(collection(db, "boards"), {
        title: boardName,
        memberEmails: [user.email],
        createdBy: user.email, //passing the creator of the board, who will also act as the admin later
        createdAt: serverTimestamp(),
        isScrum: isScrum,
      });

        // adding dummy data to create subcollections
        const taskListRef = collection(boardDocRef, "taskList");
        await addDoc(taskListRef, { dummy: true });
        const chatListRef = collection(boardDocRef, "chatList");
        await addDoc(chatListRef, { dummy: true });
      if (isScrum) {
        const storyListRef = collection(boardDocRef, "storyList");
        await addDoc(storyListRef, { dummy: true });
      }

      // add board data & currentboard in corresponding entry in users db in firebase
      updateDoc(doc(db, "users", user.email), {
        [`boards.${boardDocRef.id}`]: boardName,
        // currentboard: [boardDocRef.id, boardName],
      });
      updateCurrentBoardInFirebase(user.email,[boardDocRef.id, boardName])
      // set it as the current board
      setcurrentboard([boardDocRef.id, boardName]);

      // close the chat if it is open
      if (isRightPanelVisible) {
        toggleRightPanel(false);
      }

      // add the new data in redux storage
      dispatch(
        addSingleboard({
          [boardDocRef.id]: boardName,
        })
      );
    } catch (e) {
      console.error("error while creating a board", e);
    }

    history("/");
  };

  // if (!auth.uid) return <Navigate to='/signin' />;

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <label htmlFor="title" className={styles.label}>
          Create board
        </label>
        <input
          type="text"
          id="name"
          onChange={(e) => setboardName(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      {/* First Submit Button */}
      <div className={styles.inputField}>
        <input
          type="button"
          value="Create Task Tracker"
          className={`${styles.btn} ${styles.submit}`}
          onClick={(e) => handleCreate(e, false)}
        />
      </div>

      {/* Second Submit Button */}
      <div className={styles.inputField}>
        <input
          type="button"
          value="Create Project Planner"
          className={`${styles.btn} ${styles.submit}`}
          onClick={(e) => handleCreate(e, true)}
        />
      </div>
    </div>
  );
};

export default Createboard;
