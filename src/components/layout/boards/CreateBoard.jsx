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
import { addSingleGroup } from "./boardSlice";
import { useGroupAndChatToggleContext } from "../../../utils/GroupAndChatToggleContext";

// when a group is created, need to create a doc in ‘texts’ collection with the same ID.
// only show it if authenticated
const CreateGroup = () => {
  const { setcurrentGroup, toggleRightPanel, isRightPanelVisible } =
    useGroupAndChatToggleContext();
  const [groupName, setGroupName] = useState(null);
  const [user] = useAuthState(auth);

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleCreate = async (e, isScrum) => {
    e.preventDefault();
    if (!groupName) {
      console.warn("group name cant be empty");
      return;
    }
    if (groupName.trim() == "") {
      console.warn("group name cant be blank spaces");
      return;
    }
    try {
      // add group data in groups db in firebase
      const groupDocRef = await addDoc(collection(db, "groups"), {
        title: groupName,
        memberEmails: [user.email],
        createdBy: user.email, //passing the creator of the group, who will also act as the admin later
        createdAt: serverTimestamp(),
        isScrum: isScrum,
      });

        // adding a dummy data in the tasklist to create the subcollection
        const taskListRef = collection(groupDocRef, "taskList");
        await addDoc(taskListRef, { dummy: true });
        // adding a dummy data in the textlist to create the subcollection
        const chatListRef = collection(groupDocRef, "chatList");
        await addDoc(chatListRef, { dummy: true });
        // make the text Slice an empty array
      if (isScrum) {
        // inside the collection scrum, create a doc with the same id as the group
        const storyListRef = collection(groupDocRef, "storyList");
        await addDoc(storyListRef, { dummy: true });
      }

      // add group data & currentgroup in corresponding entry in users db in firebase
      updateDoc(doc(db, "users", user.email), {
        [`groups.${groupDocRef.id}`]: groupName,
        currentGroup: [groupDocRef.id, groupName],
      });
      // set it as the current group
      setcurrentGroup([groupDocRef.id, groupName]);

      // close the chat if it is open
      if (isRightPanelVisible) {
        toggleRightPanel(false);
      }

      // add the new data in redux storage
      dispatch(
        addSingleGroup({
          [groupDocRef.id]: groupName,
        })
      );
    } catch (e) {
      console.error("error while creating a group", e);
    }

    history("/");
  };

  // if (!auth.uid) return <Navigate to='/signin' />;

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <label htmlFor="title" className={styles.label}>
          Create Group
        </label>
        <input
          type="text"
          id="name"
          onChange={(e) => setGroupName(e.target.value)}
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

export default CreateGroup;
