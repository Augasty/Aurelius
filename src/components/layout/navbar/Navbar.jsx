import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"; // Import your CSS file
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import DropDown from "../boards/DropDown";
import { useState } from "react";
import topchicken from "../../../../assets/topchicken.jpg";
import bluey from "../../../../assets/bluey.png";
import { useProjectContexts } from "../../../utils/ProjectContexts";

const Navbar = () => {
  const curuser = auth.currentUser;

  const {
    currentboard,
    setcurrentboard,
    isRightPanelVisible,
    setIsRightPanelVisible,
    isProjectPlanner,
  } = useProjectContexts();

  // for chicken
  const [toggleChicken, setToggleChicken] = useState(true);

  // handling sign out
  const handleSignOut = () => {
    setcurrentboard([]);
    signOut(auth);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={bluey} />
        <Link to="/">_bluey</Link>
      </div>
      <div>
        <ul className={styles.navbarList}>
          {curuser && (
            <>
              <li className={styles.navbarListItem}>
                {currentboard.length !== 0 && (
                  <NavLink
                    to={isProjectPlanner ? "/create-story" : "/create-task"}
                  >
                    Create A {isProjectPlanner ? "Story" : "Task"}
                  </NavLink>
                )}
              </li>
              {currentboard.length !== 0 && (
                <>
                  <li className={styles.navbarListItem}>
                    <NavLink to="/add-member">
                      Add Member in {currentboard[1]}
                    </NavLink>
                  </li>
                  <li
                    onClick={() => setIsRightPanelVisible((prev) => !prev)}
                    className={styles.navbarListItem}
                  >
                    {isRightPanelVisible ? "Close" : "Open"} Chat
                  </li>
                </>
              )}
              <li className={styles.navbarListItem}>
                <NavLink to="/create-board">New Board</NavLink>
              </li>

              {curuser.email && currentboard.length !== 0 && (
                <>
                  <div className={styles.navbarTexts}>change board</div>
                  <DropDown />
                </>
              )}
              <li className={styles.navbarListItem}>
                <a onClick={(e) => handleSignOut(e)}>Log Out</a>
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
