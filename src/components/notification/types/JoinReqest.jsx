/* eslint-disable react/prop-types */

import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { SmartTime } from '../../../utils/SmartTime';
import updateCurrentBoardInFirebase from '../../../utils/updateCurrentBoardInFirebase';
import { auth, db } from '../../../firebase';

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
    <div>
      <p>
        {notification.sender} wants you to join <strong>{notification.details.boardName}</strong>{' '}
      </p>
      <p>Time: {smartTime}</p>
      <button onClick={() => HandleAcceptInvitation()}>Accept</button>
      <button onClick={() => HandleRejectInvitation()}>Reject</button>
      <hr />
    </div>
  );
};

export default JoinReqest;
