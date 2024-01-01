/* eslint-disable react/prop-types */
import moment from "moment";
import styles from "./TaskSummary.module.css";
import { SmartTime } from "../../../utils/SmartTime";
import { Link } from "react-router-dom";

const getTaskColorClass = (taskStatus) => {

  switch (taskStatus) {
    case "Finished":
      return styles.taskCompleted;
    case "Active":
      return styles.taskInProgress;
    case "Pending":
      return styles.taskYetToStart;
  }
};

const TaskSummary = ({ task , createdAtShown}) => {

  const displayTime = createdAtShown ? task.createdAt : task.updatedAt

  const formattedDate = SmartTime(displayTime)

  const isOverDue = task.taskStatus != "Finished" &&
    moment(task.deadline, "YYYY-MM-DD").isBefore(moment(), "day");

  const taskColorClass = getTaskColorClass(task.taskStatus,isOverDue)
  return (
    <Link to={"/task/" + task.id} className={styles.LinkStyle}>
    <div className={`${styles.taskSummary} ${taskColorClass} ${isOverDue && styles.taskOverDue}`}>
      <p className={styles.taskStatus}>{task.taskStatus} </p>
      {isOverDue && <span className={styles.overdueChip}>overdue</span>}
      <p className={styles.taskSummaryTitle}>
        {task.title.length > 25
          ? `${task.title.substring(0, 22)}...`
          : task.title}
      </p>
      <p className={styles.taskSummaryText}>
        {" "}
        {formattedDate.length > 30
          ? `${formattedDate.substring(0, 28)}...`
          : formattedDate}
      </p>
    </div>
    </Link>
  );
};

export default TaskSummary;
