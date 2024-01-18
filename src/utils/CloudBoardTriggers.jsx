/* eslint-disable react/prop-types */
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { auth, db } from '../firebase';
import { useDispatch } from 'react-redux';
import { setboardsFromFireBase } from '../components/layout/boards/boardSlice';
import styles from './styles.module.css';
import { useProjectContexts } from './ProjectContexts';

const CloudBoardTriggers = () => {
  const curuser = auth.currentUser;
  const { currentboard, setcurrentboard } = useProjectContexts();
  const dispatch = useDispatch();

  async function fetchBoard() {
    console.log('fetchboard called')
    try {
      const userRef = doc(db, 'users', curuser?.email);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        // the snapshot is used on 'users' collection, whenever any data in current user gets updated, it will trigger
        const userboardsObj = userSnapshot.data().boards;

        dispatch(setboardsFromFireBase({ ...userboardsObj }));
        // if there are no current board, make it the current board
        if (currentboard.length == 0) {
          const curBoardArr = userSnapshot.data().currentboard;
          setcurrentboard(curBoardArr);
        }
      }
    } catch (error) {
      console.warn('Error fetching data from Firebase:', error);
    }
  }

  useEffect(() => {
    const fetchBoardAndUpdate = async () => {
      try {
        const userRef = doc(db, 'users', curuser?.email);

        const unsub = onSnapshot(userRef, () => {
          fetchBoard();
        });

        return () => unsub();
      } catch (error) {
        console.error('error in cloudBoardTriggers while fetching Boards', error);
      }
    };

    fetchBoardAndUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={styles.triggers}>Cloud Triggers</div>;
};

export default CloudBoardTriggers;


// const CloudBoardTriggers = () => {
//   return (
//     <></>
//   )
// }

// export default CloudBoardTriggers