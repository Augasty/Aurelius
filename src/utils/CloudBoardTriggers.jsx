/* eslint-disable react/prop-types */
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { auth, db } from "../firebase";
import { useDispatch } from "react-redux";
import { setGroupsFromFireBase } from "../components/layout/boards/boardSlice";
import styles from "./styles.module.css";
import { useGroupAndChatToggleContext } from "./GroupAndChatToggleContext";



const CloudBoardTriggers = () => {
  const curuser = auth.currentUser;
  const { currentGroup, setcurrentGroup } = useGroupAndChatToggleContext();
  const dispatch = useDispatch();



  async function fetchBoard() {
    try {
      const userRef = doc(db, "users", curuser?.email);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userGroupsObj = userSnapshot.data().groups;

        dispatch(
          setGroupsFromFireBase({
            ...userGroupsObj,
          })
        );
        // if there are no current group, make it the current group
        if (currentGroup.length == 0) {
          const curGroupArr = userSnapshot.data().currentGroup;
          setcurrentGroup(curGroupArr);
        }
      }
    } catch (error) {
      console.warn("Error fetching data from Firebase:", error);
    }
  }

  useEffect(() => {
    const fetchBoardAndUpdate = async () => {
      try {
        const userRef = doc(db, "users", curuser?.email);

        const unsub = onSnapshot(userRef, () => {
          console.log("Board loading initiated");
          fetchBoard();
        });

        return () => unsub();
      } catch (error) {
        console.error('error in cloudBoardTriggers while fetching Boards',error)
      }
    };

    fetchBoardAndUpdate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curuser?.email]);

  return <div className={styles.triggers}>Cloud Triggers</div>;
};

export default CloudBoardTriggers;
