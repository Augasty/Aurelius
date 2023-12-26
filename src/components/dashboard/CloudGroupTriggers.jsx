/* eslint-disable react/prop-types */
import { doc, getDoc,  onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useDispatch } from "react-redux";
import { setGroupsFromFireBase } from "../../components/layout/groups/groupSlice" 
import styles from "./Dashboard.module.css";
import { useGroupAndChatToggleContext } from "../../utils/GroupAndChatToggleContext";
const CloudGroupTriggers = () => {
    const curuser = auth.currentUser;
    const { currentGroup, setcurrentGroup } =  useGroupAndChatToggleContext();
  
  const dispatch = useDispatch();
 
  async function fetchGroup() {
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
        if (currentGroup.length == 0 ){
          const curGroupArr = userSnapshot.data().currentGroup;
          setcurrentGroup(curGroupArr);
        }

      } 
    } catch (error) {
      console.warn("Error fetching data from Firebase:", error);
    }
  }

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  useEffect(() => {
    const fetchGroupAndUpdate = async () => {
      try {
        const userRef = doc(db, "users", curuser?.email);

        const unsub = onSnapshot(userRef, () => {
          console.log('group loading initiated')
          fetchGroup();
          if (!initialLoadComplete) {
            setInitialLoadComplete(true);
          }
        });
  
        return () => unsub();
      } catch (error) {
        // Handle error, e.g., console.error(error);
      }
    };
  
    fetchGroupAndUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLoadComplete]);

  return <div className={styles.notifications}>Cloud Triggers</div>;
};

export default CloudGroupTriggers;
