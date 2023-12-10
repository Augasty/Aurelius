/* eslint-disable react/prop-types */
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { setTasksFromFireBase } from "../tasks/taskSlice";

import styles from "./Dashboard.module.css";
const Notifications = ({ currentGroup }) => {
  const dispatch = useDispatch();
  // can't put this useeffect inside Navbar, it gets called before tasklist is rendered









  
  const fetchData = async () => {
    if (!currentGroup || currentGroup.length === 0) {
      return;
    }
    console.log("noti is triggered, and all data is fetched");
    try {
      const ProjectsSnapShot = await getDocs(
        collection(db, "groups", currentGroup[0], "taskList")
      );

      if (!ProjectsSnapShot.empty) {
        const projectsData = ProjectsSnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        const filteredProjectsData = projectsData?.filter((obj) => !obj.dummy);
        // console.log(filteredProjectsData);

        try {
          dispatch(setTasksFromFireBase([...filteredProjectsData]));
        } catch (e) {
          console.warn("error uploading tasks in redux", e);
        }
      }
    } catch (error) {
      console.error("Error fetching tasks from Firebase:", error);
    }
  };

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  useEffect(() => {
    const currentGroupId = currentGroup[0];
    const tasksRef = collection(db, "groups", currentGroupId, "taskList");
    const unsub = onSnapshot(tasksRef, (snapshot) => {
      // console.log('times useeffect called')
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("New task");
        }
        if (change.type === "modified") {
            console.log("Modified task ");
        }
        if (change.type === "removed") {
            console.log("Removed task");
        }
      });
    

      // we are calling the doc everytime someone adds or changes any doc
      // as a failsafe, we are also adding the doc locally in our redux anytime a doc is created by me[the current user]
      // although it gets updated anyways
      fetchData();

      // Set initialLoadComplete to true after the first snapshot
      if (!initialLoadComplete) {
        setInitialLoadComplete(true);
      }
    });

    return () => unsub();
  }, [currentGroup, initialLoadComplete]);

  return <div className={styles.notifications}>Notifications</div>;
};

export default Notifications;
