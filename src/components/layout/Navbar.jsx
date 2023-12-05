/* eslint-disable react/prop-types */

import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import DropDown from "./groups/DropDown";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { setGroupsFromFireBase } from "./groups/groupSlice";
import { useDispatch } from "react-redux";
import topchicken from "../../../assets/topchicken.jpg";
import { setTasksFromFireBase } from "../tasks/taskSlice";

const Navbar = ({ currentGroup, setcurrentGroup }) => {
  const curuser = auth.currentUser;

  const dispatch = useDispatch();

  // fetch the list of groups for the user
  useEffect(() => {
    async function fetchData() {
      try {
        const userRef = doc(db, "users", curuser?.email);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userGroupsObjects = userSnapshot.data().groups;

          dispatch(
            setGroupsFromFireBase({
              ...userGroupsObjects,
            })
          );
        }
      } catch (error) {
        console.warn("Error fetching data from Firebase:", error);
      }
    }

    fetchData();
  }, [curuser?.email, dispatch]);

  const handlSingOut = () => {
    // localStorage.removeItem(curuser.uid) //removes localstorage when signing out
    signOut(auth);
  };










  // fetching the taskList of the current group here
  useEffect(() => {
    const fetchData = async () => {
      if(!currentGroup){
        return
      }
      try {


        const currentGroupId = currentGroup.split(",")[0];
        const ProjectsSnapShot = await getDocs(collection(db, "groups", currentGroupId, "taskList"));

        if(!ProjectsSnapShot.empty){

          const projectsData = ProjectsSnapShot.docs.map((doc) => ({
            id: doc.id,
            dummy:doc.data().dummy,
            title: doc.data()?.title,
            content: doc.data()?.content,
            authorName: doc.data()?.authorName,
            createdAt: doc.data()?.createdAt
          }))
  
          const filteredProjectsData = projectsData?.filter((obj) => !obj.dummy)
  
          try{

            dispatch(setTasksFromFireBase([
              ...filteredProjectsData
            ]))
          }catch(e){console.warn('error uploading tasks in redux',e)}
            console.log(filteredProjectsData)
        }

        
      } catch (error) {
        console.error('Error fetching tasks from Firebase:', error);
      }
    };


      fetchData();
      // console.log('called')


  }, [currentGroup, curuser, dispatch])
  const [toggle, settoggle] = useState(true);
  return (
    <nav>
      <div>
        <Link to="/">Planetask</Link>
        <div>
          <ul>
            {curuser && (
              <>
                <li>
                  <NavLink to="/create-project">New Project</NavLink>
                </li>
                {currentGroup && (
                  <li>
                    <NavLink to="/add-member">
                      Add Member in {currentGroup.split(",")[1]}
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/create-group">New Group</NavLink>
                </li>
                {curuser.email && (
                  <DropDown
                    currentGroup={currentGroup}
                    setcurrentGroup={setcurrentGroup}
                  />
                )}
                <li>
                  <a onClick={handlSingOut}>Log Out</a>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/"
                className="profile"
                onClick={() => settoggle(!toggle)}
              >
                <img src={toggle ? curuser?.photoURL : topchicken} alt="user" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
