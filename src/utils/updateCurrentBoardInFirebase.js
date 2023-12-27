import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';


const updateCurrentBoardInFirebase = (userEmail, newCurrentBoard) => {


  const updateCurrentBoardAsync = async () => {
    try {
      console.log('what triggers',userEmail,newCurrentBoard)
      await updateDoc(doc(db, 'users', userEmail), {
        currentboard: newCurrentBoard,
      });
    } catch (error) {
      console.error('Error updating currentboard:', error);
    }
  };

  if (userEmail && newCurrentBoard) {
    updateCurrentBoardAsync();
  }
};

export default updateCurrentBoardInFirebase;