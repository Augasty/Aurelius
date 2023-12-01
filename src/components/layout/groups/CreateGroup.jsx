import { useState } from 'react';

import {  useNavigate} from 'react-router-dom';

import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


// only show it if authenticated
const CreateGroup = () => {
  const [group, setGroup] = useState(null);
  const [user] = useAuthState(auth);
  const curuser = auth.currentUser;


  const history = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{

        const groupDocRef = await addDoc(collection(db, 'groups'), {
            title: group,
            memberIds: [],
            createdAt: serverTimestamp()
          });

          // Reference to the 'taskList' subcollection
          const taskListRef = collection(groupDocRef, 'taskList');
          
          // dummy task is used, need to remember to skip it
          const taskDocRef = await addDoc(taskListRef, {});

          // add group in the user
          

          

    }catch(e){
      console.error(e)
    }

    history('/');
  };

  // if (!auth.uid) return <Navigate to='/signin' />;

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="heading">Create a New Group</h5>
        <div className="input-field">
          <label htmlFor="title">Project Title</label>
          <input type="text" id='name' onChange={e=> setGroup(e.target.value)} />
        </div>
        <div className="input-field">
          <button className="btn submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup