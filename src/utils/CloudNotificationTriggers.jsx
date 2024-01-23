/* eslint-disable react/prop-types */
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo } from 'react';
import { auth, db } from '../firebase';
import { useDispatch } from 'react-redux';

import styles from './styles.module.css';
import { useProjectContexts } from './ProjectContexts';
import { setNotificationsFromFireBase } from '../components/notification/notificationSlice';

const CloudNotificationTriggers = () => {
  const dispatch = useDispatch();
  const curuser = auth.currentUser;
  const { currentboard } = useProjectContexts();

  const fetchNotifications = useMemo(
    () => async () => {
      try {
        const NotificationSnapShot = await getDocs(
          collection(db, 'users', curuser.email, 'notificationList')
        );

        if (!NotificationSnapShot.empty) {
          const notificationData = NotificationSnapShot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          const filteredNotificationData = notificationData?.filter(
            (obj) => !obj.dummy
          );
          // console.log(filteredNotificationData);

          try {
            dispatch(
              setNotificationsFromFireBase([...filteredNotificationData])
            );
          } catch (e) {
            console.warn('error uploading notifications in redux', e);
          }
        }
      } catch (error) {
        console.error('Error fetching notifications from firebase:', error);
      }
    },
    [curuser.email, dispatch]
  );

  useEffect(() => {
    const notificationRef = collection(
      db,
      'users',
      curuser.email,
      'notificationList'
    );
    const unsub = onSnapshot(notificationRef, () => {
      fetchNotifications();
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentboard]);

  return <div className={styles.triggers}>Cloud Triggers</div>;
};

export default CloudNotificationTriggers;
