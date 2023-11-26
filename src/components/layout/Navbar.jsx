/* eslint-disable react/prop-types */

import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { signInWithGoogle } from "../auth/singInWithGoogle";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const curuser = auth.currentUser;

  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">
          Planify
        </Link>
        <div>
          <ul className="right">
            {user ? (
              <>
                <li>
                  <NavLink to="/create">New Project</NavLink>
                </li>
                <li>
                  <a onClick={() => {}}>Log Out</a>
                </li>
              </>
            ) : (
              <li onClick={signInWithGoogle}>Login with google</li>
            )}
            <li>
              <NavLink
                to="/"
                className="btn btn-floating pink lighten-1 message"
              >
                <img src={curuser?.photoURL} />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
