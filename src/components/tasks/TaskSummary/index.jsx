/* eslint-disable react/prop-types */
import moment from 'moment';
import styles from './TaskSummary.module.css'



const getTaskColorClass = (taskStatus,isOverDue) => {
  if (isOverDue){
    return styles.taskDue
  }
  switch (taskStatus) {
    case 'Completed':
      return styles.taskCompleted;
    case 'In Progress':
      return styles.taskInProgress;
    case 'Yet To Start':
      return styles.taskYetToStart;
  }
};

const TaskSummary = ({ task}) => {

  const createdAtMoment = moment(task.createdAt);
  const isToday = createdAtMoment.isSame(moment(), 'day');
  const isYesterday = createdAtMoment.isSame(moment().subtract(1, 'day'), 'day');

  let formattedDate;

  if (isToday) {
    formattedDate = `Today at ${createdAtMoment.format('h:mm a')}`;
  } else if (isYesterday) {
    formattedDate = `Yesterday at ${createdAtMoment.format('h:mm a')}`;
  } else {
    formattedDate = createdAtMoment.format('MMMM Do YYYY [at] h:mm a');
  }

  const isOverDue = task.taskStatus!='Completed' && moment(task.deadline,'YYYY-MM-DD').isBefore(moment(), 'day')
  const taskColorClass = getTaskColorClass(task.taskStatus, isOverDue);
  return (
    <div className={`${styles.taskSummary} ${taskColorClass}`}>
    <p className={styles.taskStatus}>{task.taskStatus} </p>
    {isOverDue && <span className={styles.overdueChip}>overdue</span>}
        <p className={styles.taskSummaryTitle}>{task.title}</p>
        <p className={styles.taskSummaryText}>{formattedDate}</p>
    </div>
  );
};

export default TaskSummary
