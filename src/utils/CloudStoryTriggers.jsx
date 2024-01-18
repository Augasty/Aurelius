/* eslint-disable react/prop-types */
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo } from "react";
import { auth, db } from "../firebase";
import { useDispatch } from "react-redux";


import styles from "./styles.module.css";
import { useProjectContexts } from "./ProjectContexts";
import { setStoriesFromFireBase } from "../components/stories/storySlice";
const CloudStoryTriggers = () => {
  const dispatch = useDispatch();

  const curuser = auth.currentUser;
  const { currentboard,isProjectPlanner ,setisProjectPlanner } = useProjectContexts();

  const fetchStories = useMemo(() => async () => {
    // console.log('fetchStories triggered')
    if (!currentboard|| currentboard.length === 0) {
      return;
    }
    try {
      const StorySnapShot = await getDocs(collection(db, "boards", currentboard[0], "storyList"));


      const boardDocSnap = await getDoc(doc(db, "boards", currentboard[0]));

      setisProjectPlanner(boardDocSnap.data().isProjectPlanner)
      
      if (!StorySnapShot.empty) {
        const storyData = StorySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        
        try {
          dispatch(setStoriesFromFireBase([...storyData]));
          // console.log('story trigger',currentboard,storyData);
        } catch (e) {
          console.warn("error uploading stories in redux", e);
        }
      }
    } catch (error) {
      console.error("Error fetching stories from Firebase:", error);
    }
  }, [currentboard, dispatch, setisProjectPlanner]);


  useEffect(() => {
    const currentboardId = currentboard[0];
    const storysRef = collection(db, "boards", currentboardId, "storyList");
    const unsub = onSnapshot(storysRef, () => {
      fetchStories();
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentboard[0],isProjectPlanner,curuser.currentboard]);

  return <div className={styles.triggers}>Cloud Triggers</div>;
};

export default CloudStoryTriggers;
