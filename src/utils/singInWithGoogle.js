import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Import your Firebase setup

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Check if the user's email exists in the 'database1' collection
    const userEmail = result.user.email;


    const userRef = doc(db,'users', userEmail);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      console.log('old',result.user.email)
    }else{

      console.log('new');
      const userData = {
        email: userEmail,
        groups:{}
        // Add other user properties as needed
      };
      await addDoc(collection(db, 'users'), userData);
    }
  }catch (error) {
    console.log(error);
  }
};