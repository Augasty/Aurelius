/* eslint-disable react/prop-types */
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styles from './CreateBoard.module.css';
import btn from '../../../sharedStyles/BigButtonStyle.module.css';

import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useProjectContexts } from '../../../utils/ProjectContexts';
import updateCurrentBoardInFirebase from '../../../utils/updateCurrentBoardInFirebase';
import { setStoriesFromFireBase } from '../../stories/storySlice';
import { useDispatch } from 'react-redux';
import { setTasksFromFireBase } from '../../tasks/taskSlice';

// when a board is created, need to create a doc in ‘texts’ collection with the same ID.
// only show it if authenticated
const Createboard = () => {
  const { toggleRightPanel, isRightPanelVisible } = useProjectContexts();
  const [boardName, setboardName] = useState(null);
  const [user] = useAuthState(auth);
  const history = useNavigate();

  const dispatch = useDispatch();

  const handleCreate = async (e, isProjectPlanner) => {
    e.preventDefault();
    if (!boardName) {
      console.warn('board name cant be empty');
      return;
    }
    if (boardName.trim() == '') {
      console.warn('board name cant be blank spaces');
      return;
    }
    try {
      const boardDocRef = await addDoc(collection(db, 'boards'), {
        title: boardName,
        memberEmails: [user.email],
        createdBy: user.email,
        createdAt: serverTimestamp(),
        isProjectPlanner: isProjectPlanner,
      });

      const taskListRef = collection(boardDocRef, 'taskList');
      await addDoc(taskListRef, { dummy: true });
      const chatListRef = collection(boardDocRef, 'chatList');
      await addDoc(chatListRef, { dummy: true });
      if (isProjectPlanner) {
        const storyListRef = collection(boardDocRef, 'storyList');
        await addDoc(storyListRef, { dummy: true });
      }

      // add board data & currentboard in corresponding entry in users db in firebase
      updateDoc(doc(db, 'users', user.email), {
        [`boards.${boardDocRef.id}`]: boardName,
      });
      updateCurrentBoardInFirebase(user.email, [boardDocRef.id, boardName]);

      // setting the story and task blank... preventing the old board data from showing for a moment
      dispatch(setStoriesFromFireBase([]));
      dispatch(setTasksFromFireBase([]));


      // close the chat if it is open
      if (isRightPanelVisible) {
        toggleRightPanel(false);
      }
    } catch (e) {
      console.error('error while creating a board', e);
    }

    history('/');
  };

  // if (!auth.uid) return <Navigate to='/signin' />;

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <label htmlFor="title" className={styles.label}>
          <strong>Create Board</strong>
        </label>
        <input
          type="text"
          id="name"
          onChange={(e) => setboardName(e.target.value)}
          className={styles.input}
          required
          maxLength={30}
        />
      </div>

      {/* First Submit Button */}
      <div className={styles.inputField}>
        <input
          type="button"
          value="Create Task Tracker"
          className={btn.BigButton}
          onClick={(e) => handleCreate(e, false)}
        />
      </div>

      {/* Second Submit Button */}
      <div className={styles.inputField}>
        <input
          type="button"
          value="Create Project Planner"
          className={btn.BigButton}
          onClick={(e) => handleCreate(e, true)}
        />
      </div>
    </div>
  );
};

export default Createboard;
