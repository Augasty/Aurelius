/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import styles from "./TaskView.module.css";
const TaskView = ({ currentTask }) => {
  const history = useNavigate();
  if (!currentTask) {
    return <>loading</>;
  }
  return (
    <div className={styles.taskDetails}>
      <h2 className={styles.taskDetailsTitle}>{currentTask.title}</h2>
      <p className={styles.taskDetailsText}>
        <strong className={styles.taskDetailsStrong}>Content:</strong>{" "}
        {currentTask.content}
      </p>
      <p className={styles.taskDetailsText}>
        <strong className={styles.taskDetailsStrong}>Author:</strong>{" "}
        {currentTask?.authorDetails}
      </p>
      <p className={styles.taskDetailsText}>
        <strong className={styles.taskDetailsStrong}>Created At:</strong>{" "}
        {currentTask.createdAt}
      </p>
      <p className={styles.taskDetailsText}>
        <strong className={styles.taskDetailsStrong}>Deadline:</strong>{" "}
        {currentTask.deadline}
      </p>
      <p className={styles.taskDetailsText}>
        <strong className={styles.taskDetailsStrong}>Assigned To:</strong>{" "}
        {currentTask.assignedTo}
      </p>
      <p className={styles.taskDetailsText}>
        <strong className={styles.taskDetailsStrong}>Priority:</strong>{" "}
        {currentTask.priority}
      </p>
      <p className={styles.taskDetailsText}>
        <strong className={styles.taskDetailsStrong}>Task Status:</strong>{" "}
        {currentTask.taskStatus}
      </p>
      <button onClick={() => history(-1)}>Back</button>
    </div>
  );
};

export default TaskView;
