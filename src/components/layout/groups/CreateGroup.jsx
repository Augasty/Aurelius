/* eslint-disable react/prop-types */
import { useState } from "react";

import { useNavigate } from "react-router-dom";

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
import { addSingleGroup } from "./groupSlice";
import { useGroupAndChatToggleContext } from "../navbar/GroupAndChatToggleContext";

// when a group is created, need to create a doc in ‘texts’ collection with the same ID.
// only show it if authenticated
const CreateGroup = () => {
  const { setcurrentGroup } = useGroupAndChatToggleContext();
  const [groupName, setGroupName] = useState(null);
  const [user] = useAuthState(auth);

  const dispatch = useDispatch();
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // add group data in groups db in firebase
      const groupDocRef = await addDoc(collection(db, "groups"), {
        title: groupName,
        memberEmails: [user.email],
        createdBy: user.email, //passing the creator of the group, who will also act as the admin later
        createdAt: serverTimestamp(),
      });
      // adding a dummy data in the tasklist to create the subcollection
      const taskListRef = collection(groupDocRef, "taskList");
      await addDoc(taskListRef, { dummy: true });
      // adding a dummy data in the textlist to create the subcollection
      const textListRef = collection(groupDocRef, "textList");
      await addDoc(textListRef, { dummy: true });

      // add group data & currentgroup in corresponding entry in users db in firebase
      updateDoc(doc(db, "users", user.email), {
        [`groups.${groupDocRef.id}`]: groupName,
        currentGroup: [groupDocRef.id, groupName],
      });
      // set it as the current group
      setcurrentGroup([groupDocRef.id, groupName]);

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
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="title">Create Group</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <button className="btn submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
