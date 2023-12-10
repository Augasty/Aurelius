/* eslint-disable react/prop-types */
import moment from 'moment';
import styles from './TaskSummary.module.css'


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



  return (
    <div className={styles.taskSummary}>
      <div>
        <h2 className={styles.taskSummaryTitle}>{task.title}</h2>
        <p>Posted by {task.authorDetails}</p>
        <p className={styles.taskSummaryText}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default TaskSummary
