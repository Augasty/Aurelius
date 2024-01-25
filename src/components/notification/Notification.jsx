import { useSelector } from 'react-redux';
import TaskNotification from './types/TaskNotification';
import JoinReqest from './types/JoinReqest';
import styles from './Notification.module.css';

import button from '../../sharedStyles/SmallButtonStyle.module.css';
import { useProjectContexts } from '../../utils/ProjectContexts';
import { doc, writeBatch } from 'firebase/firestore';
import { auth, db } from '../../firebase';
const Notification = () => {
  let reduxNotificationList = useSelector((state) => state.notifications);
  const { setIsNotificationPanelVisible } = useProjectContexts();
  const curuser = auth.currentUser;

  const ClearNotification = async () => {
    const batch = writeBatch(db);

    reduxNotificationList
      .filter((notification) => notification.type === 'task-assigned' || notification.type === 'task-updated')
      .forEach((notification) => {
        const notificationDocRef = doc(db, 'users', curuser.email, 'notificationList', notification.id);
        batch.delete(notificationDocRef);
      });

    await batch.commit();
  };

  return (
    <div className={styles.Panel}>
      <div className={styles.Container}>
        {reduxNotificationList
          .slice()
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .map((notification) => {
            if (notification.type == 'join-req') {
              return <JoinReqest notification={notification} key={notification.id} />;
            }

            if (notification.type == 'task-assigned' || notification.type == 'task-updated') {
              return <TaskNotification notification={notification} key={notification.id} />;
            }
          })}
      </div>

      <div className={styles.NotificationTimeAndButton}>
        <button
          className={button.SmallButton}
          onClick={() => {
            setIsNotificationPanelVisible(false);
          }}
        >
          Close
        </button>
        <button className={button.SmallButton} onClick={() => ClearNotification()}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Notification;
