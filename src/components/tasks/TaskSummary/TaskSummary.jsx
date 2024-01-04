/* eslint-disable react/prop-types */
import moment from "moment";
import styles from "./TaskSummary.module.css";
import { SmartTime } from "../../../utils/SmartTime";
import { Link } from "react-router-dom";

const TaskSummary = ({ task, createdAtShown }) => {
  const displayTime = createdAtShown ? task.createdAt : task.updatedAt;

  const formattedDate = SmartTime(displayTime);

  const isOverDue =
    task.taskStatus != "Finished" &&
    moment(task.deadline, "YYYY-MM-DD").isBefore(moment(), "day");

  return (
    <Link to={"/task/" + task.id} className={styles.LinkStyle}>
      <div
        className={`${styles.taskSummary} ${styles[task.taskStatus]} ${
          isOverDue && styles.Overdue
        }`}
      >
        <p className={styles.taskStatus}>{task.taskStatus} </p>
        {isOverDue && <span className={styles.overdueChip}>Overdue</span>}
        <p className={styles.taskSummaryTitle}>
          {task.title.length > 44
            ? `${task.title.substring(0, 42)}...`
            : task.title}
        </p>
        <p className={styles.taskSummaryDate}>
          {formattedDate}
        </p>
      </div>
    </Link>
  );
};

export default TaskSummary;
