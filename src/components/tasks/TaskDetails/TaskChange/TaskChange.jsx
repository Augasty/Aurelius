/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "./TaskChange.module.css";

const TaskChange = ({ currentGroup, currentTask }) => {
  const currentTaskRef = doc(db,"groups",currentGroup[0],"taskList",currentTask.id);


  const [formData, setFormData] = useState({
    title: currentTask.title,
    content: currentTask.content,
    createdAt: currentTask.createdAt,
    assignedTo: currentTask.assignedTo,
    priority: currentTask.priority,
    taskStatus: currentTask.taskStatus,
  });
  const history = useNavigate();


  const fetchData = async (docId) => {
    if (!currentGroup || currentGroup.length === 0) {
      return;
    }
    console.log("noti is triggered, and all data is fetched");
    try {
      const taskListRef = collection(db, "groups", currentGroup[0], "taskList");

      if (docId) {
        // Fetch a specific document by ID
        const docSnap = await getDoc(doc(taskListRef, docId));

        if (docSnap.exists()) {
          setFormData({
            id: docSnap.id,
            ...docSnap.data(),
          })


        } else {
          console.log("Document not found");
        }
      }
    } catch (error) {
      console.error("Error fetching tasks from Firebase:", error);
    }
  };
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  useEffect(() => {
    const tasksRef = doc(db, "groups", currentGroup[0], "taskList", currentTask.id);

    const unsub = onSnapshot(tasksRef, () => {
      fetchData(currentTask.id);

      // Set initialLoadComplete to true after the first snapshot
      if (!initialLoadComplete) {
        setInitialLoadComplete(true);
      }
    });

    return () => unsub();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroup, initialLoadComplete]);



  // Function to handle form changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // console.log({
    //   ...currentTask,
    //   ...formData,
    // });
    e.preventDefault();
    await updateDoc(currentTaskRef, {
      ...currentTask,
      ...formData,
    });
    // Call the onSubmit prop with the updated formData
    history("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>{currentTask.title}</h2>
        <label htmlFor="title" className={styles.label}>
          Task Title
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>

        <label htmlFor="content" className={styles.label}>
          Task Content
          <textarea
            id="content"
            value={formData.content}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </label>

        <label htmlFor="createdAt" className={styles.label}>
          Created At
          <input
            type="text"
            id="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            readOnly
            className={styles.input}
          />
        </label>

        <label htmlFor="assignedTo" className={styles.label}>
          Assigned To
          <input
            type="text"
            id="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label htmlFor="priority" className={styles.label}>
          Priority
          <select
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label htmlFor="taskStatus" className={styles.label}>
          Task Status
          <select
            id="taskStatus"
            value={formData.taskStatus}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="new">New</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default TaskChange;
