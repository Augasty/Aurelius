import {
  GoogleAuthProvider,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Import your Firebase setup

export const signInWithGoogle = async () => {
  try {
    if (window.location.href == 'http://localhost:5173/') {

      const email = "augastytest@gmail.com";
      const password = "Dijkstra@123";


      // this try block is purely for letting the testing automation tool bypass login.
      try {
        // the password for users in firebase is not the same as the 
        // mail ids password, we made it the same for this user by
        // using createUserWithEmailAndPassword to set the firebase password manually
        const result = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );


      } catch (error) {
        console.error(error.message);
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
        groups: {},
        currentGroup: [],
      };
      await setDoc(doc(db, "users", userEmail), userData);
    }
  } catch (error) {
    console.log(error);
  }
};
