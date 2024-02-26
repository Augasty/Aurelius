/* eslint-disable react/prop-types */

import styles from './TaskView.module.css';
import { isTaskOverDue } from '../../../../utils/isTaskOverdue';
import { SmartTime, formatDate } from '../../../../utils/SmartTime';
import { useState } from 'react';
import BackButton from '../../../BackButton/BackButton';
const TaskView = ({ currentTask }) => {
  const [seeMore, setseeMore] = useState(false);

  if (!currentTask) {
    return <>loading</>;
  }

  const isOverDue = isTaskOverDue(currentTask);
  const deadlinedate = formatDate(currentTask.deadline);
  const smartCreatedAt = SmartTime(currentTask.createdAt);
  return (
    <div className={styles.container}>
      <div className={`${styles.taskDetails} ${styles[currentTask.taskStatus]} ${isOverDue && styles.Overdue}`}>
        <h2 className={styles.taskDetailsTitle}>{currentTask.title}</h2>
        <p className={styles.taskDetailsText}>{currentTask.content} </p>

        {seeMore && (
          <>
            <div className={styles.taskDetailsTop}>
              <span>
                <span>Author: </span>
                {currentTask?.authorDetails}
              </span>
              <span>
                <span>Created at: </span>
                {smartCreatedAt}
              </span>
            </div>
            <div className={styles.taskDetailsTop}>
              <span>
                <span>Assigned to: </span>
                {currentTask.assignedTo}
              </span>
              <span>
                <span>Deadline: </span>
                {deadlinedate === "31-12-9999" ? "N/A" : currentTask.deadline}
              </span>
            </div>

            <div className={styles.taskDetailsTop}>
              <span>
                <span>Priority: </span>
                {currentTask.priority}
              </span>
              <span>
                <span>Status: </span>
                {currentTask.taskStatus}
              </span>
            </div>
            <br />
          </>
        )}

        <div className={styles.taskDetailsTop}>
          <span>
            <button onClick={() => setseeMore(!seeMore)}>{seeMore ? 'Collapse' : 'Expand'}</button>
          </span>
          <span>
            <BackButton/>
          </span>

        </div>
      </div>
    </div>
  );
};

export default TaskView;
