/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./styles.module.css"; // Update your custom CSS file name
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useProjectContexts } from "../../../utils/ProjectContexts";

const CreateTask = () => {
  const { currentboard, isProjectPlanner } = useProjectContexts();
  const currentStory = JSON.parse(localStorage.getItem("currentStoryLocalStorage"));
  const initialTaskObject = isProjectPlanner
    ? { openToAll: false, referenceStory: currentStory }
    : { openToAll: false };
  const [task, setTask] = useState({ ...initialTaskObject });

  const [currentboardMails, setcurrentboardMails] = useState([]);

  const curuser = auth.currentUser;
  const history = useNavigate();

  useEffect(() => {
    try {
      const fetchUsersFromcurrentboard = async () => {
        const boardDocRef = doc(db, "boards", currentboard[0]);
        const boardDocSnap = await getDoc(boardDocRef);

        const boardCurrdata = boardDocSnap.data();
        const existingMails = [...boardCurrdata.memberEmails];
        setcurrentboardMails(existingMails);
      };

      fetchUsersFromcurrentboard();
    } catch (e) {
      console.warn(
        "error in fetching existing members while creating a task",
        e
      );
    }
  }, [currentboard]);

  const handleChange = (e) => {
    setTask({
      // Updated variable name
      ...task, // Updated variable name
      [e.target.id]: e.target.value,
      [e.target.id]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "boards", currentboard[0], "taskList"), {
        ...task,
        authorDetails: curuser.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lockedBy: null,
        lockedTill: new Date().toISOString(),
      });

      console.log("task created", task);
    } catch (e) {
      console.error(e);
    }

    history("/");
  };

  return (
    <div className={styles.container}>
      <form className={styles.createTaskForm} onSubmit={handleSubmit}>
        <h5 className={styles.heading}>
          Create A
          {currentStory.length > 0
            ? ` Task Under The Story: ${currentStory[1]}`
            : " New Task"}
        </h5>
        <label htmlFor="title">Task Title</label>
        <div className={styles.inputField}>
          <input
            type="text"
            id="title"
            className={styles.taskTitleInput}
            onChange={handleChange}
            required
          />
        </div>
        <label htmlFor="content">Task Content</label>
        <div className={styles.inputField}>
          <textarea
            id="content"
            className={`${styles.customTextarea} ${styles.taskContentTextarea}`}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <select
          id="assignedTo"
          className={`${styles.assignedToSelect}`}
          value={task.assignedTo || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select person to assign</option>
          {currentboardMails.map((mail) => (
            <option value={mail} key={mail}>
              {mail}
            </option>
          ))}
        </select>

        <div className={`${styles.inputField}`}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            className={styles.prioritySelect}
            onChange={handleChange}
            required
          >
            <option value=""> </option>
            <option value="Low Priority">Low</option>
            <option value="Medium Priority">Medium</option>
            <option value="High Priority">High</option>
          </select>
        </div>

        <div className={`${styles.inputField}`}>
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            className={`${styles.deadlineInput}`}
            onChange={handleChange}
            required
          />
        </div>

        <div className={`${styles.inputField}`}>
          <label htmlFor="openToAll">Open to all</label>
          <input
            type="checkbox"
            id="openToAll"
            className={`${styles.checkbox}`}
            onChange={handleChange}
          />
        </div>

        <div className={`${styles.inputField}`}>
          <label htmlFor="taskStatus">Task Status</label>
          <select
            id="taskStatus"
            className={`${styles.taskStatusSelect}`}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="Yet To Start">Yet To Start</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className={`${styles.inputField}`}>
          <button
            className={`${styles.btn} ${styles.submit} ${styles.createTaskBtn}`}
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
