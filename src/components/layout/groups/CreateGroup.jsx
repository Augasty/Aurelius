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

// only show it if authenticated
const CreateGroup = ({ setcurrentGroup }) => {
  const [groupName, setGroupName] = useState(null);
  const [user] = useAuthState(auth);

  const curuser = auth.currentUser;

  const dispatch = useDispatch();
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // add group data in groups db in firebase
      const groupDocRef = await addDoc(collection(db, "groups"), {
        title: groupName,
        memberEmails: [user.email],
        createdAt: serverTimestamp(),
      });
      // adding a dummy data in the tasklist to create the subcollection
      const taskListRef = collection(groupDocRef, "taskList");
      await addDoc(taskListRef, { dummy: true });

      // add group data in corresponding entry in users db in firebase
      updateDoc(doc(db, "users", user.email), {
        [`groups.${groupDocRef.id}`]: groupName,
      });

      // set it as the current group
      setcurrentGroup([groupDocRef.id, groupName]);

      // add the new data in redux storage
      dispatch(
        addSingleGroup({
          [groupDocRef.id]: groupName,
        })
      );

      // add it in the localstorage
      localStorage.setItem(
        curuser?.uid,
        JSON.stringify(`${groupDocRef.id},${groupName}`)
      );
    } catch (e) {
      console.error(e);
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
