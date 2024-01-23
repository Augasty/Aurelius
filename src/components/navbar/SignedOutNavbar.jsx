import { Link, NavLink, useNavigate } from "react-router-dom";
import topchicken from "../../../assets/topchicken.jpg"

import Aurelius from "../../../assets/bluey.png";
import styles from "./Navbar.module.css"; 
import { SignInWithGoogle } from "../../utils/SignInWithGoogle";
import Theme from './Theme/Theme';

const SignedOutNavbar = () => {


  // going to homepage when logging in
  const history = useNavigate();
  const handleSignIn = () =>{
    SignInWithGoogle()
    // console.log('signing in')
    history('/')// console.log('to the home')

  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Aurelius} />
        <Link to="/">Aurelius</Link>
      </div>
      <div>
        <ul className={styles.navbarList}>
          <li onClick={handleSignIn} className={styles.navbarListItem}>
            Login with Google
          </li>
          <li className={styles.navbarListItem}>
            <NavLink to="/" className={`${styles.profile} ${styles.toggle}`}>
              <img src={topchicken} alt="User" />
            </NavLink>
          </li>
          <div className={styles.liDivItems}>
            <li className={styles.navbarListItem}>
              <Theme />
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default SignedOutNavbar;
