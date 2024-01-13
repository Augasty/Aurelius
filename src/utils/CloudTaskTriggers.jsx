/* eslint-disable react/prop-types */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useMemo } from "react";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { setTasksFromFireBase } from "../components/tasks/taskSlice";

import styles from "./styles.module.css";
import { useProjectContexts } from "./ProjectContexts";
const CloudTaskTriggers = () => {
  const dispatch = useDispatch();

  const { currentboard, setisProjectPlanner } = useProjectContexts();

  const fetchData = useMemo(
    () => async () => {
      if (!currentboard || currentboard.length === 0) {
        return;
      }
      try {
        const ProjectsSnapShot = await getDocs(
          collection(db, "boards", currentboard[0], "taskList")
        );

        const boardDocSnap = await getDoc(doc(db, "boards", currentboard[0]));
        console.log(boardDocSnap.data().isProjectPlanner);
        setisProjectPlanner(boardDocSnap.data().isProjectPlanner);

        if (!ProjectsSnapShot.empty) {
          const projectsData = ProjectsSnapShot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          const filteredProjectsData = projectsData?.filter(
            (obj) => !obj.dummy
          );
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
    },
    [currentboard, dispatch, setisProjectPlanner]
  );

  useEffect(() => {
    const currentboardId = currentboard[0];
    const tasksRef = collection(db, "boards", currentboardId, "taskList");
    const unsub = onSnapshot(tasksRef, () => {
      fetchData();
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentboard]);

  return <div className={styles.triggers}>Cloud Triggers</div>;
};

export default CloudTaskTriggers;
