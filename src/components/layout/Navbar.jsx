/* eslint-disable react/prop-types */

import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file
import { auth } from "../../firebase";
import { signInWithGoogle } from "../../utils/singInWithGoogle";
import { signOut } from "firebase/auth";
import DropDown from "./groups/DropDown";

const Navbar = ({ group,setGroup, setGroupsObject, groupsObject }) => {
  const curuser = auth.currentUser;
  return (
    <nav>
      <div>
        <Link to="/">Planetask</Link>
        <div>
          <ul>
            {curuser ? (
              <>
                <li>
                  <NavLink to="/create-project">New Project</NavLink>
                </li>

                <li>
                  <NavLink to="/create-group">New Group</NavLink>
                </li>
                {curuser.email && (
                  <DropDown
                    group={group}
                    setGroup={setGroup}
                    setGroupsObject={setGroupsObject}
                    groupsObject={groupsObject}
                    usermail={curuser.email}
                  />
                )}
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
