/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "../../createTask/styles.module.css";
import { useProjectContexts } from "../../../../utils/ProjectContexts";

const TaskChange = ({ currentTask }) => {
  const { currentboard } = useProjectContexts();
  const currentTaskRef = doc(
    db,
    "boards",
    currentboard[0],
    "taskList",
    currentTask?.id
  );
  const curuser = auth.currentUser;

  const [formData, setFormData] = useState({
    ...currentTask,
  });
  const history = useNavigate();

  const updateLockedTill = async () => {
    await updateDoc(currentTaskRef, {
      ...currentTask,
      ...formData,
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
  }, [auth]); // Empty dependency array to run the effect only once on component mounting

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
    e.preventDefault();
    await updateDoc(currentTaskRef, {
      ...currentTask,
      ...formData,
      updatedAt: new Date().toISOString(),
      lockedBy: null,
      lockedTill: new Date().toISOString(),
    });
    history("/");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={`${styles.createTaskForm}`}>
      <h5 className={styles.heading}>Change {formData.title}</h5>
      <label htmlFor="title">Task Title</label>
      <div className={styles.inputField}>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.taskTitleInput}
          />
          </div>


          <label htmlFor="content">Task Content</label>
        <div className={styles.inputField}>
          <textarea
            id="content"
            value={formData.content}
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
            value={formData.deadline}
            required
          />
        </div>

        <label htmlFor="priority" className={styles.label}>
          Priority
          <select
            id="priority"
            value={formData.priority}
            onChange={handleChange}
            className={styles.prioritySelect}
          >
            <option value="Low Priority">Low</option>
            <option value="Medium Priority">Medium</option>
            <option value="High Priority">High</option>
          </select>
        </label>


        <div className={`${styles.inputField}`}>
          <label htmlFor="taskStatus">Task Status</label>
          <select
            id="taskStatus"
            className={`${styles.taskStatusSelect}`}
            value={formData.taskStatus}
            onChange={handleChange}
            required
          >
            <option value="Yet To Start">Yet To Start</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className={`${styles.inputField}`}>
          <button
            className={`${styles.btn} ${styles.submit} ${styles.createTaskBtn}`}
            type="submit"
          >   Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default TaskChange;
