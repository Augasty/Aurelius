/* eslint-disable react/prop-types */
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  addDoc,  collection,doc,  serverTimestamp,updateDoc} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// only show it if authenticated
const CreateGroup = ({setGroup,groupsObject,setGroupsObject}) => {
  const [groupName, setGroupName] = useState(null);
  const [user] = useAuthState(auth);

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const groupDocRef = await addDoc(collection(db, "groups"), {
        title: groupName,
        memberEmails: [user.email],
        createdAt: serverTimestamp(),
      });

      // dummy task is used, need to remember to skip it
      const taskListRef = collection(groupDocRef, "taskList");
      await addDoc(taskListRef, {dummy:true});
      // add group in the user with email augasty@gmail.com
      updateDoc(doc(db, "users", user.email),{
        [`groups.${groupDocRef.id}`]: groupName
      })

      // groupId:groupName
      setGroup([groupDocRef.id,groupName])
      setGroupsObject({
        ...groupsObject,
        [groupDocRef.id]:groupName
      })
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
