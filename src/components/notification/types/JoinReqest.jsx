/* eslint-disable react/prop-types */

import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { SmartTime } from '../../../utils/SmartTime';
import updateCurrentBoardInFirebase from '../../../utils/updateCurrentBoardInFirebase';
import { auth, db } from '../../../firebase';
import styles from './NotificationCard.module.css';

import button from '../../../sharedStyles/SmallButtonStyle.module.css';

const JoinReqest = ({ notification }) => {
  const curuser = auth.currentUser;
  const smartTime = SmartTime(notification.time);

  const HandleRejectInvitation = () => {
    // delete this document from notificationsList
    const notificationDocRef = doc(db, 'users', curuser.email, 'notificationList', notification.id);
    deleteDoc(notificationDocRef);
  };
  const HandleAcceptInvitation = async () => {
    // update the users list of boards
    const userDocRef = doc(db, 'users', curuser.email);
    await updateDoc(userDocRef, {
      [`boards.${notification.details.boardId}`]: notification.details.boardName,
    });

    // update the users currentboard
    updateCurrentBoardInFirebase(curuser.email, [notification.details.boardId, notification.details.boardName]);

    //   updating in the boards collection
    const boardDocRef = doc(db, 'boards', notification.details.boardId);
    const boardDocSnap = await getDoc(boardDocRef);
    const boardCurrdata = boardDocSnap.data();
    await updateDoc(boardDocRef, {
      memberEmails: [...boardCurrdata.memberEmails, curuser.email],
    });

    // delete this document from notificationsList
    HandleRejectInvitation();


  };
  return (
    <div className={`${styles.notificationCard} ${styles.JoinReq}`}>
      <p className={styles.notificationTitle}>
        {notification.sender} wants you to join{' '}
        <strong className={styles.boardName}>{notification.details.boardName}</strong>{' '}
      </p>
      <div className={styles.NotificationTimeAndButton}>
        <span className={styles.notificationDate}>{smartTime}</span>
        
          <button className={button.SmallButton} onClick={HandleAcceptInvitation}>
            Accept
          </button>
          <button className={button.SmallButton} onClick={HandleRejectInvitation}>
            Reject
          </button>
        
      </div>
    </div>
  );
};

export default JoinReqest;
