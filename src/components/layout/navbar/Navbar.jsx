/* eslint-disable react/prop-types */

import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"; // Import your CSS file
import { auth, db } from "../../../firebase";
import { signOut } from "firebase/auth";
import DropDown from "../groups/DropDown";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { setGroupsFromFireBase } from "../groups/groupSlice";
import { useDispatch } from "react-redux";
import topchicken from "../../../../assets/topchicken.jpg";
import bluey from "../../../../assets/bluey.png";
import { setTasksFromFireBase } from "../../tasks/taskSlice";
import { useGroupAndChatToggleContext } from "../../../utils/GroupAndChatToggleContext";

const Navbar = () => {
  const curuser = auth.currentUser;

  const dispatch = useDispatch();
  const { currentGroup, setcurrentGroup, isRightPanelVisible,toggleRightPanel } =  useGroupAndChatToggleContext();

  
  // fetching the taskList of the current group here
  useEffect(() => {
    const fetchData = async () => {
      if (currentGroup.length === 0) {
        // console.log("no group for this user", currentGroup);
        return;
      }

      try {
        const currentGroupId = currentGroup[0];
        const ProjectsSnapShot = await getDocs(
          collection(db, "groups", currentGroupId, "taskList")
        );

        if (!ProjectsSnapShot.empty) {
          const projectsData = ProjectsSnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
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

    try {
      fetchData();
    } catch (e) {
      console.warn("error in datafetching");
    }
  }, [currentGroup, curuser, dispatch]);

  // for chicken
  const [toggleChicken, setToggleChicken] = useState(true);



  // handling sign out
  const handleSignOut = () =>{
    signOut(auth)
    dispatch(setTasksFromFireBase([]));
    setcurrentGroup("");
    dispatch(
      setGroupsFromFireBase({})
    );
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={bluey} />
        <Link to="/">Bluey</Link>
      </div>
      <div>
        <ul className={styles.navbarList}>
          {curuser && (
            <>
              <li className={styles.navbarListItem}>
                {currentGroup.length !== 0 && (
                  <NavLink to="/create-task">Create a task</NavLink>
                )}
              </li>
              {currentGroup.length !== 0 && (
                <li className={styles.navbarListItem}>
                  <NavLink to="/add-member">
                    Add Member in {currentGroup[1]}
                  </NavLink>
                </li>
              )}

              {currentGroup.length !== 0 && (
                <li
                  onClick={toggleRightPanel}
                  className={styles.navbarListItem}
                >
                  {isRightPanelVisible?'Close':'Open'} Chat
                </li>
              )}
              <li className={styles.navbarListItem}>
                <NavLink to="/create-group">New Board</NavLink>
              </li>
              <div className={styles.navbarTexts}>change board</div>
              {curuser.email && (
                <DropDown
                  currentGroup={currentGroup}
                  setcurrentGroup={setcurrentGroup}
                />
              )}
              <li className={styles.navbarListItem}>
                <a onClick={handleSignOut}>Log Out</a>
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
