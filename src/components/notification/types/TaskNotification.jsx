/* eslint-disable react/prop-types */

import { deleteDoc, doc } from 'firebase/firestore';
import { SmartTime } from '../../../utils/SmartTime';
import { auth, db } from '../../../firebase';
import styles from './NotificationCard.module.css';

import button from '../../../sharedStyles/SmallButtonStyle.module.css';
import { isTaskOverDue } from '../../../utils/isTaskOverdue';

const TaskNotification = ({ notification }) => {
  const curuser = auth.currentUser;
  const smartTime = SmartTime(notification.time);

  let actionText;

  if (notification.type === 'task-assigned') {
    actionText = 'assigned you';
  } else if (notification.type === 'task-updated') {
    actionText = 'updated';
  }

  const RemoveNotification = () => {
    const notificationDocRef = doc(db, 'users', curuser.email, 'notificationList', notification.id);
    deleteDoc(notificationDocRef);
  };

  const isOverDue = isTaskOverDue(notification.details);
  return (
    <div className={`${styles.notificationCard}  ${styles[notification.details.taskStatus]} ${isOverDue && styles.Overdue}`}>
<p className={styles.notificationTitle}>
  {notification.sender} {actionText} <strong>{notification.details.title}</strong> in the board{' '}
  <strong>{notification.details.boardName}</strong>, now with <strong>{notification.details.priority}</strong> priority.
</p>
      <div className={styles.NotificationTimeAndButton} >
        <span className={styles.notificationDate}>{smartTime}</span>
        <button className={button.SmallButton} onClick={() => RemoveNotification()}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default TaskNotification;
