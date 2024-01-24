import { useSelector } from 'react-redux';
import TaskNotification from './types/TaskNotification';
import JoinReqest from './types/JoinReqest';
import styles from './Notification.module.css';
const Notification = () => {
  // fetch notifications from notificationSlice
  let reduxNotificationList = useSelector((state) => state.notifications);
  // const { isNotificationPanelVisible } = useProjectContexts();

  // console.log(reduxNotificationList);

  if (reduxNotificationList.length == 0) {
    return <div>No Notifications</div>;
  }

  return (
    <div className={styles.Container}>
      {reduxNotificationList
        .slice()
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .map((notification) => {
          if (notification.type == 'join-req') return <JoinReqest notification={notification} key={notification.id} />;

          if (notification.type == 'task-assigned' || notification.type == 'task-updated')
            return <TaskNotification notification={notification} key={notification.id} />;
        })}
    </div>
  );
};

export default Notification;
