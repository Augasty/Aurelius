import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { signInWithGoogle } from './singInWithGoogle';

function SignIn() {
  // const signInWithGoogle = async () => {
  //   const provider = new GoogleAuthProvider(); // Use 'GoogleAuthProvider' directly
  //   provider.setCustomParameters({ prompt: 'consent' });
  //   try {
  //     await signInWithPopup(auth, provider); // Use 'auth' and 'provider' directly here
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle} style={{ fontFamily: 'inherit' }}>
        Sign in with Google
      </button>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        className="sign-out"
        onClick={() => signOut(auth)} // Use 'auth' directly here
        style={{ fontFamily: 'inherit' }}
      >
        🫵
      </button>
    )
  );
}

export { SignIn, SignOut };
