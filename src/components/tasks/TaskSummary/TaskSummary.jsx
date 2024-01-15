/* eslint-disable react/prop-types */
import styles from "./TaskSummary.module.css";
import { SmartTime } from "../../../utils/SmartTime";
import { Link } from "react-router-dom";
import { isTaskOverDue } from "../../../utils/isTaskOverdue";

const TaskSummary = ({ task, createdAtShown }) => {
  const displayTime = createdAtShown ? task.createdAt : task.updatedAt;

  const formattedDate = SmartTime(displayTime);

  const isOverDue = isTaskOverDue(task);

  return (
    <Link to={"/task/" + task.id} className={styles.LinkStyle}>
      <div
        className={`${styles.taskSummary} ${styles[task.taskStatus]} ${
          isOverDue && styles.Overdue
        }`}
      >
      <div className={styles[task.taskStatus]}></div>
        {/* <p className={styles.taskStatus}>{task.taskStatus} </p>
        {isOverDue && <span className={styles.overdueChip}>Overdue</span>} */}
        <p className={styles.taskSummaryTitle}> 
          {task.title.length > 45
            ? `${task.title.substring(0, 45)}...`
            : task.title}
        </p>
        <p className={styles.taskSummaryDate}>{formattedDate}</p>
      </div>
    </Link>
  );
};

export default TaskSummary;
