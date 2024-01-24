import { useNavigate } from 'react-router-dom';

import Aurelius from '../../../assets/Aurelius.png';
import logoutbg from '../../../assets/logoutbg.png';
import styles from './styles.module.css';
import { SignInWithGoogle } from '../../utils/SignInWithGoogle';

const SignedOutHomePage = () => {
  // going to homepage when logging in
  const history = useNavigate();
  const handleSignIn = () => {
    SignInWithGoogle();
    // console.log('signing in')
    history('/'); // console.log('to the home')
  };  return (
    <div className={styles.container} style={{ backgroundImage: `url(${logoutbg})` }}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={Aurelius} alt="Aurelius Logo" />
          <div className={styles.Aurelius}>Aurelius</div>
        </div>
        <div>
          <button onClick={handleSignIn} className={styles.LoginButton}>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignedOutHomePage;
