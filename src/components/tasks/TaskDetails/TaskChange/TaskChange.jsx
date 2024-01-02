/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase";
import { doc, increment, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "../../createTask/styles.module.css";
import { useProjectContexts } from "../../../../utils/ProjectContexts";

const TaskChange = ({ currentTask }) => {
  const { currentboard, isProjectPlanner } = useProjectContexts();
  const currentStory = JSON.parse(
    localStorage.getItem("currentStoryLocalStorage")
  );

  const currentTaskRef = doc(
    db,
    "boards",
    currentboard[0],
    "taskList",
    currentTask?.id
  );
  const curuser = auth.currentUser;

  const [updatedCurrentTask, setupdatedCurrentTask] = useState({
    ...currentTask,
  });
  const history = useNavigate();

  const updateLockedTill = async () => {
    await updateDoc(currentTaskRef, {
      ...updatedCurrentTask,
      lockedTill: new Date(new Date().getTime() + 22000).toISOString(),
      lockedBy: curuser?.email,
    });
  };

  useEffect(() => {
    if (currentboard.lenght !== 0) {
      try {
        updateLockedTill();

        const intervalId = setInterval(updateLockedTill, 20000); // Log every 20sec

        return () => clearInterval(intervalId); // Clean up interval on component unmount
      } catch (error) {
        console.warn("error in taskchange", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setupdatedCurrentTask((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(currentTaskRef, {
      ...updatedCurrentTask,
      updatedAt: new Date().toISOString(),
      lockedBy: null,
      lockedTill: new Date().toISOString(),
    });

    // updating the completionCount of a story
    if (
      isProjectPlanner &&
      currentTask.taskStatus !== updatedCurrentTask.taskStatus
    ) {
      const currentStoryRef = doc(
        db,
        "boards",
        currentboard[0],
        "storyList",
        currentStory[0]
      );
      let incrementCount = 0;
      if (updatedCurrentTask.taskStatus == "Finished") {
        incrementCount--;
      } else if (currentTask.taskStatus == "Finished") {
        incrementCount++;
      }
      await updateDoc(currentStoryRef, {
        updatedAt: new Date().toISOString(),
        completionCount: increment(incrementCount),
      });
    }

    history(-1); //back to the previous screen
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={`${styles.createTaskForm}`}>
        <h5 className={styles.heading}>Change {updatedCurrentTask.title}</h5>
        <label htmlFor="title">Task Title</label>
        <div className={styles.inputField}>
          <input
            type="text"
            id="title"
            value={updatedCurrentTask.title}
            onChange={handleChange}
            required
            className={styles.taskTitleInput}
          />
        </div>

        <label htmlFor="content">Task Content</label>
        <div className={styles.inputField}>
          <textarea
            id="content"
            value={updatedCurrentTask.content}
            onChange={handleChange}
            required
            className={`${styles.customTextarea} ${styles.taskContentTextarea}`}
          />
        </div>

        <div className={`${styles.inputField}`}>
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            className={`${styles.deadlineInput}`}
            onChange={handleChange}
            value={updatedCurrentTask.deadline}
            min={new Date().toISOString().split("T")[0]}
            max="2999-12-31"
          />
        </div>

        <label htmlFor="priority" className={styles.label}>
          Priority
          <select
            id="priority"
            value={updatedCurrentTask.priority}
            onChange={handleChange}
            className={styles.prioritySelect}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <div className={`${styles.inputField}`}>
          <label htmlFor="taskStatus">Task Status</label>
          <select
            id="taskStatus"
            className={`${styles.taskStatusSelect}`}
            value={updatedCurrentTask.taskStatus}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Finished">Finished</option>
          </select>
        </div>

        <div className={`${styles.inputField}`}>
          <button
            className={`${styles.btn} ${styles.submit} ${styles.createTaskBtn}`}
            type="submit"
          >
            {" "}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskChange;
