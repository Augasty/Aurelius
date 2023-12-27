/* eslint-disable react/prop-types */
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { setTasksFromFireBase } from "../components/tasks/taskSlice";

import styles from "./styles.module.css";
import { useProjectContexts } from "./ProjectContexts";
const CloudTaskTriggers = () => {
  const dispatch = useDispatch();
  // can't put this useeffect inside Navbar, it gets called before tasklist is rendered

  const { currentboard } = useProjectContexts();

  const fetchData = async () => {
    if (!currentboard|| currentboard.length === 0) {
      return;
    }
    // console.log("noti is triggered, and all data is fetched");
    try {
      const ProjectsSnapShot = await getDocs(
        collection(db, "boards", currentboard[0], "taskList")
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
    const currentboardId = currentboard[0];
    const tasksRef = collection(db, "boards", currentboardId, "taskList");
    const unsub = onSnapshot(tasksRef, () => {
      fetchData();
      if (!initialLoadComplete) {
        setInitialLoadComplete(true);
      }
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentboard, initialLoadComplete]);

  return <div className={styles.triggers}>Cloud Triggers</div>;
};

export default CloudTaskTriggers;
