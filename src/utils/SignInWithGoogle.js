import {
  GoogleAuthProvider,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; 

export const SignInWithGoogle = async () => {
  try {
    // for automation, to let automation tools bypass login
    if (window.location.href == 'http://localhost:3000/') {

      const email = "augastytest@gmail.com";
      const password = "Dijkstra@123";
      try {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );


      } catch (error) {
        console.error('error in login',error.message);
      }
      return; 
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Check if the user's email exists in the 'database1' collection
    const userEmail = result.user.email;

    const userRef = doc(db, "users", userEmail);

    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      // console.log('new');
      const userData = {
        email: userEmail,
        boards: {},
        currentboard: [],
      };
      await setDoc(doc(db, "users", userEmail), userData);

      const notificationListRef = collection(userRef, 'notificationList');
      await addDoc(notificationListRef, { dummy: true });

    }
  } catch (error) {
    console.log(error);
  }
};
