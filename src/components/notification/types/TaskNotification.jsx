/* eslint-disable react/prop-types */

import { deleteDoc, doc } from 'firebase/firestore';
import { SmartTime } from '../../../utils/SmartTime';
import { auth, db } from '../../../firebase';

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

  return (
    <div>
      <p>
        {notification.sender} has {actionText} the task <strong>{notification.details.title}</strong> from{' '}
        {notification.details.boardName}, currently {notification.details.taskStatus} with a{' '}
        {notification.details.priority} priority.
      </p>

      <p>Time: {smartTime}</p>
      <button onClick={() => RemoveNotification()}>Ok</button>
      <hr />
    </div>
  );
};

export default TaskNotification;
