/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { auth, db } from '../../../../firebase';
import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styles from '../TaskView/TaskView.module.css';
import { useProjectContexts } from '../../../../utils/ProjectContexts';

import { isTaskOverDue } from '../../../../utils/isTaskOverdue';
import { formatDate, SmartTime } from '../../../../utils/SmartTime';
import BackButton from '../../../BackButton/BackButton';

const TaskChange = ({ currentTask }) => {
  const { currentboard, isProjectPlanner } = useProjectContexts();

  const currentTaskRef = doc(db, 'boards', currentboard[0], 'taskList', currentTask?.id);
  const curuser = auth.currentUser;
  const [updatedCurrentTask, setupdatedCurrentTask] = useState({
    ...currentTask,
  });
  const deadlinedate = formatDate(updatedCurrentTask.deadline);
  const history = useNavigate();

  const updateLockedTill = async () => {
    await updateDoc(currentTaskRef, {
      ...updatedCurrentTask,
      lockedTill: new Date(new Date().getTime() + 30000).toISOString(),
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
        console.warn('error in taskchange', error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setupdatedCurrentTask((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updatedCurrentTask);
    await updateDoc(currentTaskRef, {
      ...updatedCurrentTask,
      updatedAt: new Date().toISOString(),
      lockedBy: null,
      lockedTill: new Date().toISOString(),
    });

    // updating the completionCount of a story
    if (isProjectPlanner) {
      const currentStoryRef = doc(db, 'boards', currentboard[0], 'storyList', currentTask.referenceStory[0]);
      let incrementCount = 0;
      if (updatedCurrentTask.taskStatus == 'Finished' && currentTask.taskStatus !== updatedCurrentTask.taskStatus) {
        incrementCount--;
      } else if (currentTask.taskStatus == 'Finished' && currentTask.taskStatus !== updatedCurrentTask.taskStatus) {
        incrementCount++;
      }
      await updateDoc(currentStoryRef, {
        updatedAt: new Date().toISOString(),
        completionCount: increment(incrementCount),
      });
    }

    // sending the notification to the assignee
    const SendNotification = async () => {
      let notificationReceiver;
      if (updatedCurrentTask.assignedTo === curuser.email) {
        notificationReceiver = updatedCurrentTask.authorDetails;
      } else if (updatedCurrentTask.authorDetails === curuser.email) {
        notificationReceiver = updatedCurrentTask.assignedTo;
      }

      try {
        await addDoc(collection(db, 'users', notificationReceiver, 'notificationList'), {
          type: 'task-updated',
          details: {
            title: updatedCurrentTask.title,
            taskStatus: updatedCurrentTask.taskStatus,
            deadline: updatedCurrentTask.deadline,
            boardName: currentboard[1],
          },
          sender: curuser.email,
          time: new Date().toISOString(),
        });
      } catch (e) {
        console.log(updatedCurrentTask.deadline, currentTask.deadline);
        console.warn('error while sending notification', e);
      }
    };

    if (updatedCurrentTask.assignedTo != updatedCurrentTask.authorDetails) {
      SendNotification();
    }

    history(-1); //back to the previous screen
  };

  const [seeMore, setseeMore] = useState(true);
  const isOverDue = isTaskOverDue(currentTask);

  const smartCreatedAt = SmartTime(currentTask.createdAt);
  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className={`${styles.taskDetails} ${styles[currentTask.taskStatus]} ${isOverDue && styles.Overdue}`}
      >
        <h2 className={styles.taskDetailsTitle}>
          <strong>Change: </strong> {updatedCurrentTask.title}
        </h2>
        <textarea
          id="content"
          value={updatedCurrentTask.content}
          onChange={handleChange}
          required
          className={`${styles.inputField} ${styles.taskContentTextarea}`}
        />

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
                <input
                  type="date"
                  id="deadline"
                  className={styles.inputField}
                  onChange={handleChange}
                  value={deadlinedate != '31-12-9999' && updatedCurrentTask.deadline}
                  max="2999-12-31"
                />
              </span>
            </div>

            <div className={styles.taskDetailsTop}>
              <span>
                <span>Priority: </span>

                <select
                  id="priority"
                  className={`${styles.inputField}`}
                  value={updatedCurrentTask.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </span>
              <span>
                <span>Status: </span>
                <select
                  id="taskStatus"
                  className={`${styles.inputField}`}
                  value={updatedCurrentTask.taskStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Finished">Finished</option>
                </select>
              </span>
            </div>
            <br />
          </>
        )}

        <div className={styles.taskDetailsTop}>
          <span>
            <button type="button" onClick={() => setseeMore(!seeMore)}>
              {seeMore ? 'Collapse' : 'Expand'}
            </button>
          </span>
          <span>
            <BackButton />
          </span>
          <span>
            <button type="submit">Submit</button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default TaskChange;
