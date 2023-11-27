/* eslint-disable react/prop-types */

import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { signInWithGoogle } from "../../utils/singInWithGoogle";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const curuser = auth.currentUser;

  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">
          Planeto
        </Link>
        <div>
          <ul className="right">
            {user ? (
              <>
                <li>
                  <NavLink to="/create">New Project</NavLink>
                </li>
                <li>
                  <a onClick={() => signOut(auth)}>Log Out</a>
                </li>
              </>
            ) : (
              <li onClick={signInWithGoogle} className="login">
                Login with Google
              </li>
            )}
            <li>
              <NavLink to="/" className="btn-floating pink lighten-1 message">
                <img src={curuser?.photoURL} alt="User" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
