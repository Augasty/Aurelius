/* eslint-disable react/prop-types */
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { auth, db } from '../firebase';
import { useDispatch } from 'react-redux';

import styles from './styles.module.css';
import { setNotificationsFromFireBase } from '../components/notification/notificationSlice';
import { useProjectContexts } from './ProjectContexts';
const CloudNotificationTriggers = () => {
  const dispatch = useDispatch();
  const curuser = auth.currentUser;
  const { setNotificationCount } = useProjectContexts();

  const fetchNotifications = async () => {
    try {
      const NotificationSnapShot = await getDocs(collection(db, 'users', curuser.email, 'notificationList'));

      if (!NotificationSnapShot.empty) {
        const notificationData = NotificationSnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredNotificationData = notificationData?.filter((obj) => !obj.dummy);

        try {
          dispatch(setNotificationsFromFireBase([...filteredNotificationData]));
          setNotificationCount(filteredNotificationData.length)
        } catch (e) {
          console.warn('error uploading notifications in redux', e);
        }
      }
    } catch (error) {
      console.error('Error fetching notifications from firebase:', error);
    }
  };

  useEffect(() => {
    const notificationRef = collection(db, 'users', curuser.email, 'notificationList');
    const unsub = onSnapshot(notificationRef, () => {
      // console.log('trig noti');
      fetchNotifications();
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={styles.triggers}>Cloud Triggers</div>;
};

export default CloudNotificationTriggers;
