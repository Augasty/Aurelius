/* eslint-disable react/prop-types */

import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { signInWithGoogle } from "../../utils/singInWithGoogle";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import DropDown from "./DropDown";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const curuser = auth.currentUser;
  console.log(curuser?.displayName)






  // setting the current group

  const [group, setGroup] = useState(null);
  useEffect(()=>{
    const storedValue = JSON.parse(localStorage.getItem(curuser?.uid))
    setGroup(storedValue)
  },[curuser])
  // useEffect to update localStorage when the state changes
  useEffect(() => {
    localStorage.setItem(curuser?.uid, JSON.stringify(group));
  }, [group]);
  return (
    <nav>
      <div>
        <Link to="/">
          Planetask
        </Link>
        <div>
          <ul>
            {user ? (
              <>
                <li>
                  <NavLink to="/create">New Project</NavLink>
                </li>
                <DropDown setGroup={setGroup} group={group}/>
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
              <NavLink to="/" className="profile">
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
