/* eslint-disable react/prop-types */

import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"; // Import your CSS file
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import DropDown from "./groups/DropDown";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs
} from "firebase/firestore";
import { setGroupsFromFireBase } from "./groups/groupSlice";
import { useDispatch } from "react-redux";
import topchicken from "../../../assets/topchicken.jpg";
import { setTasksFromFireBase } from "../tasks/taskSlice";

const Navbar = ({ currentGroup, setcurrentGroup }) => {
  const curuser = auth.currentUser;

  const dispatch = useDispatch();

  // fetch the list of groups for the user,
  useEffect(() => {
    async function fetchData() {
      try {
        const userRef = doc(db, "users", curuser?.email);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userGroupsObj = userSnapshot.data().groups;

          dispatch(
            setGroupsFromFireBase({
              ...userGroupsObj,
            })
          );
          const curGroupArr = userSnapshot.data().currentGroup;

          setcurrentGroup(curGroupArr);
          console.log("navbar useeffect used",curGroupArr);
        } else {
          // just in case there is comething in the cache that is not actually in db
          setcurrentGroup("");
        }
      } catch (error) {
        console.warn("Error fetching data from Firebase:", error);
      }
    }
    console.log("fetching groups");
    fetchData();
  }, [curuser?.email, dispatch, setcurrentGroup]);



  // fetching the taskList of the current group here
  useEffect(() => {
    const fetchData = async () => {
      if (currentGroup.length === 0 ) {
        console.log('no group for this user',currentGroup);
        return;
      }
      console.log
      try {
        const currentGroupId = currentGroup[0];
        const ProjectsSnapShot = await getDocs(
          collection(db, "groups", currentGroupId, "taskList")
        );

        if (!ProjectsSnapShot.empty) {
          const projectsData = ProjectsSnapShot.docs.map((doc) => ({
            id: doc.id,
            content: doc.data()?.content,
            assignedTo: doc.data()?.assignedTo,
            priority: doc.data()?.priority,
            taskStatus: doc.data()?.taskStatus,
            locked: false,
            dummy: doc.data().dummy,
            title: doc.data()?.title,
            authorDetails: doc.data()?.authorDetails,
            createdAt: doc.data()?.createdAt,
          }));

          const filteredProjectsData = projectsData?.filter(
            (obj) => !obj.dummy
          );
          // console.log(filteredProjectsData)

          try {
            dispatch(setTasksFromFireBase([...filteredProjectsData]));
          } catch (e) {
            console.warn("error uploading tasks in redux", e);
          }
        }
      } catch (error) {
        console.error("Error fetching tasks from Firebase:", error);
      }
    };

    try{

      fetchData();
    }catch(e){

      console.warn("error in datafetching");
    }
  }, [currentGroup, curuser, dispatch]);




  // for chicken
  const [toggleChicken, setToggleChicken] = useState(true);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img alt="Planetask Logo" />
        <Link to="/">Planetask</Link>
      </div>
      <div>
        <ul className={styles.navbarList}>
          {curuser && (
            <>
              <li className={styles.navbarListItem}>
                {currentGroup.length !== 0 && (
                  <NavLink to="/create-task">New Project</NavLink>
                )}
              </li>
              { currentGroup.length !== 0 && (
                <li className={styles.navbarListItem}>
                  <NavLink to="/add-member">
                    Add Member in {currentGroup[1]}
                  </NavLink>
                </li>
              )}
              <li className={styles.navbarListItem}>
                <NavLink to="/create-group">New Group</NavLink>
              </li>
              {curuser.email && (
                <DropDown
                  currentGroup={currentGroup}
                  setcurrentGroup={setcurrentGroup}
                />
              )}
              <li className={styles.navbarListItem}>
                <a onClick={()=>signOut(auth)}>Log Out</a>
              </li>
            </>
          )}
          <li className={styles.navbarListItem}>
            <NavLink
              to="/"
              className={`${styles.profile} ${styles.toggle}`}
              onClick={() => setToggleChicken(!toggleChicken)}
            >
              <img
                src={toggleChicken ? curuser?.photoURL : topchicken}
                alt="user"
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
