/* eslint-disable react/prop-types */
import moment from "moment";
import styles from "./TaskSummary.module.css";

const getTaskColorClass = (taskStatus) => {
  switch (taskStatus) {
    case "Completed":
      return styles.taskCompleted;
    case "In Progress":
      return styles.taskInProgress;
    case "Yet To Start":
      return styles.taskYetToStart;
  }
};

const TaskSummary = ({ task , createdAtShown}) => {

  const displayTimeMoment = moment(createdAtShown ? task.createdAt : task.updatedAt);
  const isToday = displayTimeMoment.isSame(moment(), "day");
  const isYesterday = displayTimeMoment.isSame(
    moment().subtract(1, "day"),
    "day"
  );

  let formattedDate;

  if (isToday) {
    formattedDate = `Today at ${displayTimeMoment.format("h:mm a")}`;
  } else if (isYesterday) {
    formattedDate = `Yesterday at ${displayTimeMoment.format("h:mm a")}`;
  } else {
    formattedDate = displayTimeMoment.format("MMMM Do YYYY [at] h:mm a");
  }

  const isOverDue =
    task.taskStatus != "Completed" &&
    moment(task.deadline, "YYYY-MM-DD").isBefore(moment(), "day");
  const taskColorClass = getTaskColorClass(task.taskStatus);
  return (
    <div className={`${styles.taskSummary} ${taskColorClass}`}>
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
  );
};

export default TaskSummary;
