/* eslint-disable react/prop-types */

import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file
import { auth, db } from "../../firebase";
import { signInWithGoogle } from "../../utils/singInWithGoogle";
import { signOut } from "firebase/auth";
import DropDown from "./groups/DropDown";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { setGroupsFromFireBase } from "./groups/groupSlice";
import { useDispatch } from "react-redux";

const Navbar = ({ group,setGroup}) => {
  const curuser = auth.currentUser;





  const dispatch = useDispatch();

    // fetch the group from the user    
    useEffect(() => { 
      async function fetchData(){

        try {
          const userRef = doc(db, 'users', curuser?.email);
          const userSnapshot = await getDoc(userRef);
        
        if (userSnapshot.exists()) {
          const userGroupsObjects = userSnapshot.data().groups

          dispatch(setGroupsFromFireBase({
              ...userGroupsObjects
          }))
        }
      } catch (error) {
        console.warn('Error fetching data from Firebase:', error);
      }
    }
    
          fetchData();
      }, [curuser?.email, dispatch]);
      
    

      // removing localstorage when signing out
      const handlSingOut = () =>{
        localStorage.removeItem(curuser.uid)
        signOut(auth)
        console.log(curuser.uid,'works')
      }

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
{group &&                 <li>
                  <NavLink to="/add-member">Add Member in {group.split(',')[1]}</NavLink>
                </li>}
                <li>
                  <NavLink to="/create-group">New Group</NavLink>
                </li>
                {curuser.email && (
                  <DropDown
                    group={group}
                    setGroup={setGroup}
                  />
                )}
                <li>
                  <a onClick={handlSingOut}>Log Out</a>
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
