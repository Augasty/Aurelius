/* eslint-disable react/prop-types */

import moment from 'moment'
import styles from './TaskView.module.css';

const TaskView = ({ currentTask}) => {
  if(!currentTask){
    return <>loading</>
  }
  return (
    <div className={styles.taskDetails}>
      <h2 className={styles.taskDetailsTitle}>{currentTask.title}</h2>
      <p className={styles.taskDetailsText}><strong className={styles.taskDetailsStrong}>Content:</strong> {currentTask.content}</p>
      <p className={styles.taskDetailsText}><strong className={styles.taskDetailsStrong}>Author:</strong> {currentTask?.authorDetails}</p>
      <p className={styles.taskDetailsText}><strong className={styles.taskDetailsStrong}>Created At:</strong> {currentTask.createdAt}</p>
      <p className={styles.taskDetailsText}><strong className={styles.taskDetailsStrong}>Assigned To:</strong> {currentTask.assignedTo}</p>
      <p className={styles.taskDetailsText}><strong className={styles.taskDetailsStrong}>Priority:</strong> {currentTask.priority}</p>
      <p className={styles.taskDetailsText}><strong className={styles.taskDetailsStrong}>Task Status:</strong> {currentTask.taskStatus}</p>
    </div>
  );
};

export default TaskView;
