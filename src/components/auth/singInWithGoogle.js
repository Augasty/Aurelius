import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider(); // Use 'GoogleAuthProvider' directly
    provider.setCustomParameters({ prompt: 'consent' });
    try {
      await signInWithPopup(auth, provider); // Use 'auth' and 'provider' directly here
    } catch (error) {
      alert(error.message);
    }
  };